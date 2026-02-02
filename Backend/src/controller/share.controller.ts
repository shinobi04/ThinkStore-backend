import type { Request, Response } from "express";
import { prisma } from "../config/db";
import { randomUUIDv7 } from "bun";
import { ZodError } from "zod";

export async function createLink(req: Request, res: Response) {
  try {
    const thisId = Number(req.params.thisId);

    if (isNaN(thisId) || thisId <= 0) {
      return res.status(400).json({
        message: "Invalid content ID",
      });
    }

    // Find content owned by user
    const content = await prisma.content.findFirst({
      where: {
        id: thisId,
        userId: req.user!.id,
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
        message: "Access denied",
      });
    }

    // If link already exists → return it
    if (content.link) {
      return res.status(200).json({
        message: "Link already exists",
        data: content,
      });
    }

    // Otherwise generate and save
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
  } catch (error) {
    console.error("Error in createLink:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getLink(req: Request, res: Response) {
  try {
    const thisId = String(req.params.thisId);

    // Basic validation for the link ID
    if (!thisId || thisId.length > 100) {
      return res.status(400).json({
        message: "Invalid link",
      });
    }

    const content = await prisma.content.findFirst({
      where: { link: thisId },
      select: {
        user: {
          select: {
            username: true,
          },
        },
        type: true,
        title: true,
        tags: true,
        createdAt: true,
      },
    });

    if (content == null) {
      return res.status(404).json({
        message: "Link not found",
      });
    }

    return res.status(200).json({
      message: "Success",
      data: content,
    });
  } catch (error) {
    console.error("Error in getLink:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
