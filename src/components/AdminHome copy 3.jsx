import React, { useState } from "react";
import ReactQuill from "react-quill";
import { Quill } from "react-quill";
import AdvancedTableModule from '../../src/quill-advanced-table.js';
import ImageResize from 'quill-image-resize-module-react';
import "react-quill/dist/quill.snow.css";


// Register advanced table
Quill.register('modules/advancedTable', AdvancedTableModule);

// Register image resize module
Quill.register("modules/imageResize", ImageResize);

import "react-quill/dist/quill.snow.css";

import MwangazaLogo from "../assets/MwangazaLogo.jpg";
import userPic from "../assets/Sospeter.webp";

import { HiHome, HiUser } from "react-icons/hi2";
import { FaBookOpenReader } from "react-icons/fa6";
import AAviewLastCourse from "./AAviewLastCourse";

  {/** REACT QUILL MODULES */}
  export const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        [{ align: [] }],
        ["clean"],
        [{ color: [] }, { background: [] }],
        ['table'], // table button
      ],
      handlers: {
        image: function () {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.click();

          input.onchange = async () => {
            const file = input.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                const range = this.quill.getSelection();
                this.quill.insertEmbed(range.index, "image", reader.result);
              };
              reader.readAsDataURL(file);
            }
          };
        },
        table: function() {
          const range = this.quill.getSelection();
          if (range) {
            this.quill.getModule('advancedTable').insertTable(3, 3); // insert 3x3 table
          }
        },
      },
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
    advancedTable: {
      // table module options if needed
    },
    keyboard: {
      bindings: Quill.import('modules/better-table')?.keyboardBindings || {},
    },
  };

  const quillFormats = [
    "header",
    "bold", "italic", "underline", "strike",
    "list", "bullet",
    "align",
    "link", "image",'table',"table-row", "table-cell",
    "color",       // ← add this
  "background"  
  ];


export default function AdminHome() {
  const [active, setActive] = useState("courses");

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return <Dashboard />;
      case "users":
        return <UserManager />;
      case "courses":
      default:
        return <CourseManager quillModules={quillModules}/>;
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <TopNavBar />
      <SideBar active={active} setActive={setActive} />
      <div style={{ flexGrow: 1, width: "calc(100% - 200px)" }}>
        {renderContent()}
      </div>
    </div>
  );
}

/****************************************************
 SIDEBAR
****************************************************/

function SideBar({ active, setActive }) {
  const links = [
    { name: "Dashboard", key: "dashboard", icon: <HiHome /> },
    { name: "User Management", key: "users", icon: <HiUser /> },
    { name: "Courses Management", key: "courses", icon: <FaBookOpenReader /> },
  ];

  return (
    <div
      style={{
        backgroundColor: "#F4B342",
        width: "200px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "25px 0px 0px 15px",
      }}
    >
      {links.map((link) => (
        <div
          key={link.key}
          onClick={() => setActive(link.key)}
          style={{
            borderRadius: "30px 0px 0px 30px",
            padding: "5px",
            display: "flex",
            gap: "7px",
            alignItems: "center",
            cursor: "pointer",
            backgroundColor: active === link.key ? "white" : "transparent",
          }}
        >
          <span
            style={{
              padding: "7px 11px",
              borderRadius: "50%",
              backgroundColor: active === link.key ? "#F4B342" : "black",
              color: active === link.key ? "black" : "#F4B342",
            }}
          >
            {link.icon}
          </span>
          <span
            style={{
              color: active === link.key ? "#835912ff" : "#000000ff",
            }}
          >
            {link.name}
          </span>
        </div>
      ))}
    </div>
  );
}

/****************************************************
 TOP NAV BAR
****************************************************/

