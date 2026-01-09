import { useContext, useEffect, useState } from "react";
import TipTapEditor from "../../components/editor/TipTapEditor";
import { AuthContext } from "../../AuthProvider";

// --- SAFE HTML ENCODING (bypass hosting WAF) ---
const encodeHTML = (html) => {
  try {
    return btoa(unescape(encodeURIComponent(html)));
  } catch {
    return html;
  }
};

const decodeHTML = (encoded) => {
  try {
    return decodeURIComponent(escape(atob(encoded)));
  } catch {
    return encoded; // fallback for old DB rows
  }
};

export default function CourseManager({ formState, setFormState, editModeState, courseData: initialCourseData , fetchCourses, page, setPage}) {

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

  // Prefill the form if in edit mode
  useEffect(() => {

    const normalizeHTML = (html) => {
  if (!html) return "";
  // wrap inline content in <p> if it doesn't start with a block
  return html.trim().startsWith("<p") || html.trim().startsWith("<div")
    ? html
    : `<p>${html}</p>`;
};

    if (editModeState && initialCourseData) {
      console.log(initialCourseData);
      setCourseData({
        number: initialCourseData.number || "",
        name: initialCourseData.name || "",
        // description: initialCourseData.description || "",
        startDate: initialCourseData.startDate || new Date().toISOString().split("T")[0],
        // about: initialCourseData.about || "",
        // hint: initialCourseData.hint || "",
        picture: null, // we can't prefill file inputs
        // targetAudience: initialCourseData.targetAudience || "",
        duration: initialCourseData.duration || "",
description: initialCourseData.description
  ? normalizeHTML(decodeHTML(initialCourseData.description))
  : "",

about: initialCourseData.about
  ? normalizeHTML(decodeHTML(initialCourseData.about))
  : "",

hint: initialCourseData.hint
  ? normalizeHTML(decodeHTML(initialCourseData.hint))
  : "",

targetAudience: initialCourseData.targetAudience
  ? normalizeHTML(decodeHTML(initialCourseData.targetAudience))
  : "",

      });

      setModules(
        initialCourseData.modules?.map((mod) => ({
          title: mod.title || "",
          desc: mod.desc ? decodeHTML(mod.desc) : "",
          cost: mod.cost || "",
          createdDate: mod.createdDate || new Date().toISOString().split("T")[0],
          blocks: mod.blocks?.map((block) => ({
            type: block.type || "text",
            content: block.content ? decodeHTML(block.content) : "",
            file: null, // can't prefill File objects
            fileType: block.fileType || "",
            layout: block.layout || "row",
          })) || [],
        })) || []
      );
    }
  }, [editModeState, initialCourseData]);

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
      prev?.map((m, i) =>
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
      prev?.map((mod, idx) => {
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
      prev?.map((mod, mIndex) => {
        if (mIndex !== moduleIndex) return mod;
        return {
          ...mod,
          blocks: mod.blocks?.map((b, bIndex) =>
            bIndex === blockIndex ? { ...b, content } : b
          ),
        };
      })
    );

  const updateFileBlock = (moduleIndex, blockIndex, file) =>
    setModules((prev) =>
      prev?.map((mod, mIndex) => {
        if (mIndex !== moduleIndex) return mod;

        return {
          ...mod,
          blocks: mod.blocks?.map((b, bIndex) =>
            bIndex === blockIndex
              ? { ...b, file, fileType: file.type }
              : b
          ),
        };
      })
    );

  const removeBlock = (moduleIndex, blockIndex) =>
    setModules((prev) =>
      prev?.map((mod, idx) => {
        if (idx !== moduleIndex) return mod;
        return {
          ...mod,
          blocks: mod.blocks.filter((_, i) => i !== blockIndex),
        };
      })
    );

  /****************************************************
   SUBMIT HANDLER
  ****************************************************/

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!courseData.startDate) {
    alert("Start date is required");
    return;
  }

  try {
    const formData = new FormData();

    // 🔥 IMPORTANT: tell backend this is an edit
    if (editModeState && initialCourseData?.id) {
      formData.append("courseId", initialCourseData.id);
    }

    // Append basic course info
    formData.append("number", courseData.number);
    formData.append("name", courseData.name);
    formData.append("startDate", courseData.startDate);
    formData.append("description", encodeHTML(courseData.description));
    formData.append("about", encodeHTML(courseData.about));
    formData.append("hint", encodeHTML(courseData.hint));
    formData.append("targetAudience", encodeHTML(courseData.targetAudience));

    formData.append("duration", courseData.duration);

    if (courseData.picture) {
      formData.append("picture", courseData.picture);
    }

    const encodedModules = modules?.map((mod) => ({
      ...mod,
      blocks: mod?.blocks?.map((block) => ({
        ...block,
        content:
          block.type === "text" ||
          block.type === "textFull" ||
          block.type === "button"
            ? encodeHTML(block.content)
            : block.content,
      })),
    }));

    formData.append("modules", JSON.stringify(encodedModules));


    modules?.forEach((mod, mIndex) => {
      mod.blocks?.forEach((block, bIndex) => {
        if (
          (block.type === "file" || block.type === "fileFull") &&
          block.file
        ) {
          formData.append(
            `modules_${mIndex}_blocks_${bIndex}_file`,
            block.file
          );
        }
      });
    });

    const response = await fetch(
      "https://www.tanzcoffee.co.tz/mwangaza-backend/upload_course.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    alert(result.message);

    // Optional: close form after success
    setFormState(false);
    fetchCourses(page);

  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};



  /****************************************************/

  const {userData} = useContext(AuthContext);
  if(userData.user_role !== 'admin'){
    return
  }
  console.log(courseData.description)
  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
      <h2>
  {editModeState ? "Edit Course" : "Upload New Course"}
</h2>


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
          <TipTapEditor
            key={courseData.description}
            value={courseData.description}
            onChange={(html) => updateCourseData("description", html)}
          />
        </div>

        {/* ABOUT THIS COURSE */}
        <div>
          <label>About This Course</label>
          <TipTapEditor
            value={courseData.about}
            onChange={(html) => updateCourseData("about", html)}
          />
        </div>

        {/* HINT */}
        <div>
          <label>Course Hint</label>
          <TipTapEditor
            value={courseData.hint}
            onChange={(html) => updateCourseData("hint", html)}
          />
        </div>

        {/* TARGET AUDIENCE */}
        <div>
          <label>Who Should Take This Course?</label>
          <TipTapEditor
            value={courseData.targetAudience}
            onChange={(html) => updateCourseData("targetAudience", html)}
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

          {modules?.map((module, index) => (
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
              {module.blocks?.map((block, bIndex) => (
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
                        prev?.map((mod, mIndex) => {
                          if (mIndex !== index) return mod; // leave other modules untouched
                          return {
                            ...mod,
                            blocks: mod.blocks?.map((b, i) =>
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
                        prev?.map((mod, mIndex) => {
                          if (mIndex !== index) return mod;
                          return {
                            ...mod,
                            blocks: mod.blocks?.map((b, i) =>
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
                    <option value="textFull">Full Width Text</option>
                    <option value="file">File Block</option>
                    <option value="fileFull">Full Width File</option>
                    <option value="button">Button</option>
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
                    {(block.type === "text" || block.type === "textFull") && (
                      <TipTapEditor
                        value={block.content}
                        onChange={(html) => updateTextBlock(index, bIndex, html)}
                      />
                    )}

                    {/* FILE BLOCK */}
                    {(block.type === "file" || block.type === "fileFull") && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <input
                          type="file"
                          onChange={(e) =>
                            e.target.files[0] && updateFileBlock(index, bIndex, e.target.files[0])
                          }
                        />

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

                    {/* BUTTON BLOCK EDITOR */}
                    {block.type === "button" && (
                      <TipTapEditor
                        value={block.content}
                        onChange={(html) => updateTextBlock(index, bIndex, html)}
                      />
                    )}


                  </div>

                </div>
              ))}

              {/* ADD BLOCK BUTTONS */}
              <div style={{ marginTop: "10px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button type="button" onClick={() => addBlock(index, "text")} style={btnAdd}>+ Add Text Block</button>
                <button type="button" onClick={() => addBlock(index, "textFull")} style={btnAdd}>+ Add Full Text Block</button>
                <button type="button" onClick={() => addBlock(index, "file")} style={btnAdd}>+ Add File Block</button>
                <button type="button" onClick={() => addBlock(index, "fileFull")} style={btnAdd}>+ Add Full File Block</button>
                <button type="button" onClick={() => addBlock(index, "button")} style={btnAdd}>+ Add Button Block</button>
              </div>
            </div>
          ))}

          <button type="button" onClick={addModule} style={btnAddLarge}>
            + Add Module
          </button>
        </div>

        {/* SUBMIT */}
<button type="submit" style={btnSubmit}>
  {editModeState ? "Update Course" : "Create Course"}
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
  background: "#253957",
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
