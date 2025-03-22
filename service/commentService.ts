import { db } from "@/lib/prisma";

// 投稿IDに紐づくコメントを取得
export const fetchCommentsByPostId = async (postId: string) => {
  return await db.comment.findMany({
    where: {
      postId,
      parentId: null, // トップレベルのコメントのみ取得
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
      replies: {
        include: {
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

// コメントを作成する関数
export const createComment = async (
  postId: string,
  authorId: string,
  content: string,
  parentId?: string
) => {
  return await db.comment.create({
    data: {
      content,
      post: { connect: { id: postId } },
      author: { connect: { id: authorId } },
      ...(parentId ? { parent: { connect: { id: parentId } } } : {}),
    },
    include: {
      author: {
        select: { name: true, image: true },
      },
    },
  });
};
