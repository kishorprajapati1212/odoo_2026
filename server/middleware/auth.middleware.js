import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await prisma.User.findUnique({
        where: { user_id: decoded.id },
        select: {
          user_id: true,
          email: true,
          role: true,
          status: true,
        },
      });

      if (!user || !user.status) {
        return res.status(401).json({ message: "User inactive or not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export default protect;
