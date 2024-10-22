const express = require("express");
const router = express.Router();
const User = require("./user.model");
const generateToken = require("../middleware/generateToken");
//const verifyToken = require("../middleware/verifyToken");

//! Register endpoint
router.post("/register", async function (req, res) {
  try {
    const { username, email, password } = req.body;
    const user = new User({ email, username, password });
    await user.save();
    res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user: ", error);
    res.status(500).send({ message: "User registration failed" });
  }
});

//! Login user endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //console.log(email, password);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ message: "Passwords do not match!" });
    }
    const token = await generateToken(user.id); //jwt
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    //console.log('Token: ',token);

    res.status(200).send({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error loging in: ", error);
    res.status(500).send({ message: "Loging in failed!" });
  }
});

//! Log out end point
router.post("/logout", (req, res) => {
  res.clearCookie("token", { path: "/" });
  res.status(200).send({ message: "Logged out successfully" });
});

//! Delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user: ", error);
    res.status(500).send({ message: "User registration failed" });
  }
});

//! Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "id email role").sort({ createdAt: -1 });
    res.status(200).send(users);
  } catch (error) {
    console.error("Errorfetching users: ", error);
    res.status(500).send({ message: "Fetching users failed" });
  }
});

//! Updating user role
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User role updated successfully", user });
  } catch (error) {
    console.error("Error updating user-role: ", error);
    res.status(500).send({ message: "Updating user-role failed" });
  }
});

//! Update User Profile
router.patch("/edit-profile", async (req, res) => {
  try {
    const { userId, username, profileImage, bio, profession } = req.body;
    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }
    const user = await User.findById(userId);
    //console.log(user);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    //! update proflie
    if (username !== undefined) {
      user.username = username;
    }
    if (profileImage !== undefined) {
      user.profileImage = profileImage;
    }
    if (bio !== undefined) {
      user.bio = bio;
    }
    if (profession !== undefined) {
      user.profession = profession;
    }
    await user.save();
    res.status(200).send({
      message: "Profile updated successfully",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error updating user profile: ", error);
    res.status(500).send({ message: "Updating user profile failed" });
  }
});

module.exports = router;
