import React, { useContext, useEffect, useState } from 'react'
import { BiLogOut, BiSearchAlt2, BiSolidSearchAlt2 } from 'react-icons/bi'
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs'
import { FaUserEdit, FaUserMd } from 'react-icons/fa'
import { MdPendingActions } from 'react-icons/md'
import { PiArrowLineRight, PiBookOpenUser } from 'react-icons/pi'
import { RiDeleteBin5Fill, RiFileCheckFill } from 'react-icons/ri'
import { TbLogout } from 'react-icons/tb'
import AI_Gen_2 from "../../assets/AI Gen 2.webp";
import { replace, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../AuthProvider'

export default function DashboardPage({setActive,active}) {
  const {userData, setUserData} = useContext(AuthContext);

  return (
    <div style={{padding:'15px',display:'flex', gap:'20px', flexDirection:'column'}}>
      <QuickActions active={active} setActive={setActive} userData={userData} setUserData={setUserData}/>
      <CoursesDetails />
    </div>
  )
}

function QuickActions({setActive,active, userData, setUserData}){
  const navigate = useNavigate();

  async function LogoutHandler() {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUserData(null);
      // Redirect to login
      navigate("/auth/sign_in", { replace: true });
      alert("You have successfully logget out ");
    } catch (err) {
      console.error("Logout error:", err);
      alert("Failed to logout. Please try again.");
    }
  }

async function DeleteAccount() {
  try {
    const formData = new FormData();
    formData.append("user_id", userData.user_id);
    formData.append("token", localStorage.getItem("token"));

// Get token from localStorage
const token = localStorage.getItem("token");

// Split the JWT into its 3 parts
const payloadBase64 = token.split('.')[1]; // middle part is payload

// Decode base64
const decodedPayload = JSON.parse(atob(payloadBase64));

console.log("Decoded token payload:", decodedPayload);


    const res = await fetch(
      "https://www.tanzcoffee.co.tz/mwangaza-backend/delete_account.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserData(null);
    alert(data.message);s
  } catch (e) {
    console.error(e);
  }
}
// Get token from localStorage
const token = localStorage.getItem("token");

// Split the JWT into its 3 parts
const payloadBase64 = token.split('.')[1]; // middle part is payload

// Decode base64
const decodedPayload = JSON.parse(atob(payloadBase64));

console.log("Decoded token payload:", decodedPayload);
console.log("user id "+userData.user_id);
  return(
    <div style={{boxShadow:'1px 2px 20px rgba(100,100,100,0.6)', borderRadius:'5px', padding:'15px', display:'flex', flexWrap:'wrap', gap:'20px', fontSize:'13px'}}>
      
      <div style={{display:'flex', alignItems:'center', padding:'10px', gap:'6px',boxShadow:'1px 1px 20px rgba(100,100,100,0.6)', borderRadius:'5px', cursor:'pointer', width:'100%', maxWidth:'160px'}}
      onClick={()=>{setActive('User Account')}}>
        <span style={{fontSize:'16px',backgroundColor:'rgba(153, 153, 241, 1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', color:'rgba(9, 18, 87, 1)'}}><FaUserEdit/></span>
        <span>My Profile</span>
      </div>

      <div style={{display:'flex', alignItems:'center', padding:'10px', gap:'6px',boxShadow:'1px 1px 20px rgba(100,100,100,0.6)', borderRadius:'5px', cursor:'pointer', width:'100%', maxWidth:'160px'}}
      onClick={LogoutHandler}>
        <span style={{fontSize:'16px',backgroundColor:'rgba(138, 236, 141, 1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', color:'rgba(1, 80, 35, 1)'}}><TbLogout/></span>
        <span>Logout</span>
      </div>

      <div style={{display:'flex', alignItems:'center', padding:'10px', gap:'6px',boxShadow:'1px 1px 20px rgba(100,100,100,0.6)', borderRadius:'5px', cursor:'pointer', width:'100%', maxWidth:'160px'}}
      onClick={DeleteAccount}>
        <span style={{fontSize:'16px',backgroundColor:'rgba(248, 133, 133, 1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', color:'rgba(80, 1, 1, 1)'}}><RiDeleteBin5Fill/></span>
        <span>Delete Account</span>
      </div>
    </div>
  )
}

function CoursesDetails(){
  const {userData} = useContext(AuthContext); 
  const [completedCourses, setCompletedCourses] = useState([]);
  const [inProgressCourses, setInProgressCourses] = useState([]);
  const navigateTo = useNavigate(); 

  useEffect(()=>{
    async function FetchCourses() {
      const formData = new FormData();
      formData.append('user_id', userData.user_id);
      
      const res = await fetch('https://www.tanzcoffee.co.tz/mwangaza-backend/courses_details.php',{
        method:"POST",
        body:formData
      });

      if(res.ok){
        const data = await res.json();
        setCompletedCourses(data.completed_courses);
        setInProgressCourses(data.in_progress_courses);
        console.log(data);
      }
      else{
        alert("Failed to fetch courses details");
      }
    }
    FetchCourses();
  },[]);
  const userCourses=[
    {
      name:'Chemical bonding'
    },
    {
      name:'Biechemical processing'
    },
    {
      name:'Trading skills'
    },
    {
      name:'How to become successful founder'
    },
    {
      name:'Lets glow the torch'
    },
  ]
  return(
    <div style={{boxShadow:'1px 2px 20px rgba(100,100,100,0.6)', borderRadius:'5px', padding:'15px', display:'flex', flexWrap:'wrap', gap:'20px', fontSize:'13px'}}>  
    {/**COMPLETED */} 
      <div style={{display:'flex', flexDirection:'column',alignItems:'center', padding:'15px', gap:'10px',boxShadow:'1px 1px 20px rgba(100,100,100,0.6)', borderRadius:'5px', flex:'1 1 900px',position:'relative',}}>
        <span style={{fontSize:'21px',backgroundColor:"#F4B342",borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', color:'rgba(81, 48, 1, 1)'}}><RiFileCheckFill/></span>
        <span style={{fontSize:'18px',fontWeight:500, display:'flex', gap:'6px', alignItems:'center', paddingBottom:'20px'}}>
          Completed Courses 
          <span style={{fontSize:'20px',fontWeight:500,padding:'3px 13px', boxShadow:'1px 0.5px 3px rgba(56, 55, 55, 1)', borderRadius:'50%',display:'block', height:'fit-content',}}>
            {completedCourses?.length}
          </span>
        </span>
        <span style={{display:'flex', height:'30px', position:'absolute',top:'70px', right:'10px'}}>
          <input type='search'name='search'/>
          <span style={{display:'flex',backgroundColor:'rgba(13, 136, 138, 1)', color:'white', fontSize:'19px', justifyContent:'center', alignItems:'center', padding:'6px 7px', cursor:'pointer'}}><BiSearchAlt2/></span>
        </span>
        <div style={{width:'100%', display:'flex', gap:"15px", flexDirection:'column' }}>

      {/** ---------- PRINT COMPLETED COURSES HERE ------------------ */}
          {completedCourses && completedCourses?.map((course, index)=>(
            <div key={index} style={{flexWrap:'wrap',display:'flex', gap:'7px',boxShadow:'1px 2px 20px rgba(44, 43, 43, 0.6)', borderRadius:'5px',
            maxWidth:'900px',
            }}>
              <img src={AI_Gen_2} alt="pic" style={{width:'40%', maxWidth:'250px', aspectRatio:16/9, objectFit:'cover'}}/>
              <div style={{flex:'1 1 160px',display:'flex', flexDirection:'column', justifyContent:'space-between',padding:'20px 10px'}}>
                <span style={{fontSize:'18px', fontWeight:700}}>{course.name}</span>
                <span style={{cursor:'pointer', display:'flex', gap:'5px', alignItems:'center', justifyContent:'space-between'}}>
                  <span style={{display:'flex', flexDirection:'column',gap:'10px'}}>
                    <span>{course.description}</span> 
                    <span style={{fontWeight:700, fontSize:'15px'}}>
                      started at {course.start_date}
                    </span>
                  </span>
                  <span style={{border:'1px solid rgba(13, 136, 138, 1)',padding:'3px', borderRadius:'5px', fontWeight:700, width:'140px', textAlign:'center', color:'rgba(13, 136, 138, 1)'}}
                  onClick={()=>{navigateTo(`/enroll_course/${course.id}`, {replace:true})}}>
                    Re-read this Course
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    {/** ---------------- IN_PROGRESS ------------------------ */}
      <div style={{display:'flex', flexDirection:'column',alignItems:'center', padding:'15px', gap:'10px',boxShadow:'1px 1px 20px rgba(100,100,100,0.6)', borderRadius:'5px', flex:'1 1 900px',position:'relative',}}>
        <span style={{fontSize:'21px',backgroundColor:"#F4B342",borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', color:'rgba(81, 48, 1, 1)'}}><MdPendingActions/></span>
        <span style={{fontSize:'18px',fontWeight:500, display:'flex', gap:'6px', alignItems:'center', paddingBottom:'20px'}}>
          In-Progress Courses 
          <span style={{fontSize:'20px',fontWeight:500,padding:'3px 13px', boxShadow:'1px 0.5px 3px rgba(56, 55, 55, 1)', borderRadius:'50%',display:'block', height:'fit-content',}}>
            {inProgressCourses?.length}
          </span>
        </span>
        <span style={{display:'flex', height:'30px', position:'absolute', top:'70px', right:'10px'}}>
          <input type='search'name='search'/>
          <span style={{display:'flex',backgroundColor:'rgba(13, 136, 138, 1)', color:'white', fontSize:'19px', justifyContent:'center', alignItems:'center', padding:'6px 7px', cursor:'pointer'}}><BiSearchAlt2/></span>
        </span>
        <div style={{width:'100%', display:'flex', gap:"15px", flexDirection:'column' }}>

        {/** INPROGRESS COURSES LOOP */}
          {inProgressCourses && inProgressCourses?.map((course, index)=>(
            <div key={index} style={{flexWrap:'wrap',display:'flex', gap:'7px',boxShadow:'1px 2px 20px rgba(44, 43, 43, 0.6)', borderRadius:'5px',
            maxWidth:'900px',
            }}>
              <img src={AI_Gen_2} alt="pic" style={{width:'40%', maxWidth:'250px', aspectRatio:16/9, objectFit:'cover'}}/>
              <div style={{flex:'1 1 160px',display:'flex', flexDirection:'column', justifyContent:'space-between',padding:'20px 10px'}}>
                <span style={{fontSize:'18px', fontWeight:700}}>{course.name}</span>
                <span style={{cursor:'pointer', display:'flex', gap:'5px', alignItems:'center', justifyContent:'space-between'}}>
                  <span style={{display:'flex', flexDirection:'column',gap:'10px'}}>
                    <span>{course.description}</span> 
                    <span style={{fontWeight:700, fontSize:'15px'}}>
                      started at {course.start_date}
                    </span>
                  </span>
                  <span style={{fontWeight:700, fontSize:'15px'}}>Un-Enrolled Course</span>
                  <span style={{border:'1px solid rgba(13, 136, 138, 1)',padding:'3px', borderRadius:'5px', fontWeight:700, width:'140px', textAlign:'center', color:'rgba(13, 136, 138, 1)'}}
                  onClick={()=>{navigateTo(`/enroll_course/${course.id}`, {replace:true})}}>
                    Resume Course
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}