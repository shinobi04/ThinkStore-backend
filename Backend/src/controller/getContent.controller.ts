import type { Request, Response } from "express";
import { prisma } from "../config/db";

export async function getContent(req: Request, res: Response) {
  try {
    const data = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        contents: {
          include: {
            tags: true,
          },
        },
      },
    });

    return res.status(200).json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    console.error("Error in getContent:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
