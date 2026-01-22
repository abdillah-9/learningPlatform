import { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { RiFileList3Line, RiTwitterXFill } from "react-icons/ri";
import { LucideClipboardList } from "lucide-react";
import { IoIosMail, IoMdCall } from "react-icons/io";
import MwangazaLogo from '../assets/MwangazaLogo.jpg';

const decodeHTML = (encoded) => {
  try {
    return decodeURIComponent(escape(atob(encoded)));
  } catch {
    return encoded; // fallback
  }
};

export default function AAviewLastCourse() {
  const { userData } = useContext(AuthContext);
  const { courseId, moduleId, blockId } = useParams();
  const navigateTo = useNavigate();

  const [course, setCourse] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  // Scroll to top on slide change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // smooth scroll effect
    });
  }, [slideIndex]);


  const BLOCKS_PER_SLIDE = 4;

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

    fetch(`https://www.tanzcoffee.co.tz/mwangaza_hub/get_module_by_id.php?module_id=${moduleId}`)
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

  useEffect(() => {
  if (!blockId || !course) return;

  const allBlocks = course.modules.flatMap((mod) => mod.blocks);

  const blockIndex = allBlocks.findIndex(
    (b) => String(b.id) === String(blockId)
  );

  if (blockIndex === -1) return;

  const targetSlide = Math.floor(blockIndex / BLOCKS_PER_SLIDE);

  setSlideIndex(targetSlide);
}, [blockId, course]);

  // Get the current module
  const currentModule = useMemo(() => {
    if (!course || !moduleId) return null;
    return course.modules.find((mod) => String(mod.id) === moduleId);
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
          "https://www.tanzcoffee.co.tz/mwangaza_hub/progress_tracker.php",
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

  const url = block.fileUrl; // direct file URL
  if (!url) return null;

  const ext = url.split(".").pop().toLowerCase();

  // Images
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
    return <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />;
  }

  // Videos
  if (["mp4", "webm", "ogg"].includes(ext)) {
    return (
      <video
        key={block.id}
        controls
        playsInline
        preload="metadata"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover`",
          background: "#fafafa",
        }}
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  // Audio
  if (["mp3", "wav", "ogg"].includes(ext)) {
    return <audio src={url} controls />;
  }

  // PDF
  if (ext === "pdf") {
    return <iframe src={url} width="100%" height="100%" title="PDF" />;
  }

  return <a href={url} target="_blank" rel="noreferrer">Download File</a>;
};

  //alert("Current module"+JSON.stringify(currentModule));
  return (
    <div style={{ padding: "20px" }}>
      <div style={{display:'flex', flexWrap:'wrap', gap:'15px', justifyContent:'space-between', width:'100%', padding:'7px'}}>

        <h2>MODULE NAME :{currentModule ? currentModule.title : "Loading Module..."}</h2>
        <div style={{display:'flex', gap:'12px', flexWrap:'wrap' }}>
          <div style={{display:'flex', alignItems:'center', padding:'6px', gap:'6px',boxShadow:'1px 1px 20px rgba(100,100,100,0.6)', borderRadius:'5px', cursor:'pointer', width:'100%',flex:'1 1 150px'}}
          onClick={()=>{navigateTo('/view_all_courses', {replace:true})}}>
            <span style={{fontSize:'14px',backgroundColor:"#eebd3e", borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', color:"#684200ff"}}>
              <RiFileList3Line size={16}/>
            </span>
            <span style={{fontSize:'13px'}}>View All Courses</span>
          </div>
          <span style={{display:'flex', alignItems:'center', padding:'6px', gap:'6px',boxShadow:'1px 1px 20px rgba(100,100,100,0.6)', borderRadius:'5px', cursor:'pointer', width:'100%',flex:'1 1 250px', fontSize:'14px'}}
          onClick={()=>{navigateTo(`/enroll_course/${courseId}`, {replace:true})}}>
            <span style={{fontSize:'14px',backgroundColor:"#eebd3e", borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', color:"#684200ff"}}>
              <LucideClipboardList  size={16}/>
            </span>
            <span style={{fontSize:'13px'}}>
              View other modules which are on the same course as <strong>{currentModule?.title}</strong>
            </span>
          </span>
        </div>
      </div>
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
              minWidth: (block.type === "fileFull" || block.type === "textFull")
                  ? "100%"
                  : "250px",
              flex:
                block.type === "fileFull" || block.type === "textFull"
                  ? "1 1 100%"
                  : block.type === "file"
                  ? "1 1 45%"
                  : "1 1 45%",
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
