import express from "express";
import { deleteUser,updateUser, addUser, getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);


export default router;
