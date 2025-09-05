import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        // Get the token from cookies
        const token = req.cookies.jwt;

        // If no token is provided
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user from the decoded token's userId
        const user = await User.findById(decoded.userId).select("-password");

        // If user not found
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach user to the request object
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error.message);

        // Handle different types of errors
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Unauthorized - Invalid or expired token" });
        }

        // Default server error if anything else fails
        res.status(500).json({ message: "Internal server error!" });
    }
};
