import { useState } from "react";

export default function AdminHome() {

    const [modules, setModules] = useState([]);

    const addModule = () => {
        setModules(prev => [
            ...prev,
            {
                type: "",
                title: "",
                desc: "",
                content: "",
                cost: "",
                file: null
            }
        ]);
    };

    const updateModule = (index, field, value) => {
        setModules(prev => {
            const updated = [...prev];
            updated[index][field] = value;
            return updated;
        });
    };

    const removeModule = (index) => {
        setModules(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // For demo: log all course info including modules
        console.log({ modules });
        alert("Form submitted! Check console for module data.");
    };

    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0]; // "2025-12-10"


    return (
        <div style={{padding:"20px", display:'flex', gap:'15px', flexDirection:'column'}}>
            
            <h2>Upload New Course</h2>

            <form
                onSubmit={handleSubmit}
                style={{display:'flex', flexWrap:'wrap', gap:'20px', justifyContent:'space-between', fontSize:'15px'}}
            >

                {/* Course Number */}
                <div style={{display:'flex', gap:'10px', alignItems:'center', width:'100%', maxWidth:'450px', border:'1px solid #ccc', justifyContent:'space-between', padding:'10px', borderRadius:'5px'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>
                        Course Number
                    </label>
                    <input type="text" name="course_number" placeholder="Course Number"
                        style={{fontSize:'15px',padding:'10px 15px', border:'1px solid #ccc',borderRadius:'5px'}}/>
                </div>

                {/* Course Heading */}
                <div style={{display:'flex', gap:'10px', alignItems:'center', width:'100%', maxWidth:'450px',  border:'1px solid #ccc', justifyContent:'space-between', padding:'10px', borderRadius:'5px'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>
                        Course Heading
                    </label>
                    <input type="text" name="course_heading" placeholder="Course Heading"
                        style={{fontSize:'15px',padding:'10px 15px', border:'1px solid #ccc',borderRadius:'5px'}}/>
                </div>

                {/* Course Description */}
                <div style={{display:'flex', gap:'10px', alignItems:'center', width:'100%', maxWidth:'450px', border:'1px solid #ccc', justifyContent:'space-between', padding:'10px', borderRadius:'5px'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>
                        Course Description
                    </label>
                    <input type="text" name="course_desc" placeholder="Course Description"
                        style={{fontSize:'15px',padding:'10px 15px', border:'1px solid #ccc',borderRadius:'5px'}}/>
                </div>

                {/* Course Image */}
                <div style={{display:'flex', gap:'10px', alignItems:'center', width:'100%', maxWidth:'450px',  border:'1px solid #ccc', justifyContent:'space-between', padding:'10px', borderRadius:'5px'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>
                        Course Image
                    </label>
                    <input type="file" name="course_image"
                        style={{fontSize:'15px',padding:'10px 15px', border:'1px solid #ccc',borderRadius:'5px'}} />
                </div>

                {/* About This Course */}
                <div style={{display:'flex', gap:'10px', width:'100%', maxWidth:'450px', border:'1px solid #ccc', flexDirection:'column', padding:'10px', borderRadius:'5px'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>
                        About This Course
                    </label>
                    <textarea rows={5} name="about_course" placeholder="About This Course Description"
                        style={{fontSize:'15px',padding:'10px', border:'1px solid #ccc',borderRadius:'5px'}}></textarea>
                </div>

                {/* Who Should Take This Course */}
                <div style={{display:'flex', gap:'10px', width:'100%', maxWidth:'450px', border:'1px solid #ccc', flexDirection:'column', padding:'10px', borderRadius:'5px'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>
                        Who Should Take This Course
                    </label>
                    <textarea rows={5} name="who_should_take" placeholder="Who should take the course"
                        style={{fontSize:'15px',padding:'10px', border:'1px solid #ccc',borderRadius:'5px'}}></textarea>
                </div>

                {/* Course Start Date */}
                <div style={{display:'flex', gap:'10px', alignItems:'center', width:'100%', maxWidth:'450px', border:'1px solid #ccc', justifyContent:'space-between', padding:'10px', borderRadius:'5px'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>
                        Course Start Date
                    </label>
                    <input type="date" name="start_date"
                        style={{fontSize:'15px',padding:'10px 15px', border:'1px solid #ccc',borderRadius:'5px'}} defaultValue={formattedToday}/>
                </div>

                {/* Course Duration */}
                <div style={{display:'flex', gap:'10px', alignItems:'center', width:'100%', maxWidth:'450px', border:'1px solid #ccc', justifyContent:'space-between', padding:'10px', borderRadius:'5px'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>
                        Course Duration (min)
                    </label>
                    <input type="text" name="course_duration" placeholder="Course Duration"
                        style={{fontSize:'15px',padding:'10px 15px', border:'1px solid #ccc',borderRadius:'5px'}} defaultValue={30} />
                </div>

                {/* Course Hint */}
                <div style={{display:'flex', gap:'10px', width:'100%', maxWidth:'450px', border:'1px solid #ccc', flexDirection:'column', padding:'10px', borderRadius:'5px'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>
                        Course Hint
                    </label>
                    <textarea rows={5} name="course_hint" placeholder="Hint"
                        style={{fontSize:'15px',padding:'10px', border:'1px solid #ccc',borderRadius:'5px'}}></textarea>
                </div>

                {/* ------------------ MODULES ------------------ */}
                <div style={{ width: "100%", marginTop: "30px" }}>
                    <h3 style={{ marginBottom: "10px" }}>Course Modules</h3>

                    {modules.map((module, index) => (
                        <div key={index}
                            style={{
                                border: "1px solid #aaa",
                                padding: "15px",
                                background: "#f7f7f7",
                                borderRadius: "6px",
                                marginBottom: "20px"
                            }}
                        >

                            <div style={{display:"flex", justifyContent:"space-between"}}>
                                <h4 style={{margin:0}}>Module {index + 1}</h4>

                                <button type="button"
                                    onClick={() => removeModule(index)}
                                    style={{
                                        background: "red",
                                        color: "white",
                                        border: "none",
                                        padding: "5px 10px",
                                        borderRadius: "5px",
                                        cursor: "pointer"
                                    }}>
                                    Remove
                                </button>
                            </div>

                            {/* Module Type */}
                            <label style={{fontWeight:500, marginTop:10}}>Module Type</label>
                            <select
                                value={module.type || ""}
                                onChange={(e) => updateModule(index, "type", e.target.value)}
                                style={{width:"100%", padding:"10px", borderRadius:"5px", border:"1px solid #ccc", background:"white"}}
                            >
                                {/* <option value="">Select module type</option> */}
                                <option value="reading">Reading</option>
                                <option value="video">Video</option>
                            </select>

                            {/* Module Title */}
                            <label style={{fontWeight:500, marginTop:10}}>Module Title</label>
                            <input type="text" placeholder="Module title"
                                value={module.title}
                                onChange={(e)=>updateModule(index,"title",e.target.value)}
                                style={{width:"100%", padding:"10px", borderRadius:"5px", border:"1px solid #ccc"}}
                            />

                            {/* Module Description */}
                            <label style={{fontWeight:500, marginTop:10}}>Module Description</label>
                            <textarea rows={3} placeholder="Short description"
                                value={module.desc}
                                onChange={(e)=>updateModule(index,"desc",e.target.value)}
                                style={{width:"100%", padding:"10px", borderRadius:"5px", border:"1px solid #ccc"}}
                            ></textarea>

                            {/* Module Content */}
                            <label style={{fontWeight:500, marginTop:10}}>Module Content</label>
                            <textarea rows={4} placeholder="Long module content"
                                value={module.content}
                                onChange={(e)=>updateModule(index,"content",e.target.value)}
                                style={{width:"100%", padding:"10px", borderRadius:"5px", border:"1px solid #ccc"}}
                            ></textarea>

                            {/* Module Cost */}
                            <label style={{fontWeight:500, marginTop:10}}>Module Cost (Tsh)</label>
                            <input type="number" placeholder="e.g. 23000"
                                value={module.cost}
                                onChange={(e)=>updateModule(index,"cost",e.target.value)}
                                style={{width:"100%", padding:"10px", borderRadius:"5px", border:"1px solid #ccc"}}
                            />

                            {/* Module File */}
                            <label style={{fontWeight:500, marginTop:10}}>Upload Module File (optional)</label>
                            <input type="file"
                                onChange={(e)=>updateModule(index,"file",e.target.files[0])}
                                style={{width:"100%", padding:"10px", borderRadius:"5px", border:"1px solid #ccc", background:"white"}}
                            />

                            {module.file && (
                                <div style={{marginTop:"10px", color:"#333", fontStyle:"italic"}}>
                                    File Uploaded: {module.file.name}
                                </div>
                            )}

                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addModule}
                        style={{
                            background:"#0d6efd",
                            color:"white",
                            padding:"10px 15px",
                            border:"none",
                            borderRadius:"5px",
                            cursor:"pointer"
                        }}
                    >
                        + Add Module
                    </button>
                </div>

                {/* Submit Button */}
                <div style={{ width:"100%", marginTop:"20px" }}>
                    <button type="submit"
                        style={{
                            background:'#0c2b4eef',
                            color:"white",
                            padding:"12px 20px",
                            border:"none",
                            borderRadius:"5px",
                            fontSize:"16px",
                            cursor:"pointer"
                        }}
                    >
                        Submit Course
                    </button>
                </div>

            </form>
        </div>
    );
}
