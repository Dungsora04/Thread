import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;  // Get the token from the cookie
        if (!token) {   // If there is no token, the user is not logged in
            res.status(401).json({ message: "Unauthorized access! Must log in!" }); 
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);     // Verify the token

        const user = await User.findById(decoded.userId).select("-password"); // Find the user by id and exclude the password

        req.user = user; // Set the user in the request object

        next(); // Call the next middleware

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error("[PROTECTROUTE ERROR]:", error.message);
    }
}

export default protectRoute;