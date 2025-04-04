import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import React from "react";

type CodeBlockComponentPropsType = NodeViewProps & {
  extension: {
    options: {
      lowlight: {
        listLanguages: () => string[];
      };
    };
  };
};

export const CodeBlockComponent = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}: CodeBlockComponentPropsType) => {
  return (
    <NodeViewWrapper className="code-block">
      <select
        className="bg-white!"
        contentEditable={false}
        defaultValue={defaultLanguage}
        onChange={(event) => updateAttributes({ language: event.target.value })}
      >
        <option value="null">auto</option>
        <option disabled>—</option>
        {extension.options.lowlight
          .listLanguages()
          .map((lang: string, index: number) => (
            <option key={index} value={lang}>
              {lang}
            </option>
          ))}
      </select>
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};
