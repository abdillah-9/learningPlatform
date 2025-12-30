import { useContext, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const decodeHTML = (encoded) => {
  try {
    return decodeURIComponent(escape(atob(encoded)));
  } catch {
    return encoded; // fallback
  }
};

export default function AAviewLastCourse() {
  const { userData } = useContext(AuthContext);
  const { courseId, moduleId } = useParams();

  const [course, setCourse] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const BLOCKS_PER_SLIDE = 3;

  // Prevent copy/select/context
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

  // Fetch course/module
  useEffect(() => {
    if (!moduleId) return;

    fetch(`https://www.tanzcoffee.co.tz/mwangaza-backend/get_module_by_id.php?module_id=${moduleId}`)
      .then((res) => res.json())
      .then((data) => setCourse(data));
  }, [moduleId]);

  // Flatten and chunk blocks into slides
  const slides = useMemo(() => {
    if (!course) return [];

    const allBlocks = course.modules.flatMap((mod) => mod.blocks);
    const result = [];

    for (let i = 0; i < allBlocks.length; i += BLOCKS_PER_SLIDE) {
      result.push(allBlocks.slice(i, i + BLOCKS_PER_SLIDE));
    }

    return result;
  }, [course]);

  // Get the current module
  const currentModule = useMemo(() => {
    if (!course || !moduleId) return null;
    return course.modules.find((mod) => mod.id === moduleId);
  }, [course, moduleId]);


  const totalSlides = slides.length;
  const currentSlideBlocks = slides[slideIndex];

  // Track progress (last block of current slide)
  useEffect(() => {
    if (!currentSlideBlocks || currentSlideBlocks.length === 0) return;

    const lastBlock = currentSlideBlocks[currentSlideBlocks.length - 1];
    if (!lastBlock?.id) return;

    async function ProgressTracker() {
      const formData = new FormData();
      formData.append("user_id", userData.user_id);
      formData.append("course_id", courseId);
      formData.append("module_id", moduleId);
      formData.append("blocks_id", lastBlock.id);

      try {
        const res = await fetch(
          "https://www.tanzcoffee.co.tz/mwangaza-backend/progress_tracker.php",
          { method: "POST", body: formData }
        );
        if (res.ok) {
          const data = await res.text();
          console.log(data);
        } else {
          console.warn("Connection problem");
        }
      } catch (err) {
        console.error(err);
      }
    }

    ProgressTracker();
  }, [currentSlideBlocks, courseId, moduleId, userData]);

  if (!course) return <p>Loading...</p>;

  const nextSlide = () => slideIndex < totalSlides - 1 && setSlideIndex(slideIndex + 1);
  const prevSlide = () => slideIndex > 0 && setSlideIndex(slideIndex - 1);

  const renderFile = (block) => {
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

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext))
      return <img src={url} alt="block file" style={{ width: "100%", height: "100%" }} />;
    if (["mp3", "wav", "ogg"].includes(ext)) return <audio src={url} controls />;
    if (ext === "pdf") return <iframe src={url} width="100%" height="100%" title="PDF file"></iframe>;
    return <a href={url} target="_blank" rel="noreferrer">Download File</a>;
  };

  alert("Current module"+currentModule);
  return (
    <div style={{ padding: "20px" }}>
    <h2>{currentModule ? currentModule.name : "Loading Module..."}</h2>


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
          justifyContent: "space-between",
        }}
      >
        {currentSlideBlocks?.map((block, j) => (
          <div
            key={j}
            style={{
              marginBottom: "20px",
              borderRadius: "6px",
              width: block.type === "file" ? "45%" : "auto",
              flex:
                block.type === "fileFull" || block.type === "textFull"
                  ? "1 1 100%"
                  : block.type === "file"
                  ? "1 1 45%"
                  : "1 1 250px",
            }}
          >
            {block.type === "text" && (
              <div className="tiptap-content" dangerouslySetInnerHTML={{ __html: decodeHTML(block.content) }} />
            )}
            {block.type === "textFull" && (
              <div className="tiptap-content" dangerouslySetInnerHTML={{ __html: decodeHTML(block.content) }} />
            )}
            {(block.type === "file" || block.type === "fileFull") && (
              <div
                style={{
                  minWidth: "250px",
                  width: "100%",
                  aspectRatio: "16/9",
                }}
              >
                {renderFile(block)}
              </div>
            )}
            {block.type === "button" && (
              <button
                type="button"
                style={{
                  padding: "10px 20px",
                  background: "#009970",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                dangerouslySetInnerHTML={{ __html: decodeHTML(block.content) || "Click Here" }}
              />
            )}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
        <button
          onClick={prevSlide}
          disabled={slideIndex === 0}
          style={{ padding: "10px 12px", borderRadius: "5px", border: "1px solid rgba(20,150,200,1)", flex: "1 1 100px", cursor: "pointer" }}
        >
          ◀ Prev
        </button>

        <span
          style={{
            padding: "10px 12px",
            borderRadius: "5px",
            border: "1px solid rgba(20,150,200,1)",
            width: "100px",
            textAlign: "center",
            fontWeight: 700,
            fontSize: "15px",
          }}
        >
          {slideIndex + 1} / {totalSlides}
        </span>

        <button
          onClick={nextSlide}
          disabled={slideIndex === totalSlides - 1}
          style={{ padding: "10px 12px", borderRadius: "5px", border: "1px solid rgba(20,150,200,1)", flex: "1 1 100px", cursor: "pointer" }}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
