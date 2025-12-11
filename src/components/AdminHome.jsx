/****************************************************
 FULL ADMIN HOME — FIXED VERSION
****************************************************/

import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import MwangazaLogo from "../assets/MwangazaLogo.jpg";
import userPic from "../assets/Sospeter.webp";

import { HiHome, HiUser } from "react-icons/hi2";
import { FaBookOpenReader } from "react-icons/fa6";

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
        return <CourseManager />;
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

function CourseManager() {
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
            { type, content: "", file: null, fileType: "" },
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FINAL DATA SENT →", { courseData, modules });
    alert("Course uploaded! Check console for data.");
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

                  {/* TEXT BLOCK */}
                  {block.type === "text" && (
                    <ReactQuill
                      theme="snow"
                      value={block.content}
                      onChange={(val) =>
                        updateTextBlock(index, bIndex, val)
                      }
                      style={{ marginTop: "10px" }}
                    />
                  )}

                  {/* FILE BLOCK */}
                  {block.type === "file" && (
                    <input
                      type="file"
                      onChange={(e) =>
                        updateFileBlock(index, bIndex, e.target.files[0])
                      }
                      style={{ marginTop: "10px" }}
                    />
                  )}
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
  return <div style={{ height: "600px" }}>Form to manage user account</div>;
}
