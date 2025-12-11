import { useState } from "react";
import MwangazaLogo from '../assets/MwangazaLogo.jpg';
import userPic from '../assets/Sospeter.webp';
import { HiHome, HiUser } from "react-icons/hi2";
import { FaBookOpenReader } from "react-icons/fa6";

// MAIN COMPONENT
export default function AdminHome() {
    const [active, setActive] = useState("courses");

    const renderContent = () => {
        switch(active) {
            case "dashboard":
                return <Dashboard />;
            case "users":
                return <UserManager />;
            case "courses":
            default:
                return <CourseManager />;
        }
    }

    return (
        <div style={{display:'flex', flexWrap:'wrap'}}>
            <TopNavBar />
            <SideBar active={active} setActive={setActive} />
            <div style={{flexGrow:1, width:'calc(100% - 200px)'}}>
                {renderContent()}
            </div>
        </div>
    )
}

// SIDEBAR
function SideBar({active, setActive}) {
    const links = [
        { name: "Dashboard", key: "dashboard", icon: <HiHome style={{fontSize:'16px'}} /> },
        { name: "User Management", key: "users", icon: <HiUser style={{fontSize:'16px'}} /> },
        { name: "Courses Management", key: "courses", icon: <FaBookOpenReader style={{fontSize:'16px'}} /> },
    ];

    return (
        <div style={{backgroundColor:'#F4B342', width:'200px', display:'flex', flexDirection:'column', gap:'20px', padding:'25px 0px 0px 15px'}}>
            {links.map(link => (
                <div
                    key={link.key}
                    onClick={() => setActive(link.key)}
                    style={{
                        borderRadius:'30px 0px 0px 30px',
                        padding:'5px',
                        display:'flex',
                        gap:'7px',
                        alignItems:'center',
                        fontSize:'13.5px',
                        cursor:'pointer',
                        backgroundColor: active === link.key ? 'white' : 'transparent'
                    }}
                >
                    <span style={{
                        padding:'7px 11px',
                        borderRadius:'50%',
                        backgroundColor: active === link.key ? '#F4B342' : 'black',
                        color: active === link.key ? 'black' : '#F4B342'
                    }}>
                        {link.icon}
                    </span>
                    <span style={{color: active === link.key ? '#835912ff' : '#000000ff'}}>{link.name}</span>
                </div>
            ))}
        </div>
    )
}

