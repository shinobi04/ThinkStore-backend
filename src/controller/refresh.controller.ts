import type { Request, Response } from "express";
import { prisma } from "../config/db";
import {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  verifyTokenHash,
} from "../utils/jwt";

export async function refreshController(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (error) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { id: decoded.tokenId },
      include: { user: true },
    });

    if (!tokenRecord) {
      return res.status(401).json({ message: "Token not found" });
    }

    if (tokenRecord.revokedAt) {
      return res.status(401).json({ message: "Token revoked" });
    }

    if (new Date() > tokenRecord.expiresAt) {
      return res.status(401).json({ message: "Token expired" });
    }

    const isValid = await verifyTokenHash(refreshToken, tokenRecord.tokenHash);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const newRefreshTokenRecord = await prisma.refreshToken.create({
      data: {
        userId: tokenRecord.userId,
        tokenHash: "",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        ipAddress: req.ip || null,
        userAgent: req.headers["user-agent"] || null,
      },
    });

    const accessToken = generateAccessToken(tokenRecord.user.id);
    const newRefreshToken = generateRefreshToken(
      tokenRecord.user.id,
      newRefreshTokenRecord.id
    );

    await prisma.$transaction([
      prisma.refreshToken.update({
        where: { id: tokenRecord.id },
        data: {
          revokedAt: new Date(),
          replacedByTokenId: newRefreshTokenRecord.id,
        },
      }),
      prisma.refreshToken.update({
        where: { id: newRefreshTokenRecord.id },
        data: { tokenHash: await hashToken(newRefreshToken) },
      }),
    ]);

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/auth/refresh",
      })
      .status(200)
      .json({
        message: "Token refreshed successfully",
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
