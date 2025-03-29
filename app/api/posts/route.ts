import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
  published: z.boolean(),
  tags: z.array(z.string()).default([]),
});

export async function POST(req: NextRequest) {
  try {
    // ユーザーがログインしているかどうかを確認
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    // リクエストボディからJSONを取得
    const json = await req.json();
    const body = postCreateSchema.parse(json);
    const { title, content, published, tags } = body;

    const post = await db.post.create({
      data: {
        title,
        content,
        published,
        tags,
        authorId: user?.id || "",
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
}
