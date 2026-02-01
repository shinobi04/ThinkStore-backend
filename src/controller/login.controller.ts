import { prisma } from "../config/db";
import { UserSchema } from "../validation/userSchema";
import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken, hashToken } from "../utils/jwt";
import { randomUUID } from "crypto";

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

    // Delete all existing refresh tokens for this user
    await prisma.refreshToken.deleteMany({
      where: { userId: existingUser.id },
    });

    const accessToken = generateAccessToken(existingUser.id);

    // Generate token ID and create refresh token with hash immediately
    const tokenId = randomUUID();
    const refreshToken = generateRefreshToken(existingUser.id, tokenId);
    const tokenHash = await hashToken(refreshToken);

    // Create the record with actual hash
    await prisma.refreshToken.create({
      data: {
        id: tokenId,
        userId: existingUser.id,
        tokenHash: tokenHash,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        ipAddress: req.ip || null,
        userAgent: req.headers["user-agent"] || null,
      },
    });

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/auth/refresh",
      })
      .status(200)
      .json({
        message: `Welcome ${username}`,
        user: {
          id: existingUser.id,
          username: existingUser.username,
        },
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
