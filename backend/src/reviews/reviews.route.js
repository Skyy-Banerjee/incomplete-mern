const express = require("express");
const Reviews = require("./reviews.model");
const Products = require("../products/products.model");
const router = express.Router();

//! POST a new review
router.post("/post-review", async (req, res) => {
  try {
    const { comment, rating, productId, userId } = req.body;

    // Check if all fields are provided
    if (!comment || !rating || !productId || !userId) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Check if a review by the user for the product already exists
    let existingReview = await Reviews.findOne({ product: productId, userId });

    if (existingReview) {
      // Update the review if it exists
      existingReview.comment = comment;
      existingReview.rating = rating;
      await existingReview.save();
    } else {
      // Create a new review if none exists
      const newReview = new Reviews({
        comment,
        rating,
        product: productId,
        userId,
      });
      await newReview.save();
    }

    // Calculate the average rating for the product
    const reviews = await Reviews.find({ product: productId });
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const avgRating = totalRating / reviews.length;

      // Find the product and update its rating
      const product = await Products.findById(productId);
      if (product) {
        product.rating = avgRating;
        await product.save({ validateBeforeSave: false });

        // Return both the updated product and reviews in the response
        return res.status(200).send({
          message: "Review posted/updated successfully",
          product: product,
          reviews: reviews,
        });
      } else {
        return res.status(404).send({ message: "Product not found" });
      }
    }
  } catch (error) {
    console.error("Error posting review: ", error);
    res.status(500).send({ message: "Failed to post review" });
  }
});

//! GET total review count
router.get("/total-reviews", async (req, res) => {
  try {
    const totalReviews = await Reviews.countDocuments({});
    res.status(200).send({ message: "Total review count", totalReviews });
  } catch (error) {
    console.error("Error fetching total reviews: ", error);
    res.status(500).send({ message: "Failed to fetch total review count" });
  }
});

//! GET reviews by userId

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).send({ message: "User ID is required" });
  }
  try {
    const reviews = await Reviews.find({ userId: userId }).sort({
      createdAt: -1,
    });
    if (reviews.length === 0) {
      return res
        .status(404)
        .send({ message: "No reviews found for this user" });
    }
    res.status(200).send({ message: "Reviews by user:", reviews });
  } catch (error) {
    console.error("Error fetching reviews by user: ", error);
    res.status(500).send({ message: "Failed to fetch reviews by user" });
  }
});

module.exports = router;
