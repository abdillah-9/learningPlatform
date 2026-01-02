// import React, { useState } from "react";
// import { HexColorPicker } from "react-colorful";

// export function TipTapToolbar({ editor }) {
//   const [rows, setRows] = useState(2);
//   const [cols, setCols] = useState(2);
//   const [fontSize, setFontSize] = useState("16");
//   const [textColor, setTextColor] = useState("#000000");
//   const [linkUrl, setLinkUrl] = useState("");
//   const [cellColor, setCellColor] = useState("#ffffff");

//   if (!editor) return null;

//   return (
//     <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>

//       {/* TEXT FORMAT */}
//       <button type="button" type='button' onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
//       <button type="button" type='button' onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
//       <button type="button" type='button' onClick={() => editor.chain().focus().toggleUnderline().run()}>U</button>

//       {/* ALIGNMENT */}
//       <button type="button" type='button' onClick={() => editor.chain().focus().setTextAlign("left").run()}>L</button>
//       <button type="button" type='button' onClick={() => editor.chain().focus().setTextAlign("center").run()}>C</button>
//       <button type="button" type='button' onClick={() => editor.chain().focus().setTextAlign("right").run()}>R</button>
//       <button type="button" type='button' onClick={() => editor.chain().focus().setTextAlign("justify").run()}>J</button>

//       {/* COLOR */}
//       <input
//         type="color"
//         value={textColor}
//         onChange={e => {
//           setTextColor(e.target.value);
//           editor.chain().focus().setColor(e.target.value).run();
//         }}
//       />

//       {/* FONT SIZE */}
//       <input
//         type="number"
//         value={fontSize}
//         style={{ width: 60 }}
//         onChange={e => {
//           const size = e.target.value;
//           setFontSize(size);
//           editor.chain().focus().setFontSize(size + "px").run();
//         }}
//       />

//       <button type="button" type='button' onClick={() => editor.chain().focus().unsetFontSize().run()}>
//         Clear Size
//       </button>

//       {/* IMAGE */}
//       <button type="button" type='button'
//         onClick={() => {
//           const url = prompt("Image URL");
//           if (url) editor.chain().focus().setImage({ src: url }).run();
//         }}
//       >
//         Image
//       </button>

//       {/* LINKS */}
//       <input
//         placeholder="URL"
//         value={linkUrl}
//         onChange={e => setLinkUrl(e.target.value)}
//       />
//       <button type="button" type='button' onClick={() => editor.chain().focus().setLink({ href: linkUrl }).run()}>
//         Set Link
//       </button>
//       <button type="button" type='button' onClick={() => editor.chain().focus().unsetLink().run()}>
//         Remove Link
//       </button>

//       {/* LISTS */}
//       <button type="button"
//         type="button"
//         onClick={() => editor.chain().focus().toggleBulletList().run()}
//         style={{
//           fontWeight: editor.isActive("bulletList") ? "bold" : "normal",
//           color: editor.isActive("bulletList") ? "#0d6efd" : "#000",
//         }}
//       >
//         • List
//       </button>

//       <button type="button"
//         type="button"
//         onClick={() => editor.chain().focus().toggleOrderedList().run()}
//         style={{
//           fontWeight: editor.isActive("orderedList") ? "bold" : "normal",
//           color: editor.isActive("orderedList") ? "#0d6efd" : "#000",
//         }}
//       >
//         1. List
//       </button>
//       <select
//         onChange={(e) =>
//           editor
//             .chain()
//             .focus()
//             .updateAttributes("orderedList", {
//               style: `list-style-type: ${e.target.value}`,
//             })
//             .run()
//         }
//       >
//         <option value="decimal">1, 2, 3</option>
//         <option value="upper-alpha">A, B, C</option>
//         <option value="lower-alpha">a, b, c</option>
//         <option value="upper-roman">I, II, III</option>
//         <option value="lower-roman">i, ii, iii</option>
//       </select>
//       <select
//         onChange={(e) =>
//           editor
//             .chain()
//             .focus()
//             .updateAttributes("bulletList", {
//               style: `list-style-type: ${e.target.value}`,
//             })
//             .run()
//         }
//       >
//         <option value="disc">● Disc</option>
//         <option value="circle">○ Circle</option>
//         <option value="square">■ Square</option>
//       </select>



//       {/* TABLES */}
//       <input type="number" value={rows} onChange={e => setRows(+e.target.value)} />
//       <input type="number" value={cols} onChange={e => setCols(+e.target.value)} />
//       <button type="button" type='button' onClick={() => editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run()}>
//         Insert Table
//       </button>

//       <button type="button" type='button' onClick={() => editor.chain().focus().addRowAfter().run()}>+ Row</button>
//       <button type="button" type='button' onClick={() => editor.chain().focus().addColumnAfter().run()}>+ Col</button>
//       <button type="button" type='button' onClick={() => editor.chain().focus().deleteRow().run()}>- Row</button>
//       <button type="button" type='button' onClick={() => editor.chain().focus().deleteColumn().run()}>- Col</button>
//       <button type="button" type='button' onClick={() => editor.chain().focus().deleteTable().run()}>Delete Table</button>

