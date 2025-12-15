import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Underline } from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import { TextAlign } from "@tiptap/extension-text-align";
import { Link } from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontSize } from "@tiptap/extension-text-style/font-size";

import Image from "@tiptap/extension-image";

import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";

import { TipTapToolbar } from "./TipTapToolbar";

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      background: {
        default: null,
        parseHTML: element => element.style.backgroundColor || null,
        renderHTML: attributes =>
          attributes.background
            ? { style: `background-color: ${attributes.background}` }
            : {},
      },
    };
  },
});

export default function TipTapEditor({ value, onChange }) {
  const editor = useEditor({
    content: value,
    extensions: [
      TextStyle,   // REQUIRED
      FontSize,    // ✅ OFFICIAL FONT SIZE SUPPORT
      StarterKit,
      Underline,
      Color,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({ allowBase64: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      CustomTableCell,
    ],
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="tiptap-editor">
      <TipTapToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
