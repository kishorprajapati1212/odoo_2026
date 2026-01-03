import { prisma } from "../config/db.js";

/**
 * @desc Create Employee Profile
 * @route POST /api/employees
 */
export const createEmployee = async (req, res) => {
  const { user_id, name, phone, address, designation, department, join_date } = req.body;

  if (!user_id || !name || !phone || !address || !designation || !department || !join_date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if employee already exists for this user
    const existing = await prisma.Employee.findUnique({
      where: { user_id },
    });

    if (existing) {
      return res.status(400).json({ message: "Employee profile already exists for this user" });
    }

    const employee = await prisma.Employee.create({
      data: { user_id, name, phone, address, designation, department, join_date: new Date(join_date) },
    });

    res.status(201).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Get Employee Profile by ID
 * @route GET /api/employees/:id
 */
export const getEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await prisma.Employee.findUnique({
      where: { employee_id: Number(id) },
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Get All Employees (Admin)
 * @route GET /api/employees
 */
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await prisma.Employee.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Update Employee Profile
 * @route PUT /api/employees/:id
 */
export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, phone, address, designation, department, join_date } = req.body;

  try {
    const employee = await prisma.Employee.update({
      where: { employee_id: Number(id) },
      data: {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(address && { address }),
        ...(designation && { designation }),
        ...(department && { department }),
        ...(join_date && { join_date: new Date(join_date) }),
      },
    });

    res.json({ message: "Employee updated", employee });
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") { // Prisma record not found
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Delete Employee Profile
 * @route DELETE /api/employees/:id
 */
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.Employee.delete({
      where: { employee_id: Number(id) },
    });

    res.json({ message: "Employee deleted" });
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(500).json({ message: "Server error", error: error.message });
  }
};
