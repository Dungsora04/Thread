import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config(); // Load environment variables from the .env file

connectDB(); // Connect to the database

const app = express(); // Create an Express app

// Middleware
app.use(express.json()); // Middleware to parse JSON data
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data
app.use(cookieParser()); // Middleware to parse cookies

//Routes
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({ message: error.message });
});

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); 
