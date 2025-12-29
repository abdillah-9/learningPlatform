import { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const decodeHTML = (encoded) => {
  try {
    return decodeURIComponent(escape(atob(encoded)));
  } catch {
    return encoded;
  }
};

export default function AAviewLastCourse() {
  /* ---------------- PREVENT COPY ---------------- */
  useEffect(() => {
    const handleCopy = (e) => e.preventDefault();
    const handleContext = (e) => e.preventDefault();
    const handleSelect = (e) => e.preventDefault();

    document.addEventListener("copy", handleCopy);
    document.addEventListener("contextmenu", handleContext);
    document.addEventListener("selectstart", handleSelect);

    return () => {
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("contextmenu", handleContext);
      document.removeEventListener("selectstart", handleSelect);
    };
  }, []);

  /* ---------------- STATE & CONTEXT ---------------- */
  const [course, setCourse] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const { userData } = useContext(AuthContext);
  const { courseId, moduleId } = useParams();

  const BLOCKS_PER_SLIDE = 3;

  /* ---------------- FETCH MODULE ---------------- */
  useEffect(() => {
    if (!moduleId) return;

    fetch(
      `https://www.tanzcoffee.co.tz/mwangaza-backend/get_module_by_id.php?module_id=${moduleId}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("MODULE DATA:", data);
        setCourse(data);
      });
  }, [moduleId]);

  /* ---------------- BUILD SLIDES (DERIVED DATA) ---------------- */
  const slides = useMemo(() => {
    if (!course?.modules) return [];

    const allBlocks = course.modules.flatMap((mod) => mod.blocks);
    const result = [];

    for (let i = 0; i < allBlocks.length; i += BLOCKS_PER_SLIDE) {
      result.push(allBlocks.slice(i, i + BLOCKS_PER_SLIDE));
    }

    return result;
  }, [course]);

  /* ---------------- PROGRESS TRACKER ---------------- */
  useEffect(() => {
    if (!slides.length) return;
    if (!userData?.user_id) return;

    const currentSlideBlocks = slides[slideIndex];
    if (!currentSlideBlocks?.length) return;

    const lastBlock = currentSlideBlocks[currentSlideBlocks.length - 1];
    if (!lastBlock?.id) return;

    async function progressTracker() {
      const formData = new FormData();
      formData.append("user_id", userData.user_id);
      formData.append("course_id", courseId);
      formData.append("module_id", moduleId);
      formData.append("blocks_id", lastBlock.id);

      try {
        const res = await fetch(
          "https://www.tanzcoffee.co.tz/mwangaza-backend/progress_tracker.php",
          {
            method: "POST",
            body: formData,
          }
        );

        if (res.ok) {
          const data = await res.text();
          console.log("Progress saved:", data);
        }
      } catch (err) {
        console.error("Progress error:", err);
      }
    }

    progressTracker();
  }, [slideIndex, slides, userData, courseId, moduleId]);

  /* ---------------- GUARD ---------------- */
  if (!course) return <p>Loading...</p>;

  const totalSlides = slides.length;
  const currentSlideBlocks = slides[slideIndex];

  /* ---------------- NAVIGATION ---------------- */
  const nextSlide = () => {
    if (slideIndex < totalSlides - 1) {
      setSlideIndex((i) => i + 1);
    }
  };

  const prevSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex((i) => i - 1);
    }
  };

  /* ---------------- FILE RENDER ---------------- */
  function renderFile(block) {
    if (!block) return null;

    if (block.type === "file" || block.type === "fileFull") {
      if (!block.videoToken) return null;

      const url = `https://www.tanzcoffee.co.tz/mwangaza-backend/stream_video.php?token=${block.videoToken}`;

      return (
        <video
          src={url}
          controls
          controlsList="nodownload"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          style={{ width: "100%", height: "100%" }}
        />
      );
    }

    const url = block.file || "";
    if (!url) return null;

    const ext = url.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
      return <img src={url} alt="" style={{ width: "100%" }} />;
    }
    if (["mp3", "wav", "ogg"].includes(ext)) {
      return <audio src={url} controls />;
    }
    if (ext === "pdf") {
      return <iframe src={url} width="100%" height="100%" title="pdf" />;
    }

    return (
      <a href={url} target="_blank" rel="noreferrer">
        Download File
      </a>
    );
  }

  /* ---------------- RENDER ---------------- */
  return (
    <div style={{ padding: "20px" }}>
      <h2>Module Name</h2>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          marginBottom: "20px",
          borderRadius: "6px",
          background: "#fafafa",
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        {currentSlideBlocks?.map((block, j) => (
          <div key={j} style={{ width: "100%" }}>
            {block.type.includes("text") && (
              <div
                className="tiptap-content"
                dangerouslySetInnerHTML={{
                  __html: decodeHTML(block.content),
                }}
              />
            )}

            {(block.type === "file" || block.type === "fileFull") && (
              <div style={{ aspectRatio: "16/9" }}>
                {renderFile(block)}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <button onClick={prevSlide} disabled={slideIndex === 0}>
          ◀ Prev
        </button>

        <span>
          {slideIndex + 1} / {totalSlides}
        </span>

        <button
          onClick={nextSlide}
          disabled={slideIndex === totalSlides - 1}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