//       {/* CELL BACKGROUND */}
//       {/* <HexColorPicker color={cellColor} onChange={setCellColor} />
//       <button type="button" type='button'
//         onClick={() =>
//           editor.chain().focus().updateAttributes("tableCell", {
//             background: cellColor,
//           }).run()
//         }
//       >
//         Cell Color
//       </button> */}
//     </div>
//   );
// }






import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";

export function TipTapToolbar({ editor }) {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [fontSize, setFontSize] = useState("16");
  const [textColor, setTextColor] = useState("#000000");
  const [linkUrl, setLinkUrl] = useState("");
  const [cellColor, setCellColor] = useState("#ffffff");

  if (!editor) return null;

  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>

      {/* TEXT FORMAT */}
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()}>U</button>

      {/* ALIGNMENT */}
      <button type="button" onClick={() => editor.chain().focus().setTextAlign("left").run()}>L</button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign("center").run()}>C</button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign("right").run()}>R</button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign("justify").run()}>J</button>

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
        style={{ width: 60 }}
        onChange={e => {
          const size = e.target.value;
          setFontSize(size);
          editor.chain().focus().setFontSize(size + "px").run();
        }}
      />
      <button type="button" onClick={() => editor.chain().focus().unsetFontSize().run()}>Clear Size</button>

      {/* IMAGE */}
      <button type="button" onClick={() => {
        const url = prompt("Image URL");
        if (url) editor.chain().focus().setImage({ src: url }).run();
      }}>Image</button>

      {/* LINKS */}
      <input
        placeholder="URL"
        value={linkUrl}
        onChange={e => setLinkUrl(e.target.value)}
      />
      <button type="button" onClick={() => editor.chain().focus().setLink({ href: linkUrl }).run()}>Set Link</button>
      <button type="button" onClick={() => editor.chain().focus().unsetLink().run()}>Remove Link</button>

      {/* LISTS */}
      <button type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        style={{
          fontWeight: editor.isActive("bulletList") ? "bold" : "normal",
          color: editor.isActive("bulletList") ? "#0d6efd" : "#000",
        }}
      >
        • List
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        style={{
          fontWeight: editor.isActive("orderedList") ? "bold" : "normal",
          color: editor.isActive("orderedList") ? "#0d6efd" : "#000",
        }}
      >
        1. List
      </button>
      <select
        onChange={e =>
          editor.chain().focus().updateAttributes("orderedList", {
            listStyleType: e.target.value,
          }).run()
        }
      >
        <option value="decimal">1, 2, 3</option>
        <option value="upper-alpha">A, B, C</option>
        <option value="lower-alpha">a, b, c</option>
        <option value="upper-roman">I, II, III</option>
        <option value="lower-roman">i, ii, iii</option>
      </select>
      <select
        onChange={e =>
          editor.chain().focus().updateAttributes("bulletList", {
            listStyleType: e.target.value,
          }).run()
        }
      >
        <option value="disc">● Disc</option>
        <option value="circle">○ Circle</option>
        <option value="square">■ Square</option>
      </select>

      {/* TABLES */}
      <input type="number" value={rows} onChange={e => setRows(+e.target.value)} />
      <input type="number" value={cols} onChange={e => setCols(+e.target.value)} />
      <button type="button" onClick={() => editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run()}>
        Insert Table
      </button>
      <button type="button" onClick={() => editor.chain().focus().addRowAfter().run()}>+ Row</button>
      <button type="button" onClick={() => editor.chain().focus().addColumnAfter().run()}>+ Col</button>
      <button type="button" onClick={() => editor.chain().focus().deleteRow().run()}>- Row</button>
      <button type="button" onClick={() => editor.chain().focus().deleteColumn().run()}>- Col</button>
      <button type="button" onClick={() => editor.chain().focus().deleteTable().run()}>Delete Table</button>

      {/* CELL BACKGROUND (optional) */}
      {/* <HexColorPicker color={cellColor} onChange={setCellColor} />
      <button type="button" onClick={() => editor.chain().focus().updateAttributes("tableCell", { background: cellColor }).run()}>
        Cell Color
      </button> */}

      {/* SPACER */}
<input
  type="number"
  min={1}
  value={rows}
  style={{ width: 50 }}
  onChange={e => setRows(+e.target.value)}
/>
<button
  type="button"
  onClick={() => {
    const lines = rows || 1;
    // Insert paragraphs with margin-bottom
    const content = Array.from({ length: lines }, () =>
      `<div style="margin-bottom: 10px; text-align: left; margin-left: 0;">&nbsp;</div>`
    ).join('');
    editor.chain().focus().insertContent(content).run();

  }}
>
  Add Spacer
</button>

    </div>
  );
}
