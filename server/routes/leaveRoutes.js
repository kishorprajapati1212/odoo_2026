import express from "express";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

import {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave,
  cancelLeave,
} from "../controllers/leaveController.js";

const router = express.Router();

/* ---------- EMPLOYEE ---------- */
router.post("/", protect, authorizeRoles("EMPLOYEE"), applyLeave);
router.get("/me", protect, authorizeRoles("EMPLOYEE"), getMyLeaves);
router.delete("/:leave_id", protect, authorizeRoles("EMPLOYEE"), cancelLeave);

/* ---------- ADMIN / HR ---------- */
router.get("/", protect, authorizeRoles("ADMIN"), getAllLeaves);
router.get("/:leave_id/approve", protect, authorizeRoles("ADMIN"), approveLeave);
router.get("/:leave_id/reject", protect, authorizeRoles("ADMIN"), rejectLeave);

export default router;
