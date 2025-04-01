import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { createPost, deletePost, getFeedPosts, getPostById, likeUnlikePost, replyToPost } from "../controllers/postController.js";

const router = express.Router();

router.get("/feed", protectRoute, getFeedPosts);  
router.get("/:id", getPostById);  // find post by id

router.post("/create", protectRoute, createPost);  // create a post
router.delete("/:id", protectRoute, deletePost);  // delete a post
router.post("/like/:id", protectRoute, likeUnlikePost);  // like or unlike a post
router.post("/reply/:id", protectRoute, replyToPost);  // like or unlike a post

export default router;
