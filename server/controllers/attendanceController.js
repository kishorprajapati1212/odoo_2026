import { prisma } from "../config/db.js";

/**
 * @desc Employee Check-in (mark check-in time)
 * @route POST /api/attendance/check-in
 * @access Employee
 */
export const checkIn = async (req, res) => {
  const userId = req.user.user_id;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const employee = await prisma.Employee.findUnique({
    where: { user_id: userId },
  });

  if (!employee) {
    return res.status(404).json({ message: "Employee profile not found" });
  }

  const existing = await prisma.Attendance.findUnique({
    where: {
      employee_id_date: {
        employee_id: employee.employee_id,
        date: today,
      },
    },
  });

  if (existing && existing.check_in) {
    return res.status(400).json({ message: "Already checked in" });
  }

  const attendance = await prisma.Attendance.upsert({
    where: {
      employee_id_date: {
        employee_id: employee.employee_id,
        date: today,
      },
    },
    update: {
      check_in: new Date(),
      status: "Present",
    },
    create: {
      employee_id: employee.employee_id,
      date: today,
      check_in: new Date(),
      status: "Present",
    },
  });

  res.status(201).json(attendance);
};

/**
 * @desc Employee Check-out (mark check-out time)
 * @route POST /api/attendance/check-out
 * @access Employee
 */
export const checkOut = async (req, res) => {
  const userId = req.user.user_id;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const employee = await prisma.Employee.findUnique({
    where: { user_id: userId },
  });

  const attendance = await prisma.Attendance.findUnique({
    where: {
      employee_id_date: {
        employee_id: employee.employee_id,
        date: today,
      },
    },
  });

  if (!attendance || !attendance.check_in) {
    return res.status(400).json({ message: "Check-in required first" });
  }

  if (attendance.check_out) {
    return res.status(400).json({ message: "Already checked out" });
  }

  const updated = await prisma.Attendance.update({
    where: { attendance_id: attendance.attendance_id },
    data: { check_out: new Date() },
  });

  res.json(updated);
};

/**
 * @desc Get logged-in employee attendance
 * @route GET /api/attendance/me
 * @access Employee
 */
export const getMyAttendance = async (req, res) => {
  const userId = req.user.user_id;

  const employee = await prisma.Employee.findUnique({
    where: { user_id: userId },
  });

  const attendance = await prisma.Attendance.findMany({
    where: { employee_id: employee.employee_id },
    orderBy: { date: "desc" },
  });

  res.json(attendance);
};

/**
 * @desc Get attendance of a specific employee
 * @route GET /api/attendance/employee/:employee_id
 * @access Admin / HR
 */
export const getAttendanceByEmployee = async (req, res) => {
  const { employee_id } = req.params;

  const attendance = await prisma.Attendance.findMany({
    where: { employee_id: Number(employee_id) },
    orderBy: { date: "desc" },
  });

  res.json(attendance);
};

/**
 * @desc Get attendance records by date
 * @route GET /api/attendance/date/:date
 * @access Admin / HR
 */
export const getAttendanceByDate = async (req, res) => {
  const date = new Date(req.params.date);
  date.setHours(0, 0, 0, 0);

  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 1);

  const attendance = await prisma.Attendance.findMany({
    where: {
      date: {
        gte: date,
        lt: nextDay,
      },
    },
    orderBy: { employee_id: "asc" },
  });

  res.json(attendance);
};

/**
 * @desc Update attendance status (correction by admin)
 * @route PUT /api/attendance/:attendance_id/status
 * @access Admin / HR
 */
export const updateAttendanceStatus = async (req, res) => {
  const { attendance_id } = req.params;
  const { status } = req.body;

  const updated = await prisma.Attendance.update({
    where: { attendance_id: Number(attendance_id) },
    data: { status },
  });

  res.json({
    message: "Attendance status updated",
    attendance: updated,
  });
};
