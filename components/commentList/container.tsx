"use client";

import { CommentListPresentational } from "@/components/commentList/presentational";
import { useCommentEditing } from "@/hooks/useCommentEditing";
import { useCommentReply } from "@/hooks/useCommentReply";
import { User } from "next-auth";
import { useState } from "react";

type CommentListContainerPropsType = {
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
    replies?: CommentListContainerPropsType["initialComment"][];
  };
  user?: User;
  post: {
    createdAt: Date;
  };
  onRemoveFromParent?: (commentId: string) => void;
};

export const CommentListContainer = ({
  initialComment,
  user,
  post,
  onRemoveFromParent,
}: CommentListContainerPropsType) => {
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
    <CommentListPresentational
      initialComment={initialComment}
      user={user}
      post={post}
      handleDeleteSuccess={handleDeleteSuccess}
      comment={comment}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      handleSaveEdit={handleSaveEdit}
      isReplying={isReplying}
      setIsReplying={setIsReplying}
      replies={replies}
      handleReply={handleReply}
      removeReply={removeReply}
    />
  );
};
