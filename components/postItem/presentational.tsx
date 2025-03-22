"use client";

import { Post } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { PostOperation } from "@/components/postOperation";
import { DATE_FORMAT } from "@/constans";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import dayjs from "dayjs";

type PostWithAuthor = Post & {
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

type PostItemPresentationalType = {
  isDashboard: boolean;
  post: PostWithAuthor;
};

export const PostItemPresentational = ({
  post,
  isDashboard,
}: PostItemPresentationalType) => {
  return (
    <li
      key={post.id}
      className="rounded-md border border-gray-300 shadow-xs relative"
    >
      {isDashboard && (
        <div className="absolute top-6 right-6">
          <PostOperation postId={post.id} />
        </div>
      )}
      <Link className="block p-4" href={`/post/${post.id}`}>
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  className={`w-8 rounded-full`}
                  src={post.author.image ?? ""}
                  alt={post.author.name ?? ""}
                />
              </Avatar>
              <div className="flex flex-col gap-0.5">
                <p className="text-md">{post.author.name}</p>
                <time
                  dateTime={dayjs(post.createdAt).format(DATE_FORMAT)}
                  className="text-xs text-gray-500 block"
                >
                  {dayjs(post.createdAt).format(DATE_FORMAT)}
                </time>
              </div>
            </div>
            {isDashboard && (
              <Badge
                className={`text-xs border bg-transparent ${
                  post.published
                    ? "text-green-600 border-green-600"
                    : "text-red-600 border-red-600"
                }`}
              >
                {post.published ? "公開中" : "下書き"}
              </Badge>
            )}
          </div>
        </div>

        <p className="text-xl font-bold mt-4">{post.title}</p>

        <div className="flex items-center gap-2 mt-4">
          <ul className="flex items-center gap-2">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Badge>{tag}</Badge>
              </li>
            ))}
          </ul>
          <p className="text-sm flex items-center gap-1">
            <MessageCircle size={18} />
            {post.numberOfAnswers}件
          </p>
        </div>
      </Link>
    </li>
  );
};
