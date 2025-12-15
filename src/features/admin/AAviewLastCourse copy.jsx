import { useEffect, useState } from "react";

export default function AAviewLastCourse() {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch("http://localhost/mwangaza-backend/get_last_course.php")
      .then(res => res.json())
      .then(data => {
        console.log("FULL COURSE DATA:", data);
        setCourse(data);
      });
  }, []);

  if (!course) return <p>Loading...</p>;


  function renderFile(url) {
  if (!url) return null;
   
  url = `http://localhost/mwangaza-backend/`+url;
  const ext = url.split('.').pop().toLowerCase();

  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
    return <img src={url} alt="block file" style={{ width: '100%', height: '100%' }} />;
  } else if (['mp4', 'webm', 'ogg', 'mkv'].includes(ext)) {
    return <video src={url} controls style={{ width: '100%', height: '100%' }} />;
  } else if (['mp3', 'wav', 'ogg',].includes(ext)) {
    return <audio src={url} controls />;
  } else if (ext === 'pdf') {
    return <iframe src={url} width="100%" height="100%" title="PDF file"></iframe>;
  } else {
    return <a href={url} target="_blank" rel="noreferrer">Download File</a>;
  }
}

  return (
    <div style={{ padding: "20px" }}>
<h2>Modules</h2>

{course.modules.map((mod, i) => (
  <div
    key={i}
    style={{
      border: "1px solid #ccc",
      padding: "15px",
      marginBottom: "20px",
      borderRadius: "6px",
      background: "#fafafa",
      display:'flex', flexWrap:'wrap', gap:'15px', justifyContent:'space-between'
    }}
  >
    {mod.blocks.map((block, j) => (
      <div
        key={j}
        style={{
        //   padding: "20px",
        //   border: "2px solid red",
          marginBottom: "20px",
          borderRadius: "6px",
        //   background: "white",
          width:block.type == 'file' ? '45%' : '100%',
          flex: (block.type === 'fileFull' || block.type === 'textFull') ? '1 1 100%' :
          (block.type === 'file') ? '1 1 45%' : '1 1 250px'
        }}
      >
        {/* TEXT BLOCK */}
        {block.type === "text" && (
          <div
          className="tiptap-content"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )}

        {/* FILE BLOCK */}
        {
            block.type === 'file'  && 
            <div style={{minWidth:'250px',width:'100%', aspectRatio:1/0.8, backgroundColor:'rgba(1,1,1,1)'}}>
                {renderFile(block.file)}
            </div>
        }

        {/* TEXTFULL BLOCK */}
        {block.type === "textFull" && (
          <div
          className="tiptap-content"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )}

        {/* FILEFULL BLOCK */}
        {
            block.type === 'fileFull'  && 
            <div style={{maxWidth:'500px',minWidth:'250px',width:'100%', aspectRatio:1/0.8}}>
                {renderFile(block.file)}
            </div>
        }

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
            dangerouslySetInnerHTML={{ __html: block.content || "Click Me" }}
        />
        )}


      </div>
    ))}
  </div>
))}

    </div>
  );
}
