import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";

const signUpUser = async (req, res) => {
  try {
    const { username, name, email, password } = req.body; // Get the user data from the request body

    // Check if user already exists
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    // Create a new user instance
    const newUser = new User({
      username,
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      username: newUser.username,
      // IMPORTANT: DO NOT send the password back
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error("[SIGNUP ERROR]:", err.message);
  }
};

const logInUser = async (req, res) => {
  try {
    const { username, password } = req.body; // Get the user data from the request body

    const user = await User.findOne({ username }); // Find the user by username
    // if (!user) {
    //   res.status(401).json({ message: "Invalid username or password" });
    //   return;
    // }
    const isPasswordMatch = await bcrypt.compare(
      password,
      user?.password || ""
    ); // Compare the password

    if (!user || !isPasswordMatch) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    // Generate a JWT and set it in a cookie
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      // Send the user data in the response
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      // IMPORTANT: DO NOT send the password back in the response
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error("[LOGIN ERROR]:", error.message);
  }
};

const logOutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 }); // in next comment please add explain why does this clear the cookie
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error("[LOGOUT ERROR]:", error.message);
  }
};

const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params; // Get the user id from the request params
    const userToFollow = await User.findById(id); // Find the user to follow/unfollow
    const currentUser = await User.findById(req.user._id); // Find the current user

    if (id === req.user._id.toString()) {
      // Check if the user is trying to follow/unfollow themselves
      res.status(400).json({ error: "You cannot follow/unfollow yourself" });
      return;
    }

    if (!userToFollow || !currentUser) {
      // Check if the user to follow/unfollow or the current user exists
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isFollowing = currentUser.following.includes(id); // Check if the current user is already following the user

    if (isFollowing) {
      // Unfollow the user
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } }); // Remove the user from the following list of the current user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } }); // Remove the current user from the followers list of the user
      return res.status(200).json({ message: "Unfollowed successfully" });
    } else {
      // Follow the user
      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { following: id },
      }); // Add the user to the following list of the current user
      await User.findByIdAndUpdate(id, {
        $addToSet: { followers: req.user._id },
      }); // Add the current user to the followers list of the user
      return res.status(200).json({ message: "Followed successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error("[FOLLOWUN ERROR]:", err.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, name, email, password, bio, profilePic } = req.body; // Get the user data from the request body
    const userId = req.user._id; // Get the user id from the request object

    let user = await User.findById(userId); // Find the user by id

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    if (req.params.id !== userId.toString()) {
      res
        .status(403)
        .json({ error: "You are not authorized to update this user" });
      return;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10); // Generate a salt
      const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
      user.password = hashedPassword; // Update the password
    }

    // Update the user data
    user.username = username?.trim() || user.username;
    user.name = name?.trim() || user.name;
    user.email = email?.trim() || user.email;
    user.bio = bio?.trim() || user.bio;
    user.profilePic = profilePic?.trim() || user.profilePic;

    user = await user.save(); // Save the updated user

    res.status(200).json({
      // Send the updated user data in the response
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
      // IMPORTANT: DO NOT send the password back in the response
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error("[UPDATE ERROR]:", err.message);
  }
};

const getUserProfile = async (req, res) => {
  const { username } = req.params; // Get the username from the request params
  try {
    const user = await User.findOne({ username })
      .select("-password")
      .select("-updatedAt"); // Find the user by username and exclude the password field and updatedAt field
    if (!user) {
      res.status(404).json({ error: "User not found" }); // Send a 404 response if the user is not found
      return;
    }
    res.status(200).json(user); // Send the user data in the response
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error("[GET PROFILE ERROR]:", err.message);
  }
};

export {
  signUpUser,
  logInUser,
  logOutUser,
  followUnfollowUser,
  updateUser,
  getUserProfile,
};
