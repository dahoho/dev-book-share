import { Button } from "@/components/ui/button";
import { Editor, EditorContent } from "@tiptap/react";
import { Toolbar } from "@/components/toolbar";

type InlineCommentEditorPresentationalPropsType = {
  onSave: (newContent: string) => void;
  onCancel: () => void;
  editor: Editor | null;
  content: string;
};

export const InlineCommentEditorPresentational = ({
  editor,
  content,
  onSave,
  onCancel,
}: InlineCommentEditorPresentationalPropsType) => {
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
