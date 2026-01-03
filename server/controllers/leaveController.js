import { prisma } from "../config/db.js";

/**
 * @desc Apply for leave
 * @route POST /api/leaves
 * @access Employee
 */
export const applyLeave = async (req, res) => {
  const { leave_type, start_date, end_date, reason } = req.body;

  if (!leave_type || !start_date || !end_date || !reason) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const employee = await prisma.Employee.findUnique({
    where: { user_id: req.user.user_id },
  });

  if (!employee) {
    return res.status(404).json({ message: "Employee profile not found" });
  }

  const leave = await prisma.Leave.create({
    data: {
      employee_id: employee.employee_id,
      leave_type,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      reason,
      status: "Pending",
    },
  });

  res.status(201).json(leave);
};

/**
 * @desc Get logged-in employee leave requests
 * @route GET /api/leaves/me
 * @access Employee
 */
export const getMyLeaves = async (req, res) => {
  const employee = await prisma.Employee.findUnique({
    where: { user_id: req.user.user_id },
  });

  const leaves = await prisma.Leave.findMany({
    where: { employee_id: employee.employee_id },
    orderBy: { createdAt: "desc" },
  });

  res.json(leaves);
};

/**
 * @desc Get all leave requests
 * @route GET /api/leaves
 * @access Admin / HR
 */
export const getAllLeaves = async (req, res) => {
  const leaves = await prisma.Leave.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(leaves);
};

/**
 * @desc Approve leave request
 * @route PUT /api/leaves/:leave_id/approve
 * @access Admin / HR
 */
export const approveLeave = async (req, res) => {
  const { leave_id } = req.params;

  const leave = await prisma.Leave.findUnique({
    where: { leave_id: Number(leave_id) },
  });

  if (!leave || leave.status !== "Pending") {
    return res.status(400).json({ message: "Leave cannot be approved" });
  }

  const updated = await prisma.Leave.update({
    where: { leave_id: Number(leave_id) },
    data: {
      status: "Approved",
      approved_by: req.user.user_id,
    },
  });

  res.json({ message: "Leave approved", leave: updated });
};

/**
 * @desc Reject leave request
 * @route PUT /api/leaves/:leave_id/reject
 * @access Admin / HR
 */
export const rejectLeave = async (req, res) => {
  const { leave_id } = req.params;

  const leave = await prisma.Leave.findUnique({
    where: { leave_id: Number(leave_id) },
  });

  if (!leave || leave.status !== "Pending") {
    return res.status(400).json({ message: "Leave cannot be rejected" });
  }

  const updated = await prisma.Leave.update({
    where: { leave_id: Number(leave_id) },
    data: {
      status: "Rejected",
      approved_by: req.user.user_id,
    },
  });

  res.json({ message: "Leave rejected", leave: updated });
};

/**
 * @desc Cancel leave request
 * @route DELETE /api/leaves/:leave_id
 * @access Employee
 */
export const cancelLeave = async (req, res) => {
  const { leave_id } = req.params;

  const leave = await prisma.Leave.findUnique({
    where: { leave_id: Number(leave_id) },
  });

  if (!leave || leave.status !== "Pending") {
    return res.status(400).json({ message: "Leave cannot be cancelled" });
  }

  const employee = await prisma.Employee.findUnique({
    where: { user_id: req.user.user_id },
  });

  if (leave.employee_id !== employee.employee_id) {
    return res.status(403).json({ message: "Access denied" });
  }

  await prisma.Leave.delete({
    where: { leave_id: Number(leave_id) },
  });

  res.json({ message: "Leave request cancelled" });
};
