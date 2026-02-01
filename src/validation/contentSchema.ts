import z from "zod";

export const ContentTypeEnum = z.enum(["document", "tweet", "youtube", "link"]);

export const addContentSchema = z.object({
  type: ContentTypeEnum,
  title: z.string().min(1).max(500),
  tags: z.array(z.string().min(1).max(50)).max(10),
});

export const deleteContentSchema = z.object({
  contId: z.number().int().positive(),
});

export const shareLinkSchema = z.object({
  thisId: z.string().min(1).max(100),
});

export const getLinkSchema = z.object({
  thisId: z.string().min(1).max(100),
});
