"use client";

import { CommentFormPresentational } from "@/components/commentForm/presentational";
import {
  commentPostSchemaType,
  commentPostSchema,
} from "@/lib/validations/comments";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type CommentFormContainerType = {
  postId: string;
};

export const CommentFormContainer = ({ postId }: CommentFormContainerType) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<commentPostSchemaType>({
    resolver: zodResolver(commentPostSchema),
  });
  console.log("errors", errors);

  const onSubmit = async (data: commentPostSchemaType) => {
    setIsSubmitting(true);

    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, content: data.content }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      return toast.error("問題が発生しました", {
        description: "コメントが投稿されませんでした。もう一度お試しください。",
      });
    }

    router.refresh();

    toast.success("success", {
      description: "コメントが正常に投稿されました",
    });
  };

  return (
    <CommentFormPresentational
      isSubmitting={isSubmitting}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      setValue={setValue}
    />
  );
};
