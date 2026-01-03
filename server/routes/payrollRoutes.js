import express from "express";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

import {
  createPayroll,
  getMyPayroll,
  getPayrollByEmployee,
  updatePayroll,
  deletePayroll,
} from "../controllers/payrollController.js";

const router = express.Router();

/* ---------- ADMIN / HR ---------- */
router.post("/", protect, authorizeRoles("ADMIN", "HR"), createPayroll);
router.get(
  "/employee/:employee_id",
  protect,
  authorizeRoles("ADMIN", "HR"),
  getPayrollByEmployee
);
router.put(
  "/:payroll_id",
  protect,
  authorizeRoles("ADMIN", "HR"),
  updatePayroll
);
router.delete(
  "/:payroll_id",
  protect,
  authorizeRoles("ADMIN", "HR"),
  deletePayroll
);

/* ---------- EMPLOYEE ---------- */
router.get("/me", protect, authorizeRoles("EMPLOYEE"), getMyPayroll);

export default router;
