import type { Request, Response } from "express";

export async function createLink(req: Request, res: Response) {
  res.status(200).json({
    message: "Hit",
  });
}
