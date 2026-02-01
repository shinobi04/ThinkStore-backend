import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../config/db";

const acctk = process.env.ACCESS_TOKEN_SECRET!;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET!;

export function generateAccessToken(userId: number): string {
  return jwt.sign({ userId, type: "access" }, acctk, {
    expiresIn: "15m",
  });
}

export function generateRefreshToken(userId: number, tokenId: string): string {
  return jwt.sign({ userId, tokenId, type: "refresh" }, refreshSecret, {
    expiresIn: "7d",
  });
}

export function verifyAccessToken(token: string): { userId: number } {
  return jwt.verify(token, acctk) as { userId: number };
}

export function verifyRefreshToken(token: string): { userId: number; tokenId: string } {
  return jwt.verify(token, refreshSecret) as { userId: number; tokenId: string };
}

export async function hashToken(token: string): Promise<string> {
  return bcrypt.hash(token, 10);
}

export async function verifyTokenHash(token: string, hash: string): Promise<boolean> {
  return bcrypt.compare(token, hash);
}

export async function isTokenBlacklisted(tokenHash: string): Promise<boolean> {
  const token = await prisma.refreshToken.findUnique({
    where: { tokenHash },
  });
  return !token || token.revokedAt !== null;
}
