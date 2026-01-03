import express from "express";
import {
  createEmployee,
  getEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();


// All routes are protected
router.use(protect);
router.use((req, res, next) => {
    req.userRole = req.user.role; // optional shortcut
    next();
  });

router.post("/", createEmployee);          // Create employee
router.get("/get", authorizeRoles("ADMIN", "HR"),  getAllEmployees);          // Admin: get all employees
router.get("/:id", getEmployee);           // Get one employee
router.get("/:id/update", updateEmployee);        // Update employee
router.delete("/:id",authorizeRoles("ADMIN", "HR"), deleteEmployee);     // Delete employee

export default router;
