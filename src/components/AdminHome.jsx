import { useState } from "react";
import MwangazaLogo from '../assets/MwangazaLogo.jpg';
import userPic from '../assets/Sospeter.webp';
import { RiHome9Line } from "react-icons/ri";
import { PiBookOpenTextFill, PiBookOpenTextLight } from "react-icons/pi";
import { HiHome, HiUser } from "react-icons/hi2";
import { FaBookReader } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";

export default function AdminHome() {
const [active, setActive] = useState("courses"); // default active link
// Helper to render main content
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

    return(
        <div style={{display:'flex', flexWrap:'wrap'}}>
            <TopNavBar/>
            <SideBar active={active} setActive={setActive}/>
            <div style={{flexGrow:1, width:'calc(100% - 200px)'}}>
                {renderContent()}
            </div>
        </div>
    )
}

//Side bar with active link logic
function SideBar({active, setActive}){

  return(
    <div style={{backgroundColor:'#F4B342', width:'200px', display:'flex', flexDirection:'column', gap:'20px', padding:'25px 0px 0px 15px'}}>
        
        {/* Dashboard Link */}
        <div 
            onClick={() => setActive("dashboard")}
            style={{
                borderRadius:'30px 0px 0px 30px',
                padding:'5px',
                display:'flex', 
                gap:'7px', 
                alignItems:'center', 
                fontSize:'13.5px',
                cursor:'pointer',
                backgroundColor: active === "dashboard" ? 'white' : 'transparent'
            }}
        >
            <span style={{
                padding:'7px 11px', 
                borderRadius:'50%', 
                backgroundColor: active === "dashboard" ? '#F4B342' : 'black', 
                color: active === "dashboard" ? 'black' : '#F4B342'
            }}>
                <HiHome style={{fontSize:'16px'}}/>
            </span>
            <span style={{color: active === "dashboard" ? '#835912ff' : '#000000ff'}}>Dashboard</span>
        </div>

        {/* User Management Link */}
        <div 
            onClick={() => setActive("users")}
            style={{
                borderRadius:'30px 0px 0px 30px',
                padding:'5px',
                display:'flex', 
                gap:'7px', 
                alignItems:'center', 
                fontSize:'13.5px',
                cursor:'pointer',
                backgroundColor: active === "users" ? 'white' : 'transparent'
            }}
        >
            <span style={{
                padding:'7px 11px', 
                borderRadius:'50%', 
                backgroundColor: active === "users" ? '#F4B342' : 'black', 
                color: active === "users" ? 'black' : '#F4B342'
            }}>
                <HiUser style={{fontSize:'16px'}}/>
            </span>
            <span style={{color: active === "users" ? '#835912ff' : '#000000ff'}}>User Management</span>
        </div>

        {/* Courses Management Link */}
        <div 
            onClick={() => setActive("courses")}
            style={{
                borderRadius:'30px 0px 0px 30px',
                padding:'5px',
                display:'flex', 
                gap:'7px', 
                alignItems:'center', 
                fontSize:'13.5px',
                cursor:'pointer',
                backgroundColor: active === "courses" ? 'white' : 'transparent'
            }}
        >
            <span style={{
                padding:'7px 11px', 
                borderRadius:'50%', 
                backgroundColor: active === "courses" ? '#F4B342' : 'black', 
                color: active === "courses" ? 'black' : '#F4B342'
            }}>
                <FaBookOpenReader style={{fontSize:'16px'}}/>
            </span>
            <span style={{color: active === "courses" ? '#835912ff' : '#000000ff'}}>Courses Management</span>
        </div>

    </div>
  )
}

