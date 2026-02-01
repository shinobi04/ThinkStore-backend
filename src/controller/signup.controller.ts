import { type Request, type Response } from "express";
import { UserSchema } from "../validation/userSchema";
import { hashPassword } from "../utils/password";
import { prisma } from "../config/db";

export async function singupController(req: Request, res: Response) {
  const payload = UserSchema.parse(req.body);
  const { username, password } = payload;
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });
  if (existingUser) {
    res.status(401).json({
      message: `user ${username} already exists`,
    });
  }
  const hashedPass = await hashPassword(password);
  await prisma.user.create({
    data: {
      username,
      password: hashedPass,
    },
  });
  res.status(200).json({
    username,
    hashedPass,
    message: "Success",
  });
}
