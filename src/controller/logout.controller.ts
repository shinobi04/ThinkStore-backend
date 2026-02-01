import type { Request, Response } from "express";
import { prisma } from "../config/db";
import { verifyRefreshToken } from "../utils/jwt";

export async function logoutController(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      try {
        const decoded = verifyRefreshToken(refreshToken);
        
        await prisma.refreshToken.updateMany({
          where: {
            userId: req.user!.id,
            revokedAt: null,
          },
          data: {
            revokedAt: new Date(),
          },
        });
      } catch (error) {
        // Token is invalid, but we still want to clear cookies
      }
    }

    res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/auth/refresh",
      })
      .status(200)
      .json({
        message: "Logged out successfully",
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
