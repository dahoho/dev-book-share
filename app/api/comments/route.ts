import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const commentCreateSchema = z.object({
  postId: z.string(),
  content: z.string(),
  parentId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();

  if (!user) return NextResponse.json("Unauthorized", { status: 401 });

  try {
    const json = await req.json();
    const { postId, content, parentId } = commentCreateSchema.parse(json);

    const comment = await db.comment.create({
      data: {
        content,
        post: { connect: { id: postId } },
        author: { connect: { id: user.id ?? "" } },
        ...(parentId ? { parent: { connect: { id: parentId } } } : {}),
      },
      include: {
        author: {
          select: { name: true, image: true },
        },
      },
    });

    // 返信以外のコメントの場合のみ、投稿のコメント数を更新
    if (!parentId) {
      await db.post.update({
        where: { id: postId },
        data: { numberOfAnswers: { increment: 1 } },
      });
    }

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
}
