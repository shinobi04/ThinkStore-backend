import type { Request, Response } from "express";

export async function meController(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    res.status(200).json({
      user: {
        id: req.user.id,
        username: req.user.username,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