// TOP NAVBAR
function TopNavBar(){
    return(
        <section>
            <div style={{width:'100vw', minHeight:'80px', backgroundColor:'#0C2B4E',color:'white',zIndex:1, display:'flex', justifyContent:'space-between',padding:'10px 15px', alignItems:'center', flexWrap:'wrap', gap:'15px'}}>
                <div style={{display:'flex',gap:'10px', alignItems:'center'}}>
                    <img src={MwangazaLogo} alt="logo" width={'60px'} height={'60px'} style={{borderRadius:'50%'}} />
                    <span style={{fontSize:'17px', fontWeight:600, textAlign:'center'}}> MWANGAZA BUSINESS & INVESTMENT SCHOOL</span>
                </div>
                <div style={{display:'flex', gap:'50px', fontSize:'18px',fontWeight:500}}> 
                    <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                        <img src={userPic} alt="" width={'60px'} height={'60px'} style={{borderRadius:'50%'}}/>
                        <div style={{fontSize:'14px', fontWeight:300}}>
                            <span style={{color:'rgba(200,200,200,0.8)', fontSize:'16px'}}>Hello </span>
                            <span>Mayani</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// COURSE MANAGER
function CourseManager() {
    const [courseData, setCourseData] = useState({
        number: "",
        name: "",
        description: "",
        startDate: new Date().toISOString().split('T')[0], // default to today
        about: "",
        hint: "",
        picture: null,
        targetAudience: "",
        duration: ""
    });

    const [modules, setModules] = useState([]);

    // Course data handlers
    const updateCourseData = (field, value) => {
        setCourseData(prev => ({ ...prev, [field]: value }));
    };

    // Module handlers
    const addModule = () => {
        setModules(prev => [
            ...prev,
            { title: "", desc: "", cost: "", blocks: [] }
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

    const addBlock = (moduleIndex, blockType="paragraph") => {
        setModules(prev => {
            const updated = [...prev];
            updated[moduleIndex].blocks.push({ type: blockType, content: "", file: null });
            return updated;
        });
    };

    const updateBlock = (moduleIndex, blockIndex, field, value) => {
        setModules(prev => {
            const updated = [...prev];
            updated[moduleIndex].blocks[blockIndex][field] = value;
            return updated;
        });
    };

    const removeBlock = (moduleIndex, blockIndex) => {
        setModules(prev => {
            const updated = [...prev];
            updated[moduleIndex].blocks.splice(blockIndex, 1);
            return updated;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ courseData, modules });
        alert("Course uploaded! Check console for data.");
    };

    return (
        <div style={{padding:"20px", display:'flex', flexDirection:'column', gap:'20px'}}>
            <h2>Upload New Course</h2>
            <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'20px', fontSize:'15px'}}>
                
                {/* COURSE FIELDS */}
                <div style={{display:'flex', flexWrap:'wrap', gap:'20px'}}>
                    <div style={{flex:'1 1 200px', display:'flex', flexDirection:'column'}}>
                        <label>Course Number</label>
                        <input type="text" value={courseData.number} onChange={(e)=>updateCourseData("number", e.target.value)} style={{padding:'10px', borderRadius:'5px', border:'1px solid #ccc'}}/>
                    </div>
                    <div style={{flex:'2 1 300px', display:'flex', flexDirection:'column'}}>
                        <label>Course Name</label>
                        <input type="text" value={courseData.name} onChange={(e)=>updateCourseData("name", e.target.value)} style={{padding:'10px', borderRadius:'5px', border:'1px solid #ccc'}}/>
                    </div>
                    <div style={{flex:'1 1 200px', display:'flex', flexDirection:'column'}}>
                        <label>Start Date</label>
                        <input type="date" value={courseData.startDate} onChange={(e)=>updateCourseData("startDate", e.target.value)} style={{padding:'10px', borderRadius:'5px', border:'1px solid #ccc'}}/>
                    </div>
                </div>

                <div style={{display:'flex', flexDirection:'column'}}>
                    <label>Course Description</label>
                    <textarea rows={3} value={courseData.description} onChange={(e)=>updateCourseData("description", e.target.value)} style={{padding:'10px', borderRadius:'5px', border:'1px solid #ccc'}}/>
                </div>

                <div style={{display:'flex', flexDirection:'column'}}>
                    <label>About the Course</label>
                    <textarea rows={3} value={courseData.about} onChange={(e)=>updateCourseData("about", e.target.value)} style={{padding:'10px', borderRadius:'5px', border:'1px solid #ccc'}}/>
                </div>

                <div style={{display:'flex', flexDirection:'column'}}>
                    <label>Hint for the Course</label>
                    <textarea rows={2} value={courseData.hint} onChange={(e)=>updateCourseData("hint", e.target.value)} style={{padding:'10px', borderRadius:'5px', border:'1px solid #ccc'}}/>
                </div>

                <div style={{display:'flex', flexWrap:'wrap', gap:'20px'}}>
                    <div style={{flex:'1 1 200px', display:'flex', flexDirection:'column'}}>
                        <label>Target Audience</label>
                        <input type="text" value={courseData.targetAudience} onChange={(e)=>updateCourseData("targetAudience", e.target.value)} style={{padding:'10px', borderRadius:'5px', border:'1px solid #ccc'}}/>
                    </div>
                    <div style={{flex:'1 1 200px', display:'flex', flexDirection:'column'}}>
                        <label>Course Duration</label>
                        <input type="text" value={courseData.duration} onChange={(e)=>updateCourseData("duration", e.target.value)} style={{padding:'10px', borderRadius:'5px', border:'1px solid #ccc'}}/>
                    </div>
                    <div style={{flex:'1 1 200px', display:'flex', flexDirection:'column'}}>
                        <label>Course Picture</label>
                        <input type="file" onChange={(e)=>updateCourseData("picture", e.target.files[0])} style={{padding:'10px', borderRadius:'5px', border:'1px solid #ccc'}}/>
                        {courseData.picture && <div style={{marginTop:"5px", fontStyle:"italic"}}>File Selected: {courseData.picture.name}</div>}
                    </div>
                </div>

                {/* MODULES */}
                <div style={{marginTop:"30px"}}>
                    <h3>Course Modules</h3>
                    {modules.map((module, index) => (
                        <div key={index} style={{border: "1px solid #aaa", padding: "15px", background: "#f7f7f7", borderRadius: "6px", marginBottom: "20px"}}>
                            <div style={{display:"flex", justifyContent:"space-between"}}>
                                <h4 style={{margin:0}}>Module {index + 1}</h4>
                                <button type="button" onClick={() => removeModule(index)} style={{background: "red", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer"}}>Remove</button>
                            </div>
                            <label>Module Title</label>
                            <input type="text" placeholder="Module title" value={module.title} onChange={(e)=>updateModule(index,"title",e.target.value)} style={{width:"100%", padding:"10px", borderRadius:"5px", border:"1px solid #ccc"}}/>
                            <label>Module Description</label>
                            <textarea rows={3} placeholder="Short description" value={module.desc} onChange={(e)=>updateModule(index,"desc",e.target.value)} style={{width:"100%", padding:"10px", borderRadius:"5px", border:"1px solid #ccc"}}/>
                            <label>Module Cost (Tsh)</label>
                            <input type="number" placeholder="e.g. 23000" value={module.cost} onChange={(e)=>updateModule(index,"cost",e.target.value)} style={{width:"100%", padding:"10px", borderRadius:"5px", border:"1px solid #ccc"}}/>

                            {/* Nested Blocks */}
                            {module.blocks.map((block, bIndex) => (
                                <div key={bIndex} style={{border:"1px dashed #ccc", padding:"10px", marginTop:"10px"}}>
                                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                        <strong>Block {bIndex + 1}</strong>
                                        <button type="button" onClick={() => removeBlock(index, bIndex)} style={{color:"red"}}>Remove</button>
                                    </div>
                                    <label>Block Type</label>
                                    <select value={block.type} onChange={(e) => updateBlock(index, bIndex, "type", e.target.value)} style={{width:"100%", padding:"10px", borderRadius:"5px", border:"1px solid #ccc", background:"white"}}>
                                        <option value="paragraph">Paragraph</option>
                                        <option value="heading">Heading</option>
                                        <option value="video">Video</option>
                                    </select>

                                    {block.type === "paragraph" && (
                                        <textarea
                                            rows={3}
                                            placeholder="Enter paragraph content"
                                            value={block.content}
                                            onChange={(e)=>updateBlock(index, bIndex, "content", e.target.value)}
                                            style={{width:"100%", padding:"10px", borderRadius:"5px", border:"1px solid #ccc", marginTop:"5px"}}
                                        />
                                    )}

                                    {block.type === "heading" && (
                                        <input
                                            type="text"
                                            placeholder="Enter heading text"
                                            value={block.content}
                                            onChange={(e)=>updateBlock(index, bIndex, "content", e.target.value)}
                                            style={{width:"100%", padding:"10px", borderRadius:"5px", border:"1px solid #ccc", marginTop:"5px"}}
                                        />
                                    )}

                                    {block.type === "video" && (
                                        <input
                                            type="file"
                                            onChange={(e)=>updateBlock(index, bIndex, "file", e.target.files[0])}
                                            style={{width:"100%", padding:"10px", borderRadius:"5px", border:"1px solid #ccc", background:"white", marginTop:"5px"}}
                                        />
                                    )}
                                    {block.file && (<div style={{marginTop:"5px", color:"#333", fontStyle:"italic"}}>File Uploaded: {block.file.name}</div>)}
                                </div>
                            ))}
                            <div style={{marginTop:"10px", display:'flex', gap:'10px'}}>
                                <button type="button" onClick={() => addBlock(index, "paragraph")} style={{background:"#0d6efd", color:"white", padding:"5px 10px", border:"none", borderRadius:"5px", cursor:"pointer"}}>+ Add Paragraph</button>
                                <button type="button" onClick={() => addBlock(index, "heading")} style={{background:"#0d6efd", color:"white", padding:"5px 10px", border:"none", borderRadius:"5px", cursor:"pointer"}}>+ Add Heading</button>
                                <button type="button" onClick={() => addBlock(index, "video")} style={{background:"#0d6efd", color:"white", padding:"5px 10px", border:"none", borderRadius:"5px", cursor:"pointer"}}>+ Add Video</button>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={addModule} style={{background:"#0d6efd", color:"white", padding:"10px 15px", border:"none", borderRadius:"5px", cursor:"pointer", marginTop:"10px"}}>+ Add Module</button>
                </div>

                {/* SUBMIT */}
                <div style={{marginTop:"20px"}}>
                    <button type="submit" style={{background:'#0c2b4eef', color:"white", padding:"12px 20px", border:"none", borderRadius:"5px", fontSize:"16px", cursor:"pointer"}}>Submit Course</button>
                </div>
            </form>
        </div>
    )
}

// DASHBOARD
function Dashboard() {
    return (<div style={{height:'600px'}}>Dashboard</div>)
}

// USER MANAGER
function UserManager() {
    return (<div style={{height:'600px'}}>Form to manage user account</div>)
}
