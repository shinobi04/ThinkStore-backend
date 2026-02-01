import jwt from "jsonwebtoken";
const acctk = process.env.ACCESS_TOKEN_SECRET!;
export async function generateAccessToken(username: number) {
  return jwt.sign({ username }, acctk, {
    expiresIn: "15m",
  });
}

export async function generateRefreshToken(username: number) {
  return jwt.sign({ username }, acctk, {
    expiresIn: "7d",
  });
}

export async function verifyAccessToken(token: string) {
  return jwt.verify(token, acctk);
}
