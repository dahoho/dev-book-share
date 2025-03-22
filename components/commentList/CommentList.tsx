"use client";

import { CommentOperation } from "@/components/commentOperation";
import { InlineCommentEditor } from "@/components/inlineCommentEditor";
import { LikeButton } from "@/components/likeButton";
import { ReplyButton } from "@/components/replyButton";
import { Separator } from "@/components/ui/separator";
import { DATE_FORMAT } from "@/constans";
import { useCommentEditing } from "@/hooks/useCommentEditing";
import { useCommentReply } from "@/hooks/useCommentReply";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import dayjs from "dayjs";
import { User } from "next-auth";
import { useState } from "react";

type CommentListPropsType = {
  initialComment: {
    author: {
      image: string | null;
      name: string | null;
    };
  } & {
    id: string;
    authorId: string;
    createdAt: Date;
    content: string;
    postId: string;
    updatedAt: Date;
    parentId?: string | null;
    replies?: CommentListPropsType["initialComment"][];
  };
  user?: User;
  post: {
    createdAt: Date;
  };
  onRemoveFromParent?: (commentId: string) => void;
};

export const CommentList = ({
  initialComment,
  user,
  post,
  onRemoveFromParent,
}: CommentListPropsType) => {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const { isEditing, setIsEditing, comment, handleSaveEdit } =
    useCommentEditing(initialComment);
  const { isReplying, setIsReplying, replies, handleReply, removeReply } =
    useCommentReply({
      initialComment,
      comment,
    });

  const handleDeleteSuccess = (commentId: string) => {
    if (commentId === comment.id) {
      // 自分自身が削除された場合
      setIsDeleted(true);
      // 親リストから削除するための通知
      if (onRemoveFromParent) onRemoveFromParent(commentId);
    }
  };

  // 削除済みのコメントは表示しない
  if (isDeleted) return null;

  return (
    <li key={comment.id}>
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              className={`w-8 rounded-full`}
              src={comment.author.image ?? ""}
              alt={comment.author.name ?? ""}
            />
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <p>{comment.author.name}</p>
            <time
              dateTime={dayjs(comment.createdAt).format(DATE_FORMAT)}
              className="text-xs text-gray-500 block"
            >
              {dayjs(comment.createdAt).format(DATE_FORMAT)}
            </time>
          </div>
        </div>
        {user?.id === comment.authorId && (
          <CommentOperation
            commentId={comment.id}
            handleEditing={() => setIsEditing(true)}
            onDeleteSuccess={handleDeleteSuccess}
          />
        )}
      </div>

      {isEditing ? (
        <InlineCommentEditor
          initialContent={comment.content}
          onSave={(newContent) => handleSaveEdit(newContent)}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div
          className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mt-5 focus:outline-none "
          dangerouslySetInnerHTML={{ __html: String(comment.content) }}
        />
      )}

      <div className="flex items-center gap-4 mt-5">
        {user?.id !== comment.authorId && (
          <LikeButton commentId={comment.id} userId={user?.id} />
        )}
        {!isReplying && !comment.parentId && (
          <ReplyButton handleClickSetReplying={() => setIsReplying(true)} />
        )}
      </div>

      {isReplying && (
        <InlineCommentEditor
          initialContent=""
          onSave={(replyContent) => handleReply(replyContent)}
          onCancel={() => setIsReplying(false)}
        />
      )}

      <Separator className="bg-gray-300 my-5" />
      {replies.length > 0 && (
        <ul className="flex flex-col">
          {replies.map((reply) => (
            <CommentList
              key={reply.id}
              initialComment={reply}
              user={user}
              post={post}
              onRemoveFromParent={removeReply}
            />
          ))}
        </ul>
      )}
    </li>
  );
};
