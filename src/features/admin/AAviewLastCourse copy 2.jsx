import { useEffect, useState } from "react";

export default function AAviewLastCourse() {
  const [course, setCourse] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const BLOCKS_PER_SLIDE = 5;

  useEffect(() => {
    fetch("http://localhost/mwangaza-backend/get_last_module_by_id.php")
      .then(res => res.json())
      .then(data => {
        console.log("FULL COURSE DATA:", data);
        setCourse(data);
      });
  }, []);

  if (!course) return <p>Loading...</p>;

  /* ---------------- FLATTEN & CHUNK BLOCKS ---------------- */

  const allBlocks = course.modules.flatMap(mod => mod.blocks);

  const slides = [];
  for (let i = 0; i < allBlocks.length; i += BLOCKS_PER_SLIDE) {
    slides.push(allBlocks.slice(i, i + BLOCKS_PER_SLIDE));
  }

  const totalSlides = slides.length;
  const currentSlideBlocks = slides[slideIndex];

  /* ---------------- NAVIGATION ---------------- */

  const nextSlide = () => {
    if (slideIndex < totalSlides - 1) {
      setSlideIndex(slideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  };

  /* ---------------- FILE RENDER ---------------- */

  function renderFile(url) {
    if (!url) return null;

    url = `http://localhost/mwangaza-backend/` + url;
    const ext = url.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
      return (
        <img
          src={url}
          alt="block file"
          style={{ width: "100%", height: "100%" }}
        />
      );
    } else if (["mp4", "webm", "ogg", "mkv"].includes(ext)) {
      return (
        <video
          src={url}
          controls
          style={{ width: "100%", height: "100%" }}
        />
      );
    } else if (["mp3", "wav", "ogg"].includes(ext)) {
      return <audio src={url} controls />;
    } else if (ext === "pdf") {
      return (
        <iframe
          src={url}
          width="100%"
          height="100%"
          title="PDF file"
        ></iframe>
      );
    } else {
      return (
        <a href={url} target="_blank" rel="noreferrer">
          Download File
        </a>
      );
    }
  }

  /* ---------------- RENDER ---------------- */

  return (
    <div style={{ padding: "20px" }}>
      <h2>Module Name</h2>

      {/* SLIDE CONTENT */}
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
        {currentSlideBlocks.map((block, j) => (
          <div
            key={j}
            style={{
              marginBottom: "20px",
              borderRadius: "6px",
              width: block.type == "file" ? "45%" : "100%",
              flex:
                block.type === "fileFull" ||
                block.type === "textFull"
                  ? "1 1 100%"
                  : block.type === "file"
                  ? "1 1 45%"
                  : "1 1 250px",
            }}
          >
            {/* TEXT BLOCK */}
            {block.type === "text" && (
              <div
                className="tiptap-content"
                dangerouslySetInnerHTML={{
                  __html: block.content,
                }}
              />
            )}

            {/* FILE BLOCK */}
            {block.type === "file" && (
              <div
                style={{
                  minWidth: "250px",
                  width: "100%",
                  aspectRatio: 16/9,
                }}
              >
                {renderFile(block.file)}
              </div>
            )}

            {/* TEXTFULL BLOCK */}
            {block.type === "textFull" && (
              <div
                className="tiptap-content"
                dangerouslySetInnerHTML={{
                  __html: block.content,
                }}
              />
            )}

            {/* FILEFULL BLOCK */}
            {block.type === "fileFull" && (
              <div
                style={{
                  maxWidth: "500px",
                  minWidth: "250px",
                  width: "100%",
                  aspectRatio: 16/9,
                }}
              >
                {renderFile(block.file)}
              </div>
            )}

            {/* BUTTON BLOCK */}
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
                dangerouslySetInnerHTML={{
                  __html: block.content || "Click Me",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* NAVIGATION */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap:'20px'
        }}
      >
        <button 
          onClick={prevSlide} 
          disabled={slideIndex === 0}
          style={{padding:'10px 12px', borderRadius:'5px', border:'1px solid rgba(20,150,200,1)', flex:'1 1 100px', cursor:'pointer'}}
        >
          ◀ Prev
        </button>

        <span 
          style={{padding:'10px 12px', borderRadius:'5px', border:'1px solid rgba(20,150,200,1)', width:'100px', textAlign:'center',fontWeight:700, fontSize:'15px'}}
        >
          {slideIndex + 1} / {totalSlides}
        </span>

        <button
          onClick={nextSlide}
          disabled={slideIndex === totalSlides - 1}
          style={{padding:'10px 12px', borderRadius:'5px', border:'1px solid rgba(20,150,200,1)', flex:'1 1 100px', cursor:'pointer'}}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
