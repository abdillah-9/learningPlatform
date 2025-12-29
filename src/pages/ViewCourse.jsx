import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";  // <-- added to get moduleId
import { AuthContext } from "../AuthProvider";

const decodeHTML = (encoded) => {
  try {
    return decodeURIComponent(escape(atob(encoded)));
  } catch {
    return encoded; // fallback for old DB rows
  }
};

export default function AAviewLastCourse() {
  //Main App prevents copying anyshit
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
 
  const [course, setCourse] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const {userData} = useContext(AuthContext);
  const {courseId, moduleId} = useParams()

  const BLOCKS_PER_SLIDE = 3;

  /* ---------------- FLATTEN & CHUNK BLOCKS ---------------- */

  const allBlocks = course?.modules?.flatMap(mod => mod.blocks);

  const slides = [];
  for (let i = 0; i < allBlocks.length; i += BLOCKS_PER_SLIDE) {
    slides.push(allBlocks.slice(i, i + BLOCKS_PER_SLIDE));
  }

  const totalSlides = slides.length;
  const currentSlideBlocks = slides[slideIndex];
  
    /* ------------------ INSERT PROGRESS API --------------------*/
  useEffect(()=>{

    const currentSlideBlocks = slides[slideIndex]; // 3 blocks per slide
    if (!currentSlideBlocks || currentSlideBlocks.length === 0) return;

    // Pick the last block (3rd one)
    const lastBlock = currentSlideBlocks[currentSlideBlocks.length - 1];

    if (!lastBlock?.id) return; // skip if no id

    alert("inside Progress");
    async function ProgressTracker(){
      console.log('slideIndex '+slideIndex)
      const formData = new FormData();
      //Get user_id, module_id, course_id, block_id
      const user_id = userData.user_id;
      formData.append('user_id', user_id);
      formData.append('course_id', courseId);
      formData.append('module_id',moduleId);
      formData.append('blocks_id', lastBlock.id);

      const res= await fetch('https://www.tanzcoffee.co.tz/mwangaza-backend/progress_tracker.php',{
        body:formData,
        method:'post',
      });

      if(res.ok){
        const data = await res.text();
        const data2 = await res.json();
        alert(data);
        alert(data2);
      }
      else{
        alert("conn problem");
      }
    }
    ProgressTracker();
  }, []); 
  useEffect(() => {
    if (!moduleId) return;

    fetch(`https://www.tanzcoffee.co.tz/mwangaza-backend/get_module_by_id.php?module_id=${moduleId}`) // <-- fetch by moduleId
      .then(res => res.json())
      .then(data => {
        console.log("FULL COURSE DATA:", data);
        setCourse(data);
      });
  }, [moduleId]);

  if (!course) return <p>Loading...</p>;


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

function renderFile(block) {
  // For file blocks, we use videoToken; for others we might still use block.content/url
  if (!block) return null;

  // FILE / FILEFULL BLOCK
  if (block.type === "file" || block.type === "fileFull") {
    if (!block.videoToken) return null;

    const url = `https://www.tanzcoffee.co.tz/mwangaza-backend/stream_video.php?token=${block.videoToken}`;

    // Determine file type from token? We can pass ext too if needed, else assume video
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

  // TEXT / OTHER FILE TYPES
  const url = block.file || ""; // fallback if you want
  if (!url) return null;
  const ext = url.split(".").pop().toLowerCase();

  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
    return <img src={url} alt="block file" style={{ width: "100%", height: "100%" }} />;
  } else if (["mp3", "wav", "ogg"].includes(ext)) {
    return <audio src={url} controls />;
  } else if (ext === "pdf") {
    return <iframe src={url} width="100%" height="100%" title="PDF file"></iframe>;
  } else {
    return <a href={url} target="_blank" rel="noreferrer">Download File</a>;
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
        {currentSlideBlocks?.map((block, j) => (
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
                  __html: decodeHTML(block.content),
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
                {renderFile(block)}
              </div>
            )}

            {/* TEXTFULL BLOCK */}
            {block.type === "textFull" && (
              <div
                className="tiptap-content"
                dangerouslySetInnerHTML={{
                  __html: decodeHTML(block.content),
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
                {renderFile(block)}
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
                  __html: decodeHTML(block.content) || "Click Here",
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
