import type { Request, Response } from "express";
import { prisma } from "../config/db";
import { deleteContentSchema } from "../validation/contentSchema";
import { ZodError } from "zod";

export async function deleteContent(req: Request, res: Response) {
  try {
    // Validate input
    const validatedData = deleteContentSchema.parse(req.body);
    const { contId } = validatedData;

    const data = await prisma.content.delete({
      where: {
        id: contId,
        userId: req.user!.id,
      },
      select: {
        type: true,
        link: true,
        title: true,
      },
    });

    res.status(200).json({
      message: "Content deleted successfully",
      data: data,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
      });
    }

    // Handle Prisma not found error (content doesn't exist or doesn't belong to user)
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    console.error("Error in deleteContent:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
