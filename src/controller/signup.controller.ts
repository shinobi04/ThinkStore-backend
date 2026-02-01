import { type Request, type Response } from "express";
import { UserSchema } from "../validation/userSchema";
import { hashPassword } from "../utils/password";
import { prisma } from "../config/db";
import { ZodError } from "zod";

export async function singupController(req: Request, res: Response) {
  try {
    const payload = UserSchema.parse(req.body);
    const { username, password } = payload;

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      // Generic error message to prevent username enumeration
      return res.status(400).json({
        message: "Registration failed",
      });
    }

    const hashedPass = await hashPassword(password);
    
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPass,
      },
      select: {
        id: true,
        username: true,
      },
    });

    return res.status(201).json({
      user: {
        id: newUser.id,
        username: newUser.username,
      },
      message: "Registration successful",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
      });
    }

    console.error("Error in signup:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
