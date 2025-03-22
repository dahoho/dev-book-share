"use client";

import { Post } from "@prisma/client";

import { useAtom } from "jotai";
import { usePathname } from "next/navigation";
import { categoryState } from "@/lib/atoms/state";
import { PostListPresentational } from "@/components/postList/presentational";

type PostWithAuthor = Post & {
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

type PostListContainerType = {
  post: PostWithAuthor[];
};

export const PostListContainer = ({ post }: PostListContainerType) => {
  const [category] = useAtom(categoryState);
  const isDashboard = usePathname() === "/dashboard";

  // TODO: findManyのwhere句でフィルタリングすることができそうかも
  const publishedPosts = post.filter((item) => item.published);

  // TODO: findManyのwhere句でフィルタリングすることができそうかも
  const filteredPosts =
    category !== "すべて"
      ? publishedPosts.filter((item) => item.tags.includes(category))
      : publishedPosts;

  return (
    <PostListPresentational
      isDashboard={isDashboard}
      posts={isDashboard ? post : filteredPosts}
    />
  );
};
