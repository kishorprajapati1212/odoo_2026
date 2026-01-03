import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js";
import generateToken from "../utils/generateToken.js";

/**
 * @route POST /api/users/register
 */
export const registerUser = async (req, res) => {
  const { email, password, role } = req.body;

  const existingUser = await prisma.User.findUnique({
    where: { email },
  });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.User.create({
    data: {
      email,
      password: hashedPassword,
      role,
      status: true,
    },
  });

  res.status(201).json({
    user_id: user.user_id,
    email: user.email,
    role: user.role,
    token: generateToken(user),
  });
};

/**
 * @route POST /api/users/login
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.User.findUnique({
    where: { email },
  });

  if (!user || !user.status) {
    res.status(401);
    throw new Error("Invalid credentials or inactive user");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  res.json({
    user_id: user.user_id,
    email: user.email,
    role: user.role,
    token: generateToken(user),
  });
};

/**
 * @route GET /api/users/me
 */
export const getMe = async (req, res) => {
  res.json(req.user);
};

/**
 * @route PUT /api/users/:id/status
 */
export const updateUserStatus = async (req, res) => {
  console.log("req.body =", req.body);
  const { status } = req.body;

  const user = await prisma.User.update({
    where: { user_id: Number(req.params.id) },
    data: { status },
  });

  res.json({
    message: "User status updated",
    user_id: user.user_id,
    status: user.status,
  });
};


