import React, { useState } from "react";

export function TipTapToolbar({ editor }) {
  const [fontSize, setFontSize] = useState("16");
  const [textColor, setTextColor] = useState("#000000");

  if (!editor) return null;

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>

      {/* TEXT */}
      <button onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()}>U</button>

      {/* COLOR */}
      <input
        type="color"
        value={textColor}
        onChange={e => {
          setTextColor(e.target.value);
          editor.chain().focus().setColor(e.target.value).run();
        }}
      />

      {/* FONT SIZE */}
      <input
        type="number"
        value={fontSize}
        onChange={e => {
          setFontSize(e.target.value);
          editor.chain().focus().setFontSize(e.target.value + "px").run();
        }}
        style={{ width: 60 }}
      />

      {/* LIST TOGGLES */}
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
        • List
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        1. List
      </button>

      {/* ORDERED LIST STYLE */}
      <select
        onChange={e =>
          editor
            .chain()
            .focus()
            .updateAttributes("orderedList", {
              listStyleType: e.target.value,
            })
            .run()
        }
      >
        <option value="decimal">1,2,3</option>
        <option value="upper-alpha">A,B,C</option>
        <option value="lower-alpha">a,b,c</option>
        <option value="upper-roman">I,II,III</option>
        <option value="lower-roman">i,ii,iii</option>
      </select>

      {/* BULLET STYLE */}
      <select
        onChange={e =>
          editor
            .chain()
            .focus()
            .updateAttributes("bulletList", {
              listStyleType: e.target.value,
            })
            .run()
        }
      >
        <option value="disc">● Disc</option>
        <option value="circle">○ Circle</option>
        <option value="square">■ Square</option>
      </select>
    </div>
  );
}
