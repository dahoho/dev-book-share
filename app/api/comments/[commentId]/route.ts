// app/api/comments/[commentId]/route.ts
import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function DELETE(
  req: NextRequest,
  context: { params: { commentId: string } }
) {
  const resolvedParams = await Promise.resolve(context.params);
  const { commentId } = resolvedParams;

  const user = await getCurrentUser();
  if (!user) return NextResponse.json("Unauthorized", { status: 401 });

  try {
    const comment = await db.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) return NextResponse.json("Not found", { status: 404 });
    if (comment.authorId !== user.id)
      return NextResponse.json("Forbidden", { status: 403 });

    // コメント削除（onDelete: Cascadeにより返信も自動削除）
    await db.comment.delete({
      where: { id: commentId },
    });

    // 親コメントの場合のみ、投稿のコメント数を更新
    if (!comment.parentId) {
      await db.post.update({
        where: { id: comment.postId },
        data: { numberOfAnswers: { decrement: 1 } },
      });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Comment deletion error:", error);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: { commentId: string } }
) {
  const resolvedParams = await Promise.resolve(context.params);
  const { commentId } = resolvedParams;

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  try {
    const json = await req.json();
    const updateSchema = z.object({
      content: z.string(),
    });

    const { content } = updateSchema.parse(json);

    // コメントが存在し、かつユーザーが所有者か確認する
    const comment = await db.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment || comment.authorId !== user.id) {
      return NextResponse.json("Forbidden", { status: 403 });
    }

    const updatedComment = await db.comment.update({
      where: { id: commentId },
      data: { content },
      include: {
        author: { select: { name: true, image: true } },
      },
    });

    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    }
    return NextResponse.json(null, { status: 500 });
  }
}
