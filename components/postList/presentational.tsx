"use client";

import { PostItem } from "@/components/postItem";
import { Post } from "@prisma/client";

type PostWithAuthor = Post & {
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

type PostListPresentationalType = {
  isDashboard: boolean;
  posts: PostWithAuthor[];
};

export const PostListPresentational = ({
  posts,
}: PostListPresentationalType) => {
  return posts.length ? (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-y-6 gap-x-[3%]">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  ) : (
    <p className="text-center">記事が見つかりませんでした。</p>
  );
};