//TOP NAV BAR
function TopNavBar(){
    return(
    <section>
        <div style={{width:'100vw', height:'fit-content',minHeight:'80px', backgroundColor:'#0C2B4E',color:'white',zIndex:1, display:'flex', justifyContent:'space-between',padding:'10px 15px', alignItems:'center', flexWrap:'wrap', gap:'15px'}}>
        <div style={{display:'flex',gap:'10px',height:'fit-content', alignItems:'center'}}>
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

//COURSE FORM MANAGEMENT

function CourseManager(){
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
        console.log({ modules });
        alert("Form submitted! Check console for module data.");
    };

    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];

    return (
        <div style={{padding:"20px", display:'flex', gap:'15px', flexDirection:'column'}}>
            <h2>Upload New Course</h2>
            <form onSubmit={handleSubmit} style={{display:'flex', flexWrap:'wrap', gap:'20px', justifyContent:'space-between', fontSize:'15px'}}>
                {/* Course Number */}
                <div style={{display:'flex', gap:'10px', alignItems:'center', width:'100%', maxWidth:'450px', border:'1px solid #ccc', justifyContent:'space-between', padding:'10px', borderRadius:'5px'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>Course Number</label>
                    <input type="text" name="course_number" placeholder="Course Number" style={{fontSize:'15px',padding:'10px 15px', border:'1px solid #ccc',borderRadius:'5px'}}/>
                </div>
                {/* Course Heading */}
                <div style={{display:'flex', gap:'10px', alignItems:'center', width:'100%', maxWidth:'450px',  border:'1px solid #ccc', justifyContent:'space-between', padding:'10px', borderRadius:'5px'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>Course Heading</label>
                    <input type="text" name="course_heading" placeholder="Course Heading" style={{fontSize:'15px',padding:'10px 15px', border:'1px solid #ccc',borderRadius:'5px'}}/>
                </div>
                {/* Course Description */}
                <div style={{display:'flex', gap:'10px', alignItems:'center', width:'100%', maxWidth:'450px', border:'1px solid #ccc', justifyContent:'space-between', padding:'10px', borderRadius:'5px'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>Course Description</label>
                    <input type="text" name="course_desc" placeholder="Course Description" style={{fontSize:'15px',padding:'10px 15px', border:'1px solid #ccc',borderRadius:'5px'}}/>
                </div>
                {/* Course Image */}
                <div style={{display:'flex', gap:'10px', alignItems:'center', width:'100%', maxWidth:'450px',  border:'1px solid #ccc', justifyContent:'space-between', padding:'10px', borderRadius:'5px'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>Course Image</label>
                    <input type="file" name="course_image" style={{fontSize:'15px',padding:'10px 15px', border:'1px solid #ccc',borderRadius:'5px'}} />
                </div>
                {/* About This Course */}
                <div style={{display:'flex', gap:'10px', width:'100%', maxWidth:'450px', border:'1px solid #ccc', flexDirection:'column', padding:'10px', borderRadius:'5px'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>About This Course</label>
                    <textarea rows={5} name="about_course" placeholder="About This Course Description" style={{fontSize:'15px',padding:'10px', border:'1px solid #ccc',borderRadius:'5px'}}></textarea>
                </div>
                {/* Who Should Take This Course */}
                <div style={{display:'flex', gap:'10px', width:'100%', maxWidth:'450px', border:'1px solid #ccc', flexDirection:'column', padding:'10px', borderRadius:'5px'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>Who Should Take This Course</label>
                    <textarea rows={5} name="who_should_take" placeholder="Who should take the course" style={{fontSize:'15px',padding:'10px', border:'1px solid #ccc',borderRadius:'5px'}}></textarea>
                </div>
                {/* Course Start Date */}
                <div style={{display:'flex', gap:'10px', alignItems:'center', width:'100%', maxWidth:'450px', border:'1px solid #ccc', justifyContent:'space-between', padding:'10px', borderRadius:'5px'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>Course Start Date</label>
                    <input type="date" name="start_date" style={{fontSize:'15px',padding:'10px 15px', border:'1px solid #ccc',borderRadius:'5px'}} defaultValue={formattedToday}/>
                </div>
                {/* Course Duration */}
                <div style={{display:'flex', gap:'10px', alignItems:'center', width:'100%', maxWidth:'450px', border:'1px solid #ccc', justifyContent:'space-between', padding:'10px', borderRadius:'5px'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>Course Duration (min)</label>
                    <input type="text" name="course_duration" placeholder="Course Duration" style={{fontSize:'15px',padding:'10px 15px', border:'1px solid #ccc',borderRadius:'5px'}} defaultValue={30} />
                </div>
                {/* Course Hint */}
                <div style={{display:'flex', gap:'10px', width:'100%', maxWidth:'450px', border:'1px solid #ccc', flexDirection:'column', padding:'10px', borderRadius:'5px'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>Course Hint</label>
                    <textarea rows={5} name="course_hint" placeholder="Hint" style={{fontSize:'15px',padding:'10px', border:'1px solid #ccc',borderRadius:'5px'}}></textarea>
                </div>

                {/* Modules */}
                <div style={{ width: "100%", marginTop: "30px" }}>
                    <h3 style={{ marginBottom: "10px" }}>Course Modules</h3>
                    {modules.map((module, index) => (
                        <div key={index} style={{border: "1px solid #aaa", padding: "15px", background: "#f7f7f7", borderRadius: "6px", marginBottom: "20px"}}>
                            <div style={{display:"flex", justifyContent:"space-between"}}>
                                <h4 style={{margin:0}}>Module {index + 1}</h4>
                                <button type="button" onClick={() => removeModule(index)} style={{background: "red", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer"}}>Remove</button>
                            </div>
                            <label style={{fontWeight:500, marginTop:10}}>Module Type</label>
                            <select value={module.type || ""} onChange={(e) => updateModule(index, "type", e.target.value)} style={{width:"100%", padding:"10px", borderRadius:"5px", border:"1px solid #ccc", background:"white"}}>
                                <option value="reading">Reading</option>
                                <option value="video">Video</option>
                            </select>
                            <label style={{fontWeight:500, marginTop:10}}>Module Title</label>
                            <input type="text" placeholder="Module title" value={module.title} onChange={(e)=>updateModule(index,"title",e.target.value)} style={{width:"100%", padding:"10px", borderRadius:"5px", border:"1px solid #ccc"}}/>
                            <label style={{fontWeight:500, marginTop:10}}>Module Description</label>
                            <textarea rows={3} placeholder="Short description" value={module.desc} onChange={(e)=>updateModule(index,"desc",e.target.value)} style={{width:"100%", padding:"10px", borderRadius:"5px", border:"1px solid #ccc"}}></textarea>
                            <label style={{fontWeight:500, marginTop:10}}>Module Content</label>
                            <textarea rows={4} placeholder="Long module content" value={module.content} onChange={(e)=>updateModule(index,"content",e.target.value)} style={{width:"100%", padding:"10px", borderRadius:"5px", border:"1px solid #ccc"}}></textarea>
                            <label style={{fontWeight:500, marginTop:10}}>Module Cost (Tsh)</label>
                            <input type="number" placeholder="e.g. 23000" value={module.cost} onChange={(e)=>updateModule(index,"cost",e.target.value)} style={{width:"100%", padding:"10px", borderRadius:"5px", border:"1px solid #ccc"}}/>
                            <label style={{fontWeight:500, marginTop:10}}>Upload Module File (optional)</label>
                            <input type="file" onChange={(e)=>updateModule(index,"file",e.target.files[0])} style={{width:"100%", padding:"10px", borderRadius:"5px", border:"1px solid #ccc", background:"white"}}/>
                            {module.file && (<div style={{marginTop:"10px", color:"#333", fontStyle:"italic"}}>File Uploaded: {module.file.name}</div>)}
                        </div>
                    ))}
                    <button type="button" onClick={addModule} style={{background:"#0d6efd", color:"white", padding:"10px 15px", border:"none", borderRadius:"5px", cursor:"pointer"}}>+ Add Module</button>
                </div>

                {/* Submit */}
                <div style={{ width:"100%", marginTop:"20px" }}>
                    <button type="submit" style={{background:'#0c2b4eef', color:"white", padding:"12px 20px", border:"none", borderRadius:"5px", fontSize:"16px", cursor:"pointer"}}>Submit Course</button>
                </div>
            </form>
        </div>
    );
}

function Dashboard(){
    return(<div style={{height:'600px'}}>Dashboard</div>)
}

function UserManager(){
    return(<div style={{height:'600px'}}>Form to manage user account</div>)
}
