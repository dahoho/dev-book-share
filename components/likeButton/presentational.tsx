import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

type LikeButtonProps = {
  userId?: string;
  hasLiked: boolean;
  likeCount: number;
  handleLike: () => void;
};

export const LikeButtonPresentational = ({
  userId,
  hasLiked,
  likeCount,
  handleLike,
}: LikeButtonProps) => {
  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={!userId || hasLiked}
      className="cursor-pointer flex items-center gap-1 text-xl"
    >
      <div className="text-[#ff1744]">
        {hasLiked ? <FaHeart /> : <FaRegHeart />}
      </div>
      <span className="text-sm">{likeCount}</span>
    </button>
  );
};
