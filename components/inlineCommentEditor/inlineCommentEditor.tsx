import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Toolbar } from "@/components/toolbar";

export const InlineCommentEditor = ({
  initialContent,
  onSave,
  onCancel,
}: {
  initialContent: string;
  onSave: (newContent: string) => void;
  onCancel: () => void;
}) => {
  const placeholderText = `このコメントについて返信する

※MarkDown記法が使えます。`;

  const [content, setContent] = useState<string>(initialContent);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholderText,
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
    },
  });

  return (
    <div className="mt-4">
      <div className="relative border border-gray-300 rounded-lg">
        <Toolbar editor={editor} />
        <EditorContent editor={editor} className="p-5" />
      </div>
      <div className="mt-2 flex gap-2">
        <Button onClick={() => onSave(content)} className="cursor-pointer">
          保存
        </Button>
        <Button variant="outline" onClick={onCancel} className="cursor-pointer">
          キャンセル
        </Button>
      </div>
    </div>
  );
};
