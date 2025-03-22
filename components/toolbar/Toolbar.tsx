import { Editor } from "@tiptap/react";

import {
  BetweenHorizontalStartIcon,
  BoldIcon,
  Code2Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  ImageIcon,
  Link2Icon,
  Link2OffIcon,
  List,
  ListOrderedIcon,
  QuoteIcon,
  Redo2Icon,
  StrikethroughIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { useCallback } from "react";

type ToolbarPropsType = {
  editor: Editor | null;
};

export const Toolbar = ({ editor }: ToolbarPropsType) => {
  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert("An error occurred");
      }
    }
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt("画像のURLを入力してください");

    if (!editor) return;

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border-b border-gray-300 flex items-center py-2 px-5 gap-4 overflow-auto">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${
          !editor.isActive("heading", { level: 2 }) ? "opacity-20" : ""
        } cursor-pointer`}
      >
        <Heading2Icon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${
          !editor.isActive("heading", { level: 3 }) ? "opacity-20" : ""
        } cursor-pointer`}
      >
        <Heading3Icon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`${
          !editor.isActive("heading", { level: 4 }) ? "opacity-20" : ""
        } cursor-pointer`}
      >
        <Heading4Icon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${
          !editor.isActive("bulletList") ? "opacity-20" : ""
        } cursor-pointer`}
      >
        <List />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${
          !editor.isActive("orderedList") ? "opacity-20" : ""
        } cursor-pointer`}
      >
        <ListOrderedIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${
          !editor.isActive("bold") ? "opacity-20" : ""
        } cursor-pointer`}
      >
        <BoldIcon />
      </button>
      <button
        type="button"
        onClick={setLink}
        className={`${
          editor.isActive("link") ? "is-active" : ""
        } cursor-pointer`}
      >
        <Link2Icon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
        className="cursor-pointer"
      >
        <Link2OffIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${
          editor.isActive("underline") ? "is-active" : ""
        } cursor-pointer`}
      >
        <UnderlineIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${
          !editor.isActive("strike") ? "opacity-20" : ""
        } cursor-pointer`}
      >
        <StrikethroughIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${
          !editor.isActive("codeBlock") ? "opacity-20" : ""
        } cursor-pointer`}
      >
        <Code2Icon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${
          !editor.isActive("blockquote") ? "opacity-20" : ""
        } cursor-pointer`}
      >
        <QuoteIcon />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="cursor-pointer"
      >
        <BetweenHorizontalStartIcon />
      </button>

      <button onClick={addImage} className="cursor-pointer">
        <ImageIcon />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="cursor-pointer"
      >
        <Undo2Icon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="cursor-pointer"
      >
        <Redo2Icon />
      </button>
    </div>
  );
};
