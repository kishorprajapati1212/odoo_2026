import express from "express";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

import {
  checkIn,
  checkOut,
  getMyAttendance,
  getAttendanceByEmployee,
  getAttendanceByDate,
  updateAttendanceStatus,
} from "../controllers/attendanceController.js";

const router = express.Router();

/* ---------- EMPLOYEE ONLY ---------- */
router.post("/check-in", protect, authorizeRoles("EMPLOYEE"), checkIn);
router.post("/check-out", protect, authorizeRoles("EMPLOYEE"), checkOut);
router.get("/me", protect, authorizeRoles("EMPLOYEE"), getMyAttendance);

/* ---------- ADMIN / HR ONLY ---------- */
router.get(
  "/employee/:employee_id",
  protect,
  authorizeRoles("ADMIN", "HR"),
  getAttendanceByEmployee
);

router.get(
  "/date/:date",
  protect,
  authorizeRoles("ADMIN", "HR"),
  getAttendanceByDate
);

router.put(
  "/:attendance_id/status",
  protect,
  authorizeRoles("ADMIN", "HR"),
  updateAttendanceStatus
);

export default router;
