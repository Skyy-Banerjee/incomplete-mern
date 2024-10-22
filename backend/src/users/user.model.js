const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// Defining the schema for the user
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  profileImage: String,
  bio: { type: String, maxLength: 200 },
  profession: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hashing Passwords f(x)
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next;
  }
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  next();
});

//match passwords
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Creating the model
const User = model("User", userSchema);

// Exporting the model
module.exports = User;
