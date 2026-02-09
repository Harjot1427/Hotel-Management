import express from "express";
import {
  createPostController,
  deletePostController,
  getAllPostController,
  getPostController,
  popularPostController,
  postFiltersController,
  relatedPostController,
  updatePostController,
} from "../controller/Post.js";

const app = express.Router();
app.post("/create-post", createPostController);
app.get("/get-post/:slug", getPostController);
app.get("/get-all-post", getAllPostController);
app.put("/update-post/:pid", updatePostController);
app.delete("/delete-post/:pid", deletePostController);
app.get("/related-post/:pid/:cid", relatedPostController);
app.post("/product-filters", postFiltersController);
app.get("/popular-post", popularPostController)

export default app;
