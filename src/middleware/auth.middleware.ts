import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { verifyAccessToken } from "../utils/jwt";
import { prisma } from "../config/db";

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ message: "Access token required" });
    }

    const decoded = verifyAccessToken(accessToken);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
}
