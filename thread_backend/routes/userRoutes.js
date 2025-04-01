import express from "express";
import { followUnfollowUser, getUserProfile, logInUser, logOutUser, signUpUser, updateUser } from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

//router.get("/profile/:username", protectRoute, getUserProfile); // Get a user's profile, middleware to protect the route
                                    //maybe we don't need to protect this route, since getting a user's profile is PUBLIC

router.get("/profile/:username", getUserProfile); 

router.post("/signup", signUpUser);　// Create a new user
router.post("/login", logInUser);　// Log in a user
router.post("/logout", logOutUser); // Log out a user
router.post("/follow/:id", protectRoute, followUnfollowUser); // Follow or unfollow a user, middleware to protect the route
router.post("/update/:id", protectRoute, updateUser); // Update a user, middleware to protect the route

export default router;