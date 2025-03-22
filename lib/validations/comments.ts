import { z } from "zod";

export const commentPostSchema = z.object({
  content: z.string(),
});

export type commentPostSchemaType = z.infer<typeof commentPostSchema>;
