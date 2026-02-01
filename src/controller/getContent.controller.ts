import type { Request, Response } from "express";
import { prisma } from "../config/db";

export async function getContent(req: Request, res: Response) {
  const data = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      contents: {
        include: {
          tags: true,
        },
      },
    },
  });
  res.status(200).json({
    message: "Hittt",
    data: data,
  });
}
