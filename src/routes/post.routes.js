import express from "express";
import {
  getPost,
  getAllPost,
  addPost,
  updatePost,
  deletePost,
} from "./../controller/post.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const postRouter = express.Router();

postRouter.get("/", authMiddleware, getAllPost);

postRouter.get("/:id", authMiddleware, getPost);

postRouter.post("/", authMiddleware, addPost);

postRouter.patch("/:id", authMiddleware, updatePost);

postRouter.delete("/:id", authMiddleware, deletePost);

export { postRouter };
