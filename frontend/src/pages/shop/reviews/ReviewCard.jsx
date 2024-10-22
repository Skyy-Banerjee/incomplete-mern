import { useState } from "react";
import commentorIcon from "../../../assets/avatar.png";
import RatingStars from "../../../components/RatingStars";
import { formatDate } from "../../../utils/formatDate";
import PostReview from "./PostReview";

function ReviewCard({ productReviews }) {
  const reviews = productReviews || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  function handleOpenReviewModal() {
    setIsModalOpen(true);
  }
  function handleCloseReviewModal() {
    setIsModalOpen(false);
  }
  return (
    <div className="my-6 bg-white p-8">
      <div>
        {reviews.length > 0 ? (
          <div>
            <h3 className="text-lg font-medium">All comments...</h3>
            <div>
              {reviews.map((review, idx) => {
                return (
                  <div key={idx} className="mt-4">
                    <div className="flex gap-4 items-center">
                      <img
                        src={commentorIcon}
                        alt="user_icon"
                        className="size-14"
                      />
                      <div className="space-y-1">
                        <p className="text-lg font-medium underline capitalize underline-offset-4 text-blue-400">
                          {review?.userId?.username}
                        </p>
                        <p className="text-[12px] italic">
                          {formatDate(review?.updatedAt)}
                        </p>
                        <RatingStars rating={review?.rating} />
                      </div>
                    </div>
                    <div className="text-gray-600 mt-5 border p-8">
                      <p className="md:w-4/5">{review?.comment}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
      {/* ADD REVIEW BTN */}
      <div className="mt-12">
        <button
          className="px-6 py-3 bg-primary text-white rounded-md"
          onClick={handleOpenReviewModal}>
          Add A Review
        </button>
      </div>
      {/* REVIEW MODAL */}
      <PostReview
        isModalOpen={isModalOpen}
        handleClose={handleCloseReviewModal}
      />
    </div>
  );
}

export default ReviewCard;
