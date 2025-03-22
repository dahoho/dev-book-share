"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type UseDeleteCommentPropsType = {
  onDeleteSuccess?: (commentId: string) => void;
};

export const useDeleteComment = ({
  onDeleteSuccess,
}: UseDeleteCommentPropsType = {}) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const router = useRouter();

  const deleteComment = async (commentId: string) => {
    setIsDeleteLoading(true);
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("コメントの削除に失敗しました");

      if (onDeleteSuccess) onDeleteSuccess(commentId);

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return {
    deleteComment,
    isDeleteLoading,
    showDialog,
    setShowDialog,
  };
};
