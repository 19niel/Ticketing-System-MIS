import express from "express";
import { login } from "../controllers/authController.js";
import { me } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", me);
export default router;
