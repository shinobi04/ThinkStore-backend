import type { Request, Response } from "express";
import { prisma } from "../config/db";

export async function addContent(req: Request, res: Response) {
  const { type, link, title, tags } = req.body;
  const data = await prisma.content.create({
    data: {
      type,
      link,
      title,
      user: {
        connect: { id: req.user.id },
      },
      tags: {
        connectOrCreate: tags.map((tags: string) => ({
          where: {
            name: tags.trim().toLocaleLowerCase(),
          },
          create: {
            name: tags.trim().toLocaleLowerCase(),
          },
        })),
      },
    },
    include: {
      tags: true,
    },
  });
  res.status(200).json({
    message: "Content Created",
    data: data,
  });
}
