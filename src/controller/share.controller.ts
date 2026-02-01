import type { Request, Response } from "express";
import { prisma } from "../config/db";
import { randomUUIDv7 } from "bun";

export async function createLink(req: Request, res: Response) {
  const thisId = Number(req.params.thisId);

  // 1️⃣ Find content owned by user
  const content = await prisma.content.findFirst({
    where: {
      id: thisId,
      userId: req.user.id,
    },
    select: {
      id: true,
      link: true,
      type: true,
      title: true,
    },
  });

  if (!content) {
    return res.status(403).json({
      message: "You don't have this Neuron",
    });
  }

  // 2️⃣ If link already exists → return it
  if (content.link) {
    return res.status(200).json({
      message: "Link already exists",
      data: content,
    });
  }

  // 3️⃣ Otherwise generate and save
  const newLink = randomUUIDv7();

  const updatedContent = await prisma.content.update({
    where: { id: content.id },
    data: { link: newLink },
    select: {
      id: true,
      link: true,
      type: true,
      title: true,
    },
  });

  return res.status(200).json({
    message: "Link created",
    data: updatedContent,
  });
}
