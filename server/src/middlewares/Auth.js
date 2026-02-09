import UserModel from "../models/User.js";
import JWT from "jsonwebtoken";

export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);

    if (!authHeader) {
      return res
        .status(401)
        .send({ success: false, message: "Authorization header is missing" });
    }

    // Support for both "Bearer <token>" and token without "Bearer" prefix
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;
    if (!token) {
      return res
        .status(401)
        .send({ success: false, message: "No token provided" });
    }

    const decode = JWT.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token Object:", decode);

    if (!decode._id && !decode.id) {
      return res
        .status(401)
        .send({ success: false, message: "Token does not contain user ID" });
    }

    req.user = decode;
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).send({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    console.log("User ID from token:", userId);
    if (!userId) {
      return res
        .status(401)
        .send({ success: false, message: "No user ID found in token" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found in database" });
    }

    console.log("User from database:", user);
    if (user?.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }
    next();
  } catch (error) {
    console.error("Error in admin middleware:", error);
    res.status(401).send({
      success: false,
      message: "Error in admin middleware",
    });
  }
};
