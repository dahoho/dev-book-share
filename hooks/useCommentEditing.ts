import { useState } from "react";

export type CommentEditingType = {
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
  parentId?: string;
  updatedAt: Date;
};

export const useCommentEditing = (initialComment: CommentEditingType) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [comment, setComment] = useState<CommentEditingType>(initialComment);

  const handleSaveEdit = async (newContent: string) => {
    try {
      const res = await fetch(`/api/comments/${comment.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newContent }),
      });
      if (res.ok) {
        const updatedComment: CommentEditingType = await res.json();
        setComment(updatedComment);
        setIsEditing(false);
      } else {
        console.error("コメントの更新に失敗しました");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    isEditing,
    setIsEditing,
    comment,
    handleSaveEdit,
  };
};
