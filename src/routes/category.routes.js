import express from "express";
import {
  getCategory,
  getAllCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} from "./../controller/category.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const categoryRouter = express.Router();

categoryRouter.get("/", authMiddleware, getAllCategory);

categoryRouter.get("/:id", authMiddleware, getCategory);

categoryRouter.post("/", authMiddleware, addCategory);

categoryRouter.patch("/:id", authMiddleware, updateCategory);

categoryRouter.delete("/:id", authMiddleware, deleteCategory);

export { categoryRouter };
