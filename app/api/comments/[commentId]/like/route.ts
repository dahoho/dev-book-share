import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  const { commentId } = await params;
  const user = await getCurrentUser();
  if (!user) return NextResponse.json("Unauthorized", { status: 401 });

  // 既にいいねしているかを確認
  const existingLike = await db.commentLike.findUnique({
    where: {
      commentId_userId: { commentId, userId: user.id },
    },
  });

  if (existingLike) {
    return NextResponse.json("Already liked", { status: 400 });
  }

  try {
    const newLike = await db.commentLike.create({
      data: {
        commentId,
        userId: user.id,
      },
    });
    return NextResponse.json(newLike, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  const { commentId } = await params;

  const user = await getCurrentUser();

  // 対象コメントのいいね件数をカウント
  const likeCount = await db.commentLike.count({
    where: { commentId },
  });

  // 現在のユーザーがこのコメントにいいねしているか確認
  let hasLiked = false;

  if (user) {
    const userLike = await db.commentLike.findUnique({
      where: {
        commentId_userId: { commentId, userId: user.id },
      },
    });
    hasLiked = !!userLike;
  }

  return NextResponse.json({ likeCount, hasLiked });
}
