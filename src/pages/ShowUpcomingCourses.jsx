import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg"
import MwangazaLogo from '../assets/MwangazaLogo.jpg';
import { BsFacebook, BsLinkedin, BsWhatsapp } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
import { useEffect, useState } from "react";

export default function ShowUpcomingCourses(){
    const navigateTo = useNavigate();
    const [upcomingCourses, setUpcomingCourses] = useState([]);
    
    async function FetchAllUpcomingCourses() {
      const formData = new FormData();

      const res = await fetch(
        "https://www.tanzcoffee.co.tz/mwangaza-backend/show_upcoming_courses.php",
        { method: "POST", body: formData }
      );

      if (res.ok) {
        const data = await res.json();
        setUpcomingCourses(data.courses);
      }
    }

    useEffect(() => {
      FetchAllUpcomingCourses();
    }, []);
    
    return(
        <div style={{minHeight:'100vh'}}>
            {/* Top nav bar */}
            <div style={{position:'relative', top:0, left:0, width:'100%', height:'fit-content',minHeight:'80px', backgroundColor:'#0C2B4E',color:'white',zIndex:1, display:'flex', justifyContent:'space-between',padding:'0px 15px', alignItems:'center', flexWrap:'wrap', gap:'15px'}}>
                <div style={{display:'flex',gap:'10px',height:'fit-content', alignItems:'center'}}>
                    <img src={MwangazaLogo} alt="logo"                      
                    width={'60px'} height={'60px'} 
                    style={{borderRadius:'50%'}} />
                <span style={{fontSize:'17px', fontWeight:600, textAlign:'center'}}> MWANGAZA BUSINESS & INVESTMENT SCHOOL</span>
                </div>
                <div style={{display:'flex', gap:'50px', fontSize:'18px',fontWeight:500}}> <span style={{cursor:'pointer'}} onClick={()=>{navigateTo('/about')}}>About Us </span> <span style={{cursor:'pointer'}} onClick={()=>{navigateTo('/view_all_courses')}}>View All Courses</span> 
                </div>
            </div>
            
            <div style={{minHeight:'50vh',padding:'30px 10px', display:'flex', flexDirection:'column', gap:'40px'}}>
                <div onClick={()=>(navigateTo('/'))} style={{display:'flex', alignItems:'center', gap:'6px', cursor:'pointer'}}>
                    <span style={{fontSize:'16px', borderRadius:"5px", backgroundColor:"rgba(138, 146, 205, 1)", padding:"8px 14px"}}><IoMdHome/></span>
                    <span>Return back to home page</span>
                </div>
            {upcomingCourses? upcomingCourses?.map((course, index)=>(
                <div key={index} style={{display:'flex',flexWrap:'wrap', gap:'20px', maxWidth:'800px', boxShadow:'1px 2px 10px rgba(60, 58, 58, 0.7)'}}>
                    <span style={{aspectRatio:16/9,width:'100%',maxWidth:'350px'}}>
                        <img src={course?.pic ? course?.pic : logo} alt="pic" width={"100%"} height={"100%"} style={{objectFit:'cover', }}/>
                    </span>
                    <div style={{fontSize:"18px", fontWeight:700, width:'100%', maxWidth:"400px", display:"flex", justifyContent:'space-around', flexDirection:'column'}}>
                        <span>
                            {course.name}
                        </span>
                        <span style={{fontSize:"16px", fontWeight:300}}>
                            {course.desc}
                        </span>
                    </div>
                </div>
            )) : ""
            }
            </div>
            <Footer/>
        </div>
    )
}

function Footer(){
    const navigateTo = useNavigate();
  return(
    <div style={{backgroundColor:'#0C2B4E', display:'flex', flexWrap:'wrap', color:'white', padding:'30px', justifyContent:'space-around', gap:'40px'}}>
      <div style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'30%', minWidth:'300px', gap:'20px'}}>
        <div style={{display:'flex',gap:'5px', flexDirection:'column', justifyContent:'center'}}>
          <span style={{display:'block',left:'95px', position:'relative'}}>
            <img src={MwangazaLogo} alt="logo" width={'60px'} height={'auto'} style={{aspectRatio:1/0.95, borderRadius:'50%'}} />
          </span>
          <span style={{fontSize:'22px', fontWeight:500}}> MWANGAZA BUSINESS & INVESTMENT SCHOOL</span>
        </div>
        <div>
          Philanthropy University is an online learning platform  for social impact organizations.
        </div>
        <div style={{display:"flex", gap:'15px'}}>
          <span><BsFacebook/></span>
          <span><BsWhatsapp/></span>
          <span><BsLinkedin/></span>
        </div>
      </div>

      <div style={{display:'flex', flexDirection:'column',width:'30%', minWidth:'300px', gap:'20px'}}>
        <div style={{display:'flex',gap:'5px', flexDirection:'column',}}>
          <span style={{fontSize:'22px', fontWeight:500}}>Quick links</span>
        </div>
        <div style={{display:'flex', gap:'15px', flexDirection:'column'}}>
          <span style={{cursor:'pointer'}} onClick={()=>{navigateTo('/about')}}>About Us</span>
          <span>Terms Of Use</span>
          <span>Privacy</span>
        </div>
      </div>

      <div style={{display:'flex', flexDirection:'column', width:'30%', minWidth:'300px', gap:'20px'}}>
        <div style={{display:'flex',gap:'5px', flexDirection:'column', justifyContent:'center'}}>
          <span style={{fontSize:'22px', fontWeight:500}}>Company</span>
        </div>
        <div style={{display:'flex', gap:'15px', flexDirection:'column'}}>
          <span>Courses</span>
        </div>
      </div>

    </div>
  )
}