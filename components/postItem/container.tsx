"use client";

import { PostItemPresentational } from "@/components/postItem/presentational";
import { Post } from "@prisma/client";
import { usePathname } from "next/navigation";

type PostWithAuthor = Post & {
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

type PostItemContainerType = {
  post: PostWithAuthor;
};

export const PostItemContainer = ({ post }: PostItemContainerType) => {
  const isDashboard = usePathname() === "/dashboard";

  return <PostItemPresentational isDashboard={isDashboard} post={post} />;
};
