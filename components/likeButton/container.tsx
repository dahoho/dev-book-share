import { LikeButtonPresentational } from "@/components/likeButton/LikeButton";
import { useState, useCallback, useEffect } from "react";

type LikeButtonProps = {
  commentId: string;
  userId?: string;
};

export const LikeButtonContainer = ({ commentId, userId }: LikeButtonProps) => {
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const fetchLikeData = useCallback(async () => {
    const response = await fetch(`/api/comments/${commentId}/like`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      setHasLiked(data.hasLiked);
      setLikeCount(data.likeCount);
    }
  }, [commentId]);

  useEffect(() => {
    if (userId) {
      fetchLikeData();
    }
  }, [commentId, userId, fetchLikeData]);

  const handleLike = async () => {
    if (!userId) {
      alert("いいねするにはログインが必要です");
      return;
    }

    if (hasLiked) return;

    const response = await fetch(`/api/comments/${commentId}/like`, {
      method: "POST",
    });

    if (response.ok) {
      // いいねを追加した後、サーバーから最新の状態を再取得
      fetchLikeData();
    }
  };
  return (
    <LikeButtonPresentational
      userId={userId}
      hasLiked={hasLiked}
      likeCount={likeCount}
      handleLike={handleLike}
    />
  );
};
