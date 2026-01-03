import { prisma } from "../config/db.js";

/**
 * @desc Create payroll record
 * @route POST /api/payroll
 * @access Admin / HR
 */
export const createPayroll = async (req, res) => {
  const { employee_id, basic_salary, allowances, deductions, month } = req.body;

  if (
    !employee_id ||
    basic_salary == null ||
    allowances == null ||
    deductions == null ||
    !month
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const net_salary = basic_salary + allowances - deductions;

  const payroll = await prisma.Payroll.create({
    data: {
      employee_id: Number(employee_id),
      basic_salary,
      allowances,
      deductions,
      net_salary,
      month,
    },
  });

  res.status(201).json(payroll);
};

/**
 * @desc Get logged-in employee payroll records
 * @route GET /api/payroll/me
 * @access Employee
 */
export const getMyPayroll = async (req, res) => {
  const employee = await prisma.Employee.findUnique({
    where: { user_id: req.user.user_id },
  });

  if (!employee) {
    return res.status(404).json({ message: "Employee profile not found" });
  }

  const payroll = await prisma.Payroll.findMany({
    where: { employee_id: employee.employee_id },
    orderBy: { month: "desc" },
  });

  res.json(payroll);
};

/**
 * @desc Get payroll records of a specific employee
 * @route GET /api/payroll/employee/:employee_id
 * @access Admin / HR
 */
export const getPayrollByEmployee = async (req, res) => {
  const { employee_id } = req.params;

  const payroll = await prisma.Payroll.findMany({
    where: { employee_id: Number(employee_id) },
    orderBy: { month: "desc" },
  });

  res.json(payroll);
};

/**
 * @desc Update payroll record
 * @route PUT /api/payroll/:payroll_id
 * @access Admin / HR
 */
export const updatePayroll = async (req, res) => {
  const { payroll_id } = req.params;
  const { basic_salary, allowances, deductions, month } = req.body;

  const payroll = await prisma.Payroll.findUnique({
    where: { payroll_id: Number(payroll_id) },
  });

  if (!payroll) {
    return res.status(404).json({ message: "Payroll record not found" });
  }

  const updated_basic = basic_salary ?? payroll.basic_salary;
  const updated_allowances = allowances ?? payroll.allowances;
  const updated_deductions = deductions ?? payroll.deductions;

  const updated = await prisma.Payroll.update({
    where: { payroll_id: Number(payroll_id) },
    data: {
      basic_salary: updated_basic,
      allowances: updated_allowances,
      deductions: updated_deductions,
      net_salary: updated_basic + updated_allowances - updated_deductions,
      ...(month && { month }),
    },
  });

  res.json({ message: "Payroll updated", payroll: updated });
};

/**
 * @desc Delete payroll record
 * @route DELETE /api/payroll/:payroll_id
 * @access Admin / HR
 */
export const deletePayroll = async (req, res) => {
  const { payroll_id } = req.params;

  await prisma.Payroll.delete({
    where: { payroll_id: Number(payroll_id) },
  });

  res.json({ message: "Payroll record deleted" });
};
