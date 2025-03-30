import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required:  [true, "Password is required"],
    minLength: [6, "Password must be at least 6 characters"],
  },
  profilePic: {
    type: String,
    default: "",
  },
  followers: {
    type: [String], 
    default: [],
  },
  following: {
    type: [String], 
    default: [],
  },
  bio: {
    type: String,
    default: "",
    trim: true,
  }
}, {
    timestamps: true, // createdAt, updatedAt
});

const User = mongoose.model("User", userSchema);

export default User;
