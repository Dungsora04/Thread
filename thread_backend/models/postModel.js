import { text } from "express";
import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      // Array of user IDs
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    replies: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
          max: 200,
          required: true,
        },
        userProfilePic: {
          type: String,
        },
        username: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