function TopNavBar() {
  return (
    <section>
      <div
        style={{
          width: "100vw",
          minHeight: "80px",
          backgroundColor: "#0C2B4E",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 15px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <img
            src={MwangazaLogo}
            width="60"
            height="60"
            style={{ borderRadius: "50%" }}
          />
          <span style={{ fontSize: "17px", fontWeight: 600 }}>
            MWANGAZA BUSINESS & INVESTMENT SCHOOL
          </span>
        </div>

        <div style={{ display: "flex", gap: "50px" }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <img
              src={userPic}
              width="60"
              height="60"
              style={{ borderRadius: "50%" }}
            />
            <div style={{ fontSize: "14px" }}>
              <span style={{ color: "rgba(200,200,200,0.8)", fontSize: "16px" }}>
                Hello{" "}
              </span>
              <span>Mayani</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/****************************************************
 COURSE MANAGER (MAIN)
****************************************************/

function CourseManager({quillModules}) {

  /* COURSE MAIN DATA */
  const [courseData, setCourseData] = useState({
    number: "",
    name: "",
    description: "",
    startDate: new Date().toISOString().split("T")[0],
    about: "",
    hint: "",
    picture: null,
    targetAudience: "",
    duration: "",
  });

  const updateCourseData = (field, value) => {
    setCourseData((prev) => ({ ...prev, [field]: value }));
  };

  /* MODULES */
  const [modules, setModules] = useState([]);

  const addModule = () =>
    setModules((prev) => [
      ...prev,
      {
        title: "",
        desc: "",
        cost: "",
        createdDate: new Date().toISOString().split("T")[0],
        blocks: [],
      },
    ]);

  const updateModule = (moduleIndex, field, value) =>
    setModules((prev) =>
      prev.map((m, i) =>
        i === moduleIndex ? { ...m, [field]: value } : m
      )
    );

  const removeModule = (moduleIndex) =>
    setModules((prev) => prev.filter((_, i) => i !== moduleIndex));

  /****************************************************
   FIXED: BLOCKS (IMMUTABLE, SAFE, NO DUPLICATION)
  ****************************************************/

  const addBlock = (moduleIndex, type) =>
    setModules((prev) =>
      prev.map((mod, idx) => {
        if (idx !== moduleIndex) return mod;

        return {
          ...mod,
          blocks: [
            ...mod.blocks,
            { type, content: "", file: null, fileType: "", layout: "row" }, // default layout
          ],
        };
      })
    );

  const updateTextBlock = (moduleIndex, blockIndex, content) =>
    setModules((prev) =>
      prev.map((mod, mIndex) => {
        if (mIndex !== moduleIndex) return mod;
        return {
          ...mod,
          blocks: mod.blocks.map((b, bIndex) =>
            bIndex === blockIndex ? { ...b, content } : b
          ),
        };
      })
    );

  const updateFileBlock = (moduleIndex, blockIndex, file) =>
    setModules((prev) =>
      prev.map((mod, mIndex) => {
        if (mIndex !== moduleIndex) return mod;

        return {
          ...mod,
          blocks: mod.blocks.map((b, bIndex) =>
            bIndex === blockIndex
              ? { ...b, file, fileType: file.type }
              : b
          ),
        };
      })
    );

  const removeBlock = (moduleIndex, blockIndex) =>
    setModules((prev) =>
      prev.map((mod, idx) => {
        if (idx !== moduleIndex) return mod;
        return {
          ...mod,
          blocks: mod.blocks.filter((_, i) => i !== blockIndex),
        };
      })
    );

  /****************************************************
   SUBMIT
  ****************************************************/

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append basic course info
      formData.append("number", courseData.number);
      formData.append("name", courseData.name);
      formData.append("description", courseData.description);
      formData.append("startDate", courseData.startDate);
      formData.append("about", courseData.about);
      formData.append("hint", courseData.hint);
      formData.append("targetAudience", courseData.targetAudience);
      formData.append("duration", courseData.duration);

      // Append course picture
      if (courseData.picture) {
        formData.append("picture", courseData.picture);
      }

      // Append modules as JSON
      formData.append("modules", JSON.stringify(modules));

      // Append block files separately
      modules.forEach((mod, mIndex) => {
        mod.blocks.forEach((block, bIndex) => {
          if (block.type === "file" && block.file) {
            formData.append(`modules_${mIndex}_blocks_${bIndex}_file`, block.file);
          }
        });
      });

      // Send to PHP backend
      const response = await fetch("http://localhost/mwangaza-backend/upload_course.php", {
        method: "POST",
        body: formData,
      });

const text = await response.text();
console.log("RAW RESPONSE FROM PHP:", text);
alert(text);
return;


    } catch (err) {
      console.error("Error uploading course:", err);
      alert("Failed to upload course. Check console.");
    }
  };


  /****************************************************/

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
      <h2>Upload New Course</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        {/* BASIC COURSE FIELDS */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          <div style={{ flex: "1 1 200px" }}>
            <label>Course Number</label>
            <input
              type="text"
              value={courseData.number}
              onChange={(e) => updateCourseData("number", e.target.value)}
              style={input}
            />
          </div>

          <div style={{ flex: "2 1 300px" }}>
            <label>Course Name</label>
            <input
              type="text"
              value={courseData.name}
              onChange={(e) => updateCourseData("name", e.target.value)}
              style={input}
            />
          </div>

          <div style={{ flex: "1 1 200px" }}>
            <label>Start Date</label>
            <input
              type="date"
              value={courseData.startDate}
              onChange={(e) => updateCourseData("startDate", e.target.value)}
              style={input}
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label>Course Description</label>
          <textarea
            rows={2}
            value={courseData.description}
            onChange={(e) => updateCourseData("description", e.target.value)}
            style={textarea}
          />
        </div>

        {/* ABOUT THIS COURSE */}
        <div>
          <label>About This Course</label>
          <textarea
            rows={2}
            value={courseData.about}
            onChange={(e) => updateCourseData("about", e.target.value)}
            style={textarea}
          />
        </div>

        {/* HINT */}
        <div>
          <label>Course Hint</label>
          <textarea
            rows={2}
            value={courseData.hint}
            onChange={(e) => updateCourseData("hint", e.target.value)}
            style={textarea}
          />
        </div>

        {/* TARGET AUDIENCE */}
        <div>
          <label>Who Should Take This Course?</label>
          <textarea
            rows={2}
            value={courseData.targetAudience}
            onChange={(e) =>
              updateCourseData("targetAudience", e.target.value)
            }
            style={textarea}
          />
        </div>

        {/* COURSE PICTURE */}
        <div>
          <label>Course Picture</label>
          <input
            type="file"
            onChange={(e) => updateCourseData("picture", e.target.files[0])}
            style={input}
          />
        </div>

        {/* COURSE DURATION */}
        <div>
          <label>Course Duration</label>
          <input
            type="text"
            value={courseData.duration}
            onChange={(e) => updateCourseData("duration", e.target.value)}
            style={input}
          />
        </div>

        {/* MODULES */}
        <div style={{ marginTop: "20px" }}>
          <h3>Course Modules</h3>

          {modules.map((module, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #aaa",
                padding: "15px",
                background: "#f7f7f7",
                borderRadius: "6px",
                marginBottom: "20px",
              }}
            >
              {/* TITLE ROW */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>Module {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeModule(index)}
                  style={btnDelete}
                >
                  Remove
                </button>
              </div>

              <label>Module Title</label>
              <input
                type="text"
                value={module.title}
                onChange={(e) =>
                  updateModule(index, "title", e.target.value)
                }
                style={input}
              />

              <label>Module Description</label>
              <textarea
                rows={2}
                value={module.desc}
                onChange={(e) =>
                  updateModule(index, "desc", e.target.value)
                }
                style={textarea}
              />

              <label>Module Cost</label>
              <input
                type="number"
                value={module.cost}
                onChange={(e) =>
                  updateModule(index, "cost", e.target.value)
                }
                style={input}
              />

              {/* CREATED DATE */}
              <label>Created Date</label>
              <input
                type="date"
                value={module.createdDate}
                onChange={(e) =>
                  updateModule(index, "createdDate", e.target.value)
                }
                style={input}
              />

              {/* BLOCKS */}
              {module.blocks.map((block, bIndex) => (
                <div
                  key={bIndex}
                  style={{
                    border: "1px dashed #ccc",
                    padding: "10px",
                    marginTop: "10px",
                  }}
                >
                  {/* LAYOUT SELECTOR */}
                  <label style={{ marginTop: "10px" }}>Layout:</label>
                  <select
                    value={block.layout}  // this is the property we added in step 1
                    onChange={(e) => {
                      const newLayout = e.target.value;
                      setModules((prev) =>
                        prev.map((mod, mIndex) => {
                          if (mIndex !== index) return mod; // leave other modules untouched
                          return {
                            ...mod,
                            blocks: mod.blocks.map((b, i) =>
                              i === bIndex ? { ...b, layout: newLayout } : b // update just this block
                            ),
                          };
                        })
                      );
                    }}
                    style={input} // reusing your input style
                  >
                    <option value="row">Row: Text & Image Side by Side</option>
                    <option value="column">Column: Vertical Stack</option>
                  </select>

                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong>Block {bIndex + 1}</strong>

                    <button
                      type="button"
                      onClick={() => removeBlock(index, bIndex)}
                      style={btnSmallDelete}
                    >
                      Remove
                    </button>
                  </div>

                  {/* TYPE SWITCH */}
                  <select
                    value={block.type}
                    onChange={(e) => {
                      const newType = e.target.value;

                      setModules((prev) =>
                        prev.map((mod, mIndex) => {
                          if (mIndex !== index) return mod;
                          return {
                            ...mod,
                            blocks: mod.blocks.map((b, i) =>
                              i === bIndex
                                ? {
                                    type: newType,
                                    content: "",
                                    file: null,
                                    fileType: "",
                                  }
                                : b
                            ),
                          };
                        })
                      );
                    }}
                    style={input}
                  >
                    <option value="text">Text Block</option>
                    <option value="file">File Block</option>
                  </select>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: block.layout === "row" ? "row" : "column",
                      gap: "15px",
                      alignItems: "center",
                      justifyContent: "center",
                      flexWrap: block.layout === "row" ? "wrap" : "nowrap",
                      marginTop: "10px",
                    }}
                  >
                    {/* TEXT BLOCK */}
                    {block.type === "text" && (
                      <ReactQuill
                        theme="snow"
                        value={block.content}
                        modules={quillModules}
                        formats={quillFormats} 
                        onChange={(val) => updateTextBlock(index, bIndex, val)}
                        style={{ flex: 1 }}
                      />
                    )}

                    {/* FILE BLOCK */}
                    {block.type === "file" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <input
                          type="file"
                          onChange={(e) =>
                            e.target.files[0] && updateFileBlock(index, bIndex, e.target.files[0])
                          }
                        />
                        
                        {/* Show selected file name if available */}
                        {block.file && (
                          <a
                            href={URL.createObjectURL(block.file)}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {block.file.name}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* ADD BLOCK BUTTONS */}
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => addBlock(index, "text")}
                  style={btnAdd}
                >
                  + Add Text Block
                </button>

                <button
                  type="button"
                  onClick={() => addBlock(index, "file")}
                  style={btnAdd}
                >
                  + Add File Block
                </button>
              </div>
            </div>
          ))}

          <button type="button" onClick={addModule} style={btnAddLarge}>
            + Add Module
          </button>
        </div>

        {/* SUBMIT */}
        <button type="submit" style={btnSubmit}>
          Submit Course
        </button>
      </form>
    </div>
  );
}

/****************************************************
 STYLES
****************************************************/

const input = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "100%",
};

const textarea = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "100%",
};

const btnAdd = {
  background: "#0d6efd",
  color: "white",
  padding: "5px 10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
const btnAddLarge = {
  background: "#0d6efd",
  color: "white",
  padding: "10px 15px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
const btnSubmit = {
  background: "#0c2b4eef",
  color: "white",
  padding: "12px 20px",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
};
const btnDelete = {
  background: "red",
  color: "white",
  padding: "5px 10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
const btnSmallDelete = {
  background: "transparent",
  color: "red",
  border: "none",
  cursor: "pointer",
};

/****************************************************
 OTHER SCREENS
****************************************************/

function Dashboard() {
  return <div style={{ height: "600px" }}>Dashboard</div>;
}

function UserManager() {
  return(
    <AAviewLastCourse/>
  )
}


// Tiny <MCE>// AdminHomeTinyMCE.jsx
// import React, { useState } from "react";
// import { Editor } from "@tinymce/tinymce-react";
// import MwangazaLogo from "../assets/MwangazaLogo.jpg";
// import userPic from "../assets/Sospeter.webp";
// import { HiHome, HiUser } from "react-icons/hi2";
// import { FaBookOpenReader } from "react-icons/fa6";
// import AAviewLastCourse from "./AAviewLastCourse";

// export default function AdminHome() {
//   const [active, setActive] = useState("courses");

//   const renderContent = () => {
//     switch (active) {
//       case "dashboard":
//         return <Dashboard />;
//       case "users":
//         return <UserManager />;
//       case "courses":
//       default:
//         return <CourseManager />;
//     }
//   };

//   return (
//     <div style={{ display: "flex", flexWrap: "wrap" }}>
//       <TopNavBar />
//       <SideBar active={active} setActive={setActive} />
//       <div style={{ flexGrow: 1, width: "calc(100% - 200px)" }}>
//         {renderContent()}
//       </div>
//     </div>
//   );
// }

// /****************************************************
//  SIDEBAR
// ****************************************************/
// function SideBar({ active, setActive }) {
//   const links = [
//     { name: "Dashboard", key: "dashboard", icon: <HiHome /> },
//     { name: "User Management", key: "users", icon: <HiUser /> },
//     { name: "Courses Management", key: "courses", icon: <FaBookOpenReader /> },
//   ];

//   return (
//     <div
//       style={{
//         backgroundColor: "#F4B342",
//         width: "200px",
//         display: "flex",
//         flexDirection: "column",
//         gap: "20px",
//         padding: "25px 0px 0px 15px",
//       }}
//     >
//       {links.map((link) => (
//         <div
//           key={link.key}
//           onClick={() => setActive(link.key)}
//           style={{
//             borderRadius: "30px 0px 0px 30px",
//             padding: "5px",
//             display: "flex",
//             gap: "7px",
//             alignItems: "center",
//             cursor: "pointer",
//             backgroundColor: active === link.key ? "white" : "transparent",
//           }}
//         >
//           <span
//             style={{
//               padding: "7px 11px",
//               borderRadius: "50%",
//               backgroundColor: active === link.key ? "#F4B342" : "black",
//               color: active === link.key ? "black" : "#F4B342",
//             }}
//           >
//             {link.icon}
//           </span>
//           <span
//             style={{
//               color: active === link.key ? "#835912ff" : "#000000ff",
//             }}
//           >
//             {link.name}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// }

// /****************************************************
//  TOP NAV BAR
// ****************************************************/
// function TopNavBar() {
//   return (
//     <section>
//       <div
//         style={{
//           width: "100vw",
//           minHeight: "80px",
//           backgroundColor: "#0C2B4E",
//           color: "white",
//           display: "flex",
//           justifyContent: "space-between",
//           padding: "10px 15px",
//           alignItems: "center",
//           flexWrap: "wrap",
//         }}
//       >
//         <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
//           <img
//             src={MwangazaLogo}
//             width="60"
//             height="60"
//             style={{ borderRadius: "50%" }}
//           />
//           <span style={{ fontSize: "17px", fontWeight: 600 }}>
//             MWANGAZA BUSINESS & INVESTMENT SCHOOL
//           </span>
//         </div>

//         <div style={{ display: "flex", gap: "50px" }}>
//           <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
//             <img
//               src={userPic}
//               width="60"
//               height="60"
//               style={{ borderRadius: "50%" }}
//             />
//             <div style={{ fontSize: "14px" }}>
//               <span style={{ color: "rgba(200,200,200,0.8)", fontSize: "16px" }}>
//                 Hello{" "}
//               </span>
//               <span>Mayani</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /****************************************************
//  COURSE MANAGER
// ****************************************************/
// function CourseManager() {
//   const [courseData, setCourseData] = useState({
//     number: "",
//     name: "",
//     description: "",
//     startDate: new Date().toISOString().split("T")[0],
//     about: "",
//     hint: "",
//     picture: null,
//     targetAudience: "",
//     duration: "",
//   });

//   const updateCourseData = (field, value) => {
//     setCourseData((prev) => ({ ...prev, [field]: value }));
//   };

//   const [modules, setModules] = useState([]);

//   const addModule = () =>
//     setModules((prev) => [
//       ...prev,
//       { title: "", desc: "", cost: "", createdDate: new Date().toISOString().split("T")[0], blocks: [] },
//     ]);

//   const updateModule = (moduleIndex, field, value) =>
//     setModules((prev) =>
//       prev.map((m, i) => (i === moduleIndex ? { ...m, [field]: value } : m))
//     );

//   const removeModule = (moduleIndex) =>
//     setModules((prev) => prev.filter((_, i) => i !== moduleIndex));

//   const addBlock = (moduleIndex, type) =>
//     setModules((prev) =>
//       prev.map((mod, idx) => {
//         if (idx !== moduleIndex) return mod;
//         return {
//           ...mod,
//           blocks: [...mod.blocks, { type, content: "", file: null, fileType: "", layout: "row" }],
//         };
//       })
//     );

//   const updateTextBlock = (moduleIndex, blockIndex, content) =>
//     setModules((prev) =>
//       prev.map((mod, mIndex) =>
//         mIndex === moduleIndex
//           ? { ...mod, blocks: mod.blocks.map((b, bIndex) => (bIndex === blockIndex ? { ...b, content } : b)) }
//           : mod
//       )
//     );

//   const updateFileBlock = (moduleIndex, blockIndex, file) =>
//     setModules((prev) =>
//       prev.map((mod, mIndex) =>
//         mIndex === moduleIndex
//           ? { ...mod, blocks: mod.blocks.map((b, bIndex) => (bIndex === blockIndex ? { ...b, file, fileType: file.type } : b)) }
//           : mod
//       )
//     );

//   const removeBlock = (moduleIndex, blockIndex) =>
//     setModules((prev) =>
//       prev.map((mod, idx) =>
//         idx === moduleIndex ? { ...mod, blocks: mod.blocks.filter((_, i) => i !== blockIndex) } : mod
//       )
//     );

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       Object.entries(courseData).forEach(([key, value]) => {
//         if (value) formData.append(key, value);
//       });

//       modules.forEach((mod, mIndex) => {
//         formData.append(`modules_${mIndex}`, JSON.stringify(mod));
//         mod.blocks.forEach((block, bIndex) => {
//           if (block.type === "file" && block.file) {
//             formData.append(`modules_${mIndex}_blocks_${bIndex}_file`, block.file);
//           }
//         });
//       });

//       const response = await fetch("http://localhost/mwangaza-backend/upload_course.php", {
//         method: "POST",
//         body: formData,
//       });

//       const text = await response.text();
//       console.log("RAW RESPONSE:", text);
//       alert(text);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to submit course.");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Upload New Course</h2>
//       <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
//         {/* Basic fields */}
//         <input placeholder="Course Number" value={courseData.number} onChange={(e) => updateCourseData("number", e.target.value)} style={input} />
//         <input placeholder="Course Name" value={courseData.name} onChange={(e) => updateCourseData("name", e.target.value)} style={input} />
//         <input type="date" value={courseData.startDate} onChange={(e) => updateCourseData("startDate", e.target.value)} style={input} />
//         <textarea placeholder="Description" value={courseData.description} onChange={(e) => updateCourseData("description", e.target.value)} style={textarea} />
//         <textarea placeholder="About" value={courseData.about} onChange={(e) => updateCourseData("about", e.target.value)} style={textarea} />
//         <textarea placeholder="Hint" value={courseData.hint} onChange={(e) => updateCourseData("hint", e.target.value)} style={textarea} />
//         <input type="file" onChange={(e) => updateCourseData("picture", e.target.files[0])} />
//         <input placeholder="Duration" value={courseData.duration} onChange={(e) => updateCourseData("duration", e.target.value)} style={input} />

//         {/* Modules */}
//         {modules.map((module, mIndex) => (
//           <div key={mIndex} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "6px" }}>
//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <h4>Module {mIndex + 1}</h4>
//               <button type="button" onClick={() => removeModule(mIndex)} style={btnDelete}>Remove Module</button>
//             </div>
//             <input placeholder="Module Title" value={module.title} onChange={(e) => updateModule(mIndex, "title", e.target.value)} style={input} />
//             <textarea placeholder="Module Description" value={module.desc} onChange={(e) => updateModule(mIndex, "desc", e.target.value)} style={textarea} />
//             <input placeholder="Cost" type="number" value={module.cost} onChange={(e) => updateModule(mIndex, "cost", e.target.value)} style={input} />
//             <input type="date" value={module.createdDate} onChange={(e) => updateModule(mIndex, "createdDate", e.target.value)} style={input} />

//             {/* Blocks */}
//             {module.blocks.map((block, bIndex) => (
//               <div key={bIndex} style={{ border: "1px dashed #aaa", marginTop: "10px", padding: "10px" }}>
//                 <div style={{ display: "flex", justifyContent: "space-between" }}>
//                   <strong>Block {bIndex + 1}</strong>
//                   <button type="button" onClick={() => removeBlock(mIndex, bIndex)} style={btnSmallDelete}>Remove Block</button>
//                 </div>
//                 <select value={block.type} onChange={(e) => {
//                   const type = e.target.value;
//                   setModules((prev) =>
//                     prev.map((mod, i) => i === mIndex ? {
//                       ...mod,
//                       blocks: mod.blocks.map((b, j) => j === bIndex ? { type, content: "", file: null, fileType: "" } : b)
//                     } : mod)
//                   );
//                 }} style={input}>
//                   <option value="text">Text Block</option>
//                   <option value="file">File Block</option>
//                 </select>

//                 {block.type === "text" && (
//                   <Editor
//                     apiKey="YOUR_TINYMCE_API_KEY"
//                     value={block.content}
//                     init={{
//                       height: 300,
//                       menubar: true,
//                       plugins: [
//                         "advlist autolink lists link image charmap print preview anchor",
//                         "searchreplace visualblocks code fullscreen",
//                         "insertdatetime media table paste code help wordcount"
//                       ],
//                       toolbar: "undo redo | formatselect | bold italic underline strikethrough | \
//                                 alignleft aligncenter alignright alignjustify | \
//                                 bullist numlist outdent indent | \
//                                 forecolor backcolor | \
//                                 link image | table | fontsizeselect | removeformat",
//                     }}
//                     onEditorChange={(content) => updateTextBlock(mIndex, bIndex, content)}
//                   />
//                 )}

//                 {block.type === "file" && (
//                   <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//                     <input type="file" onChange={(e) => e.target.files[0] && updateFileBlock(mIndex, bIndex, e.target.files[0])} />
//                     {block.file && <span>Selected File: {block.file.name}</span>}
//                   </div>
//                 )}
//               </div>
//             ))}

//             <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
//               <button type="button" onClick={() => addBlock(mIndex, "text")} style={btnAdd}>Add Text Block</button>
//               <button type="button" onClick={() => addBlock(mIndex, "file")} style={btnAdd}>Add File Block</button>
//             </div>
//           </div>
//         ))}

//         <button type="button" onClick={addModule} style={btnAdd}>Add Module</button>
//         <button type="submit" style={btnSubmit}>Submit Course</button>
//       </form>

//       <AAviewLastCourse />
//     </div>
//   );
// }

// /****************************************************
//  OTHER SCREENS
// ****************************************************/
// function Dashboard() {
//   return <div style={{ height: "600px" }}>Dashboard</div>;
// }

// function UserManager() {
//   return <AAviewLastCourse />;
// }

// /****************************************************
//  STYLES
// ****************************************************/
// const input = { width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginTop: "4px" };
// const textarea = { width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginTop: "4px" };
// const btnAdd = { padding: "8px 15px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" };
// const btnDelete = { padding: "5px 10px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" };
// const btnSmallDelete = { padding: "3px 7px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px" };
// const btnSubmit = { padding: "12px 20px", backgroundColor: "#0C2B4E", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px", marginTop: "20px" };
// </MCE>