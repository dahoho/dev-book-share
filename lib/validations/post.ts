import { z } from "zod";

export const postPatchSchema = z.object({
  title: z
    .string()
    .max(128, { message: "記事のタイトルは128文字以内で入力してください。" }),
  content: z.string().optional(),
  published: z.boolean().optional(),
  tags: z.array(z.string()).default([]),
});

export type postPatchSchemaType = z.infer<typeof postPatchSchema>;
