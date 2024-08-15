import express from "express";
import { login, signup } from "../controller/admin.user.controller.js";

const adminUserRouter = express.Router();

adminUserRouter.post("/signup", signup);

adminUserRouter.post("/login", login);

export { adminUserRouter };
