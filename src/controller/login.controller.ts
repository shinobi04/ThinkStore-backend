import { prisma } from "../config/db";
import { UserSchema } from "../validation/userSchema";
import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/jwt";

export async function loginController(req: Request, res: Response) {
  try {
    const payload = UserSchema.parse(req.body);
    const { username, password } = payload;

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (!existingUser) {
      return res.status(403).json({
        message: "Invalid credentials",
      });
    }

    const checkP = await bcrypt.compare(password, existingUser.password);

    if (!checkP) {
      return res.status(403).json({
        message: "Invalid credentials",
      });
    }

    const accessToken = generateAccessToken(existingUser.id);

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // 👈 important
        sameSite: "strict",
        maxAge: 3600000, // 1 hour
      })
      .status(200)
      .json({
        message: `Welcome ${username}`,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
