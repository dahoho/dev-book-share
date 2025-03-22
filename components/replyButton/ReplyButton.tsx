import { MessageCircle } from "lucide-react";
import React from "react";

type ReplyButtonPropsType = {
  handleClickSetReplying: () => void;
};

export const ReplyButton = ({
  handleClickSetReplying,
}: ReplyButtonPropsType) => {
  return (
    <div>
      <button
        className="text-gray-500 text-md flex items-center gap-2 cursor-pointer"
        onClick={handleClickSetReplying}
      >
        <MessageCircle size={20} />
        返信する
      </button>
    </div>
  );
};
