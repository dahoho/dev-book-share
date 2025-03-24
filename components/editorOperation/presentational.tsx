"use client";

import { Editor } from "@/components/editor/Editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORY_MENU_ITEMS } from "@/constans";
import { postPatchSchemaType } from "@/lib/validations/post";
import { Post } from "@prisma/client";
import { Loader2 } from "lucide-react";
import {
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormSetValue,
} from "react-hook-form";

type PostWithAuthor = Post & {
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

type EditorOperationType = {
  setOperation: (operation: "publish" | "draft") => void;
  isSubmitting: boolean;
  register: UseFormRegister<postPatchSchemaType>;
  handleSubmit: UseFormHandleSubmit<postPatchSchemaType, undefined>;
  setValue: UseFormSetValue<postPatchSchemaType>;
  onSubmit: (data: postPatchSchemaType) => Promise<string | number | undefined>;
  operation: "publish" | "draft" | null;
  post?: PostWithAuthor | null;
};

export const EditorOperationPresentational = ({
  setOperation,
  isSubmitting,
  register,
  handleSubmit,
  setValue,
  onSubmit,
  operation,
  post,
}: EditorOperationType) => {
  const placeholderText = `学び、よく分からなかったこと、気づきなどを共有しましょう\n※MarkDown記法が使えます。`;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        className="bg-transparent font-bold py-2 px-4 !text-2xl h-14 border border-gray-300"
        placeholder="タイトルを入力してください"
        {...register("title")}
      />
      <div className="flex flex-wrap md:gap-4 gap-2 mt-8">
        {CATEGORY_MENU_ITEMS.map((tag) => {
          if (tag.name === "すべて") return null;
          return (
            <label
              key={tag.name}
              className="flex items-center gap-1 cursor-pointer text-lg"
            >
              <input
                className="cursor-pointer w-5 h-5 bg-transparent border border-gray-300"
                type="checkbox"
                value={tag.name}
                {...register("tags")}
              />
              <span>{tag.name}</span>
            </label>
          );
        })}
      </div>
      <div className="mt-8">
        <Editor setValue={setValue} placeholder={placeholderText} />
      </div>

      <div className="flex items-center gap-6 mt-6">
        {!post ? (
          <Button
            type="submit"
            className="px-6 cursor-pointer"
            onClick={() => setOperation("publish")}
          >
            {isSubmitting && operation === "publish" && (
              <Loader2 className="animate-spin" />
            )}
            公開
          </Button>
        ) : (
          <Button
            type="submit"
            className="px-6 cursor-pointer"
            onClick={() => setOperation("publish")}
          >
            {isSubmitting && operation === "publish" && (
              <Loader2 className="animate-spin" />
            )}
            更新する
          </Button>
        )}
        <Button
          type="submit"
          onClick={() => setOperation("draft")}
          className="px-6 cursor-pointer"
        >
          {isSubmitting && operation === "draft" && (
            <Loader2 className="animate-spin" />
          )}
          {post ? "非公開にする" : "下書き保存"}
        </Button>
      </div>
    </form>
  );
};
