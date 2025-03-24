import { InlineCommentEditorPresentational } from "@/components/inlineCommentEditor/presentational";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

type InlineCommentEditorContainerPropsType = {
  initialContent: string;
  onCancel: () => void;
  onSave: (newContent: string) => void;
};

export const InlineCommentEditorContainer = ({
  initialContent,
  onCancel,
  onSave,
}: InlineCommentEditorContainerPropsType) => {
  const [content, setContent] = useState<string>(initialContent);
  const placeholderText = `このコメントについて返信する\n※MarkDown記法が使えます。`;

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
    <InlineCommentEditorPresentational
      content={content}
      editor={editor}
      onCancel={onCancel}
      onSave={onSave}
    />
  );
};
