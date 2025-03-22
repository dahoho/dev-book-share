import { useRouter } from "next/navigation";
import { useState } from "react";

import { toast } from "sonner";

// 投稿記事削除のカスタムフック
export const useDeletePost = () => {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const deletePost = async (postId: string) => {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      toast.error("問題が発生しました", {
        description: "投稿が削除されませんでした。もう一度お試しください。",
      });
      return;
    }

    setIsDeleteLoading(false);
    router.refresh();

    toast.success("success", {
      description: "投稿が正常に削除されました",
    });
  };
  return {
    deletePost,
    showDialog,
    setShowDialog,
    isDeleteLoading,
    setIsDeleteLoading,
  };
};
