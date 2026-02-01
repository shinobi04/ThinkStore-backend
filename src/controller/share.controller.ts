import type { Request, Response } from "express";
import { prisma } from "../config/db";
import { randomUUIDv7 } from "bun";

export async function createLink(req: Request, res: Response) {
  const thisId = Number(req.params.thisId);

  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      contents: true,
    },
  });

  const content = user?.contents.filter((id) => id.id == thisId);
  console.log(content);
  if (content?.length == 0) {
    return res.status(403).json({
      message: "You don't have this Neuron",
    });
  }

  content;

  const link = randomUUIDv7();
  console.log(link);

  const updatedContent = await prisma.content.update({
    where: {
      id: thisId,
    },
    data: {
      link: link,
    },
    select: {
      id: true,
      type: true,
      link: true,
      title: true,
    },
  });

  res.status(200).json({
    message: "Hit",
    data: updatedContent,
  });
}
