import { useEffect, useState } from "react";
import CourseManager from "./CourseManager";
import { MdLibraryAdd } from "react-icons/md";

export default function AvailableCourses() {
  const [formState, setFormState] = useState(false);
  const [editModeState, setEditModeState] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return Math.max(1, Number(params.get("page")) || 1);
  });

      // --- SAFE HTML DECODING ---
    const decodeHTML = (encoded) => {
      try {
        return decodeURIComponent(escape(atob(encoded)));
      } catch {
        return encoded; // fallback for old DB rows
      }
    };

    const fetchCourses = async (page) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.tanzcoffee.co.tz/mwangaza-backend/fetch_courses_per_page.php?page=${page}`,{ cache: "no-store" }
      );
      const data = await res.json();
      setCourses(data.data || []);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "15px" }}>
      <QuickActions
        formState={formState}
        setFormState={setFormState}
        setEditModeState={setEditModeState}
        setCourseData={setCourseData}
      />
      {formState && (
        <CourseManager
          formState={formState}
          setFormState={setFormState}
          editModeState={editModeState}
          courseData={courseData}
          fetchCourses={fetchCourses}
          page={page}
          setPage={setPage}
        />
      )}
      <ShowCourses
        setFormState={setFormState}
        setEditModeState={setEditModeState}
        setCourseData={setCourseData}
        setCourses={setCourses}
        courses={courses}
        loading={loading}
        setLoading={setLoading}
        fetchCourses={fetchCourses}
        page={page}
        setPage={setPage}
        decodeHTML={decodeHTML}
      />
    </div>
  );
}

function QuickActions({ formState, setFormState, setEditModeState, setCourseData }) {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          gap: "6px",
          boxShadow: "1px 1px 20px rgba(100,100,100,0.6)",
          borderRadius: "5px",
          cursor: "pointer",
          width: "100%",
          maxWidth: "250px",
        }}
        onClick={() => {
          setFormState(!formState);
          setEditModeState(false);
          setCourseData(null);
        }}
      >
        <span
          style={{
            fontSize: "16px",
            backgroundColor: "rgba(153, 153, 241, 1)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            color: "rgba(9, 18, 87, 1)",
          }}
        >
          <MdLibraryAdd />
        </span>
        <span>Upload new course</span>
      </div>
    </div>
  );
}

function ShowCourses({loading, setLoading, setCourses, courses ,fetchCourses ,setFormState, setEditModeState, setCourseData, editModeState, page, setPage , decodeHTML}) {

  useEffect(() => {
    fetchCourses(page);
    updateURL(page);
  }, [page]);

  const updateURL = (page) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page);
    window.history.pushState({}, "", `?${params.toString()}`);
  };

  const handleDeleteCourse = async (courseId) => {
  if (!window.confirm("Are you sure you want to delete this course? This cannot be undone.")) {
    return;
  }

  try {
    const formData = new FormData();
    formData.append("courseId", courseId);

    const res = await fetch(
      "https://www.tanzcoffee.co.tz/mwangaza-backend/delete_course.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await res.json();
    alert(result.message);

    // Refresh courses
    fetchCourses(page);
  } catch (err) {
    console.error(err);
    alert("Failed to delete course");
  }
};

  return (
    <div style={{ marginTop: "20px" }}>
      <h4>Available Courses (Page {page})</h4>
      {loading && <p>Loading...</p>}

      {courses?.map((course, courseIndex) => (
        <div key={course.id} style={{ marginBottom: "25px" }}>
          <h5 style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{padding:'10px', borderRadius:'20px', width:'200px', border:'1px solid #F0B400', fontSize:'20px'}}>{`Course ${courseIndex + 1}: ${course.name}`}</span>
            <span style={{ display: "flex", gap: "10px" }}>
              <button
                style={{
                  padding: "5px 10px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "#F0B400",
                }}
                onClick={() => {
                  setEditModeState(!editModeState);
                  setFormState(true);
                  setCourseData(course);
                }}
              >
                Edit Course
              </button>
              <button
                style={{
                  padding: "5px 10px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "#dc3545",
                  color: "white",
                }}
                onClick={() => handleDeleteCourse(course.id)}
              >
                Delete Course
              </button>

            </span>
          </h5>
          <p decodeURIComponent={{__html:decodeHTML(course.description)}}>{}</p>

          {course?.modules?.map((module, moduleIndex) => (
            <div
              key={module.id}
              style={{
                marginLeft: "20px",
                marginTop: "10px",
                padding: "10px",
                borderLeft: "3px solid #0077cc",
              }}
            >
              <strong>{`Module ${moduleIndex + 1}: ${module.title}`}</strong>
              <div style={{ marginLeft: "20px", marginTop: "5px" }}>
                {module.blocks.length > 0 ? (
                  module?.blocks?.map((block, blockIndex) => (
                    <div
                      key={block.id}
                      style={{
                        marginBottom: "10px",
                        padding: "8px",
                        borderRadius: "5px",
                        background: "#f0f0f0",
                      }}
                    >
                      <strong>{`Block ${blockIndex + 1} (${block.type})`}</strong>
                      <BlockRenderer block={block} decodeHTML={decodeHTML}/>
                    </div>
                  ))
                ) : (
                  <p style={{ fontStyle: "italic" }}>No blocks in this module.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}

      <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span>Page {page}</span>
        <button
          disabled={courses.length < 2}
          onClick={() => setPage(p => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function BlockRenderer({ block , decodeHTML}) {
  if (!block) return null;

  const baseStyle = {
    marginBottom: "20px",
    padding: "12px",
    borderRadius: "6px",
    background: "#fafafa",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  };

  const fileUrl = block.file ? `https://www.tanzcoffee.co.tz/mwangaza-backend/${block.file}` : null;

  // TEXT BLOCKS
  if (block.type === "text" || block.type === "textFull") {
    return (
      <div
        className="tiptap-content"
        style={{ ...baseStyle, width: "100%" }}
        dangerouslySetInnerHTML={{ __html: decodeHTML(block.content) }}
      />
    );
  }

  // FILE BLOCKS
  if (block.type === "file" || block.type === "fileFull") {
    if (!fileUrl) return null;

    const isFull = block.type === "fileFull";

    // Determine type by extension
    const ext = fileUrl.split(".").pop().toLowerCase();

    let content;
    if (["mp4", "webm", "ogg"].includes(ext)) {
      content = (
        <video
          src={fileUrl}
          controls
          controlsList="nodownload"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          style={{ width: "100%", height: "100%" }}
        />
      );
    } else if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
      content = <img src={fileUrl} alt="file preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />;
    } else if (["mp3", "wav", "ogg"].includes(ext)) {
      content = <audio src={fileUrl} controls style={{ width: "100%" }} />;
    } else if (ext === "pdf") {
      content = <iframe src={fileUrl} width="100%" height="100%" title="PDF file" />;
    } else {
      content = (
        <a href={fileUrl} target="_blank" rel="noreferrer">
          📎 Download File
        </a>
      );
    }

    return (
      <div
        style={{
          ...baseStyle,
          width: isFull ? "100%" : "45%",
          maxWidth: isFull ? "500px" : undefined,
          minWidth: isFull ? "250px" : undefined,
          aspectRatio: isFull ? "16/9" : "16/9",
          overflow: "hidden",
        }}
      >
        {content}
      </div>
    );
  }

  // BUTTON BLOCKS
if (block.type === "button") {
  return (
    <button
      style={{
        ...baseStyle,
        backgroundColor: "#ffffffff",
        color: "#00326aff",
        border: "2px solid rgba(2, 66, 123, 1)",
        cursor: "pointer",
        fontWeight: "600",
      }}
      dangerouslySetInnerHTML={{
        __html: decodeHTML(block.content) || "<span>Click</span>",
      }}
    />
  );
}


  return null;
}
