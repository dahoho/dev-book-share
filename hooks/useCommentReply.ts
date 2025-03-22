import { User } from "next-auth";
import { useState, useEffect } from "react";
import { toast } from "sonner";

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
};

type CommentReplyType = {
  initialComment: CommentListPropsType["initialComment"];
  comment: CommentListPropsType["initialComment"];
};

export const useCommentReply = ({
  initialComment,
  comment,
}: CommentReplyType) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replies, setReplies] = useState(initialComment.replies || []);

  useEffect(() => {
    setReplies(initialComment.replies || []);
  }, [initialComment.replies]);

  const handleReply = async (replyContent: string) => {
    try {
      const response = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: comment.postId,
          content: replyContent,
          parentId: comment.id,
        }),
      });

      if (!response.ok) {
        return toast.error("問題が発生しました", {
          description:
            "コメントが投稿されませんでした。もう一度お試しください。",
        });
      }

      const newReply = await response.json();
      setReplies((prev) => [...prev, newReply]);
      setIsReplying(false);

      toast.success("success", {
        description: "コメントが正常に投稿されました",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const removeReply = (replyId: string) => {
    setReplies((prev) => prev.filter((reply) => reply.id !== replyId));
  };

  return { isReplying, setIsReplying, replies, handleReply, removeReply };
};
