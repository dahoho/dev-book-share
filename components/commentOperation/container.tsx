"use client";

import { CommentOperationPresentational } from "@/components/commentOperation/presentational";
import { useDeleteComment } from "@/hooks/useDeleteComment";

type CommentOperationContainerType = {
  commentId: string;
  handleEditing: () => void;
  onDeleteSuccess?: (commentId: string) => void;
};

export const CommentOperationContainer = ({
  commentId,
  handleEditing,
  onDeleteSuccess,
}: CommentOperationContainerType) => {
  const { deleteComment, showDialog, setShowDialog, isDeleteLoading } =
    useDeleteComment({
      onDeleteSuccess,
    });

  return (
    <CommentOperationPresentational
      commentId={commentId}
      deleteComment={deleteComment}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      isDeleteLoading={isDeleteLoading}
      setIsDeleteLoading={() => {}}
      handleEditing={handleEditing}
    />
  );
};
