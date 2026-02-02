import type { Request, Response } from "express";
import { prisma } from "../config/db";
import { addContentSchema } from "../validation/contentSchema";
import { ZodError } from "zod";

export async function addContent(req: Request, res: Response) {
  try {
    // Validate input
    const validatedData = addContentSchema.parse(req.body);
    const { type, title, tags } = validatedData;

    const data = await prisma.content.create({
      data: {
        type,
        title,
        user: {
          connect: { id: req.user!.id },
        },
        tags: {
          connectOrCreate: tags.map((tag: string) => ({
            where: {
              name: tag.trim().toLowerCase(),
            },
            create: {
              name: tag.trim().toLowerCase(),
            },
          })),
        },
      },
      include: {
        tags: true,
      },
    });

    res.status(201).json({
      message: "Content created successfully",
      data: data,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
      });
    }

    console.error("Error in addContent:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
