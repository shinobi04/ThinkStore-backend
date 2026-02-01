import type { Request, Response } from "express";
import { prisma } from "../config/db";

export async function deleteContent(req: Request, res: Response) {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(403).json({
        message: "provide ID",
      });
    }
    const data = await prisma.content.delete({
      where: { id },
      select: {
        type: true,
        link: true,
        title: true,
      },
    });
    res.status(200).json({
      message: "Delete Success",
      data: data,
    });
  } catch (error) {
    res.status(403).json({
      message: "You Don't Own this shit",
    });
  }
}
