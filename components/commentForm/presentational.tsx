"use client";

import { Editor } from "@/components/editor/Editor";
import { Button } from "@/components/ui/button";
import { commentPostSchemaType } from "@/lib/validations/comments";
import { Loader2 } from "lucide-react";
import { UseFormHandleSubmit, UseFormSetValue } from "react-hook-form";

type CommentFormType = {
  isSubmitting: boolean;
  handleSubmit: UseFormHandleSubmit<commentPostSchemaType, undefined>;
  setValue: UseFormSetValue<commentPostSchemaType>;
  onSubmit: (
    data: commentPostSchemaType
  ) => Promise<string | number | undefined>;
};

export const CommentFormPresentational = ({
  isSubmitting,
  handleSubmit,
  setValue,
  onSubmit,
}: CommentFormType) => {
  const placeholderText = `コメントする\n※MarkDown記法が使えます。`;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Editor setValue={setValue} placeholder={placeholderText} />
        <div className="flex items-center justify-end gap-4">
          <Button type="submit" className="px-6 cursor-pointer mt-4">
            {isSubmitting && <Loader2 className="animate-spin" />}
            投稿する
          </Button>
        </div>
      </form>
    </>
  );
};
