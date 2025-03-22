import { db } from "@/lib/prisma";

// 投稿を取得する関数
export const fetchPosts = async (authorId?: string) => {
  const whereCondition = authorId ? { authorId } : {};

  return await db.post.findMany({
    where: whereCondition,
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      title: true,
      tags: true,
      content: true,
      numberOfAnswers: true,
      published: true,
      authorId: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// 指定されたIDの投稿を取得する関数
export const fetchPostById = async (id: string) => {
  return await db.post.findUnique({
    where: { id },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      title: true,
      tags: true,
      content: true,
      numberOfAnswers: true,
      published: true,
      authorId: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
};

// カテゴリーごとの記事数を取得する関数
export const fetchPostCountByTags = async () => {
  const posts = await db.post.findMany({
    where: {
      published: true,
    },
    select: {
      tags: true,
    },
  });

  const tagCounts: Record<string, number> = {};

  const allPostsCount = posts.length;
  tagCounts["すべて"] = allPostsCount;

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (tagCounts[tag]) tagCounts[tag]++;
      else tagCounts[tag] = 1;
    });
  });

  return tagCounts;
};
