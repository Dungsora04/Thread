import Post from "../models/postModel.js";
import User from "../models/userModel.js";

const createPost = async (req, res) => {
  try {
    //const {postedBy, text, img} = req.body; // Destructure postedBy, text, and img from req.body

    //maybe we can omit the postedBy field and get the user ID from the token (req.user._id). This would change the code below.

    const postedBy = req.user._id; // Get the user ID from the token
    const { text, img } = req.body;

    if (!text) {
      // Check if postedBy and text are provided
      return res.status(400).json({ message: "Text field required" });
    }

    // const user = await User.findById(postedBy); // Find the user by postedBy
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    // if (user._id.toString() !== req.user._id.toString()) {  // Check if the user is authorized
    //   return res.status(401).json({ message: "User not authorized" });  //this may be redundant if we omit the postedBy field
    // }

    const maxPostLength = 500;
    if (text.length > maxPostLength) {
      // Check if the post is less than 500 characters
      return res.status(400).json({
        message: `Post must be less than ${maxPostLength} characters`,
      });
    }
    //debug below
    const newPost = new Post({ postedBy, text, img }); // Create a new post

    await newPost.save(); // Save the new post to the database
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost }); // Send a success response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "[POST CREATE] Error" });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "postedBy",
      "username profilePic"
    ); // Find the post by ID and populate the postedBy field

    if (!post) {
      // Check if the post exists
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ post }); // Send the posts in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "[GET POSTS] Error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // Find the post by ID

    if (!post) {
      // Check if the post exists
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.postedBy.toString() !== req.user._id.toString()) {
      // Check if the user is authorized
      return res
        .status(401)
        .json({ message: "User not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(req.params.id); // Delete the post

    res.status(200).json({ message: "Post deleted successfully" }); // Send a success response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "[DELETE POST] Error" });
  }
};

const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params; // Get the post ID from the request parameters
    const userId = req.user._id; // Get the user ID from the token

    const post = await Post.findById(postId); // Find the post by ID

    if (!post) {
      // Check if the post exists
      return res.status(404).json({ message: "Post not found" });
    }

    const isLiked = post.likes.includes(userId); // Check if the user has already liked the post

    if (isLiked) {
      // Remove the user's like
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      await post.save();
      return res.status(200).json({ message: "Post unliked successfully" });
    } else {
      // Add the user's like
      post.likes.push(userId);
      await post.save();
      return res.status(200).json({ message: "Post liked successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "[LIKE/UNLIKE POST] Error" });
    console.error(error);
  }
};

const replyToPost = async (req, res) => {
  try {
    const { text } = req.body; // Get the text from the request body
    const postId = req.params.id; // Get the post ID from the request parameters
    const userId = req.user._id; // Get the user ID from the token
    const userProfilePic = req.user.profilePic; // Get the user's profile picture from the token
    const username = req.user.username; // Get the user's username from the token

    if (!text) {
      // Check if the text is provided
      return res.status(400).json({ message: "Text field required" });
    }

    if (text.length > 200) {
      return res
        .status(400)
        .json({ message: "Reply must be 200 characters or less" });
    }

    const post = await Post.findById(postId); // Find the post by ID
    if (!post) {
      // Check if the post exists
      return res.status(404).json({ message: "Post not found" });
    }

    const reply = { text, userId, userProfilePic, username }; // Create a new reply object

    post.replies.push(reply); // Add the reply to the post
    await post.save(); // Save the post

    res.status(201).json({ message: "Reply added successfully", post }); // Send a success response
  } catch (error) {
    res.status(500).json({ message: "[REPLY TO POST] Error" });
    console.error(error);
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const following = user.following;
    const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });

    res.status(200).json({ feedPosts });

  } catch (error) {
    res.status(500).json({ message: "[GET FEED POSTS] Error" });
    console.error(error);
  }
};

export {
  createPost,
  getPostById,
  deletePost,
  likeUnlikePost,
  replyToPost,
  getFeedPosts,
};
