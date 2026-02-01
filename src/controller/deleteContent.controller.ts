import type { Request, Response } from "express";

export async function deleteContent(req: Request, res: Response) {
  res.status(200).json({
    message: "Delete Success",
  });
}
