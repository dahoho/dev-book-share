import { useState } from "react";
import { toast } from "sonner";

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
  parentId?: string | null;
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
        toast.success("success", {
          description: "コメントが正常に投稿されました",
        });
      } else {
        return toast.error("問題が発生しました", {
          description:
            "コメントが投稿されませんでした。もう一度お試しください。",
        });
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
