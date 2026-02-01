import type { Request, Response } from "express";
import { prisma } from "../config/db";

export async function deleteContent(req: Request, res: Response) {
  try {
    const { contId } = req.body;

    if (!contId) {
      return res.status(403).json({
        message: "provide ID",
      });
    }
    const userContent = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        contents: true,
      },
    });
    const arr = userContent?.contents.filter((id) => id.id == contId);
    if (arr?.length == 0) {
      return res.status(403).json({
        message: "You Don't Own this shit",
      });
    }

    const data = await prisma.content.delete({
      where: { id: contId },
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
      message: "You Don't own this shit",
    });
  }
}
