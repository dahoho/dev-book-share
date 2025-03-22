"use client";

import { EditorOperationPresentational } from "@/components/editorOperation/presentational";
import { postPatchSchemaType, postPatchSchema } from "@/lib/validations/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type PostWithAuthor = Post & {
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

type EditorOperationContainerType = {
  post: PostWithAuthor | null;
  postId: string;
};

export const EditorOperationContainer = ({
  post,
  postId,
}: EditorOperationContainerType) => {
  const router = useRouter();
  const [operation, setOperation] = useState<"publish" | "draft" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<postPatchSchemaType>({
    resolver: zodResolver(postPatchSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });
  console.log("errors", errors);

  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("content", post.content ?? "");
      setValue("tags", post.tags);
    }
  }, [post, setValue]);

  const onSubmit = async (data: postPatchSchemaType) => {
    if (post) {
      setIsSubmitting(true);
      const response = await fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          content: data.content,
          published: operation === "publish",
          tags: data.tags,
        }),
      });
      setIsSubmitting(false);
      if (!response.ok) {
        return toast.error("問題が発生しました", {
          description: "記事が保存されませんでした。もう一度お試しください。",
        });
      }
      router.refresh();
      toast.success("success", {
        description: "正常に記事が保存されました",
      });
    } else {
      setIsSubmitting(true);

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          published: operation === "publish",
        }),
      });

      setIsSubmitting(false);
      if (!response.ok) {
        toast.error("問題が発生しました", {
          description: "記事が作成されませんでした。もう一度お試しください。",
        });
        return;
      }

      router.refresh();
      router.push(`/`);
    }
  };

  return (
    <EditorOperationPresentational
      setOperation={setOperation}
      isSubmitting={isSubmitting}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      setValue={setValue}
      operation={operation}
      post={post}
    />
  );
};
