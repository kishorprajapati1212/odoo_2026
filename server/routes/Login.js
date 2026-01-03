import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  updateUserStatus,
} from "../controllers/userController.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.put("/:id/status", protect, updateUserStatus);


export default router;
