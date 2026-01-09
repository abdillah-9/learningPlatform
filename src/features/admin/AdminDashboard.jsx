import React, { useContext, useEffect, useState } from 'react'
import { BiLogOut, BiSearchAlt2, BiSolidSearchAlt2 } from 'react-icons/bi'
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs'
import { FaUser, FaUserEdit, FaUserMd, FaUserSlash } from 'react-icons/fa'
import { MdOutlineDocumentScanner, MdPendingActions } from 'react-icons/md'
import { PiArrowLineRight, PiBookOpenUser } from 'react-icons/pi'
import { RiDeleteBin5Fill, RiFileCheckFill } from 'react-icons/ri'
import { TbLogout } from 'react-icons/tb'
import { replace, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../AuthProvider'
import { HiMiniUsers, HiOutlineClipboardDocumentCheck, HiOutlineClipboardDocumentList } from 'react-icons/hi2'
import logo from '../../assets/logo.jpg';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner'

export default function AdminDashboard({setActive,active}) {
  const {userData, setUserData} = useContext(AuthContext);
  const decodeHTML = (encoded) => {
    try {
      return decodeURIComponent(escape(atob(encoded)));
    } catch {
      return encoded; // fallback for old DB rows
    }
  };

  return (
    <div style={{padding:'15px',display:'flex', gap:'20px', flexDirection:'column'}}>
      <QuickActions active={active} setActive={setActive} userData={userData} setUserData={setUserData}/>
      <UsersActions/>
      <CoursesActions decodeHTML={decodeHTML}/>
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

      <div style={{display:'none', alignItems:'center', padding:'10px', gap:'6px',boxShadow:'1px 1px 20px rgba(100,100,100,0.6)', borderRadius:'5px', cursor:'pointer', width:'100%', maxWidth:'160px'}}
      onClick={DeleteAccount}>
        <span style={{fontSize:'16px',backgroundColor:'rgba(248, 133, 133, 1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', color:'rgba(80, 1, 1, 1)'}}><RiDeleteBin5Fill/></span>
        <span>Delete Account</span>
      </div>

      {/** MANAGE COURSES */}
      <div style={{display:'flex', alignItems:'center', padding:'10px', gap:'6px',boxShadow:'1px 1px 20px rgba(100,100,100,0.6)', borderRadius:'5px', cursor:'pointer', width:'100%', maxWidth:'200px'}}
      onClick={()=>{setActive('Available Courses')}}>
        <span style={{fontSize:'16px',backgroundColor:'rgba(250, 244, 128, 1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', color:'rgba(82, 87, 9, 1)'}}><HiOutlineClipboardDocumentCheck/></span>
        <span>Manage Available Courses</span>
      </div>

      <div style={{display:'flex', alignItems:'center', padding:'10px', gap:'6px',boxShadow:'1px 1px 20px rgba(100,100,100,0.6)', borderRadius:'5px', cursor:'pointer', width:'100%', maxWidth:'200px'}}
      onClick={()=>{setActive('Upcoming Courses')}}>
        <span style={{fontSize:'16px',backgroundColor:'rgba(225, 153, 241, 1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', color:'rgba(86, 9, 87, 1)'}}><HiOutlineClipboardDocumentList/></span>
        <span>Manage Upcoming Courses</span>
      </div>
    </div>
  )
}

function UsersActions(){
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    async function FetchAllUsers(){
     const formData = new FormData();
     
    try{
      setLoading(true)
     const res = await fetch('https://www.tanzcoffee.co.tz/mwangaza-backend/fetch_all_students.php',{
      method:'POST',
      body:formData,
     });

     if(res.ok){
      const data = await res.json();
      setStudents(data.users);
      //alert(data.message);
     }
     else{
      alert('Failed to fetch users');
     }
    }
    catch(e){
      console.log(e);
    }
    finally{
      setLoading(false);
    }
  }
  FetchAllUsers();
  },[]);

  async function DeleteStudent(student) {
    const student_id = student.id;
    const formData = new FormData();
    formData.append('student_id', student_id);
     const res = await fetch('https://www.tanzcoffee.co.tz/mwangaza-backend/delete_students.php',{
      method:'POST',
      body:formData,
     });

    if (res.ok) {
      const data = await res.json();

      setStudents(prev =>
        prev.filter(s => s.id !== student_id)
      );

      alert(data.message);
      alert(student)
    }

    else{
      alert('Failed to delete student');
     } 
  }

  async function BlockStudent(student){
    const fData = new FormData();
    fData.append('student_id', student.id);

    const res = await fetch('https://www.tanzcoffee.co.tz/mwangaza-backend/block_students.php',{
      method:'POST',
      body:fData,
     });

    if (res.ok) {
      const data = await res.json();

    setStudents(prev =>
      prev.map(s =>
        s.id === student.id
          ? { ...s, status: data.new_status }
          : s
      )
    );

      alert(data.message);
    }

    else{
      alert('Failed to delete student');
     } 
  }

  if(loading){
    return <MiniLoadingSpinner/>
  }
  return(
    <div style={{boxShadow:'1px 2px 20px rgba(100,100,100,0.6)', borderRadius:'5px', padding:'15px', display:'flex', flexWrap:'wrap', gap:'20px', fontSize:'13px',maxHeight:"500px", overflow:'auto'}}>
      {/** USER TITLES */}
       <div style={{width:'100%'}}>

        {/** Total students */}
        <div style={{width:'fit-content', display:'flex', alignItems:'center', justifyContent:'center', gap:'7px'}}>
          <span style={{padding:"10px 10px", display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'50%', backgroundColor:"#eebd3e", color:"#905b00ff", width:'fit-content'}}>
            <HiMiniUsers/>
          </span>
          <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
            <span style={{fontWeight:700, fontSize:'17px'}}>Total Students</span>
            <span style={{fontSize:'17px', fontWeight:700, color:'rgba(67, 66, 66, 0.84)'}}>{students?.length}</span> 
          </div>
        </div>

        {/** Active students (students who have read atlest one course) */}
       </div>

       {/** USER MANAGE-USERS **/}
       <div style={{display:'flex', flexWrap:'wrap', gap:"15px", justifyContent:'space-between', flexDirection:'column'}}>
        {
          students? students.map((std,index)=>(
            <div style={{display:'flex', flexWrap:'wrap', gap:'10px', alignItems:'center', fontSize:'15px', fontWeight:600,
              borderBottom:"1px solid rgba(100,100,100,0.6)",
              paddingBottom:'8px',width:'100%'
            }}
              key={std.id}
            >
              <img 
              src={`https://www.tanzcoffee.co.tz/mwangaza-backend/uploads/users/${std.user_pic}`}
                   alt='user_pic'
                   style={{width:'65px', aspectRatio:1/0.9, objectFit:'cover', borderRadius:'50%'}}
              />
              <span style={{fontSize:"17px", width:'120px'}}>
                {std.phone_number}
              </span>
              <span style={{color:'rgba(100,100,100,0.6)', fontWeight:500, minWidth:'100px'}}>
                {std.user_role}
              </span>
              <span style={{color:'rgba(100,100,100,0.6)', fontWeight:500, minWidth:'100px'}}>
                ID_{std.id}
              </span>
              {/** Delete std */}
              <div style={{display:'flex', alignItems:'center', padding:'7px 10px', gap:'6px',boxShadow:'0.5px 2px 5px rgba(100,100,100,0.6)', borderRadius:'5px', cursor:'pointer'}}
              onClick={()=>{DeleteStudent(std)}}
              >
                <span style={{fontSize:'14px',backgroundColor:'rgba(248, 133, 133, 1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:'8px', color:'rgba(80, 1, 1, 1)'}}>
                  <RiDeleteBin5Fill/>
                </span>
                <span>Delete Account</span>
              </div>

              {/** Block std */}
              <div style={{display:'flex', alignItems:'center', padding:'7px 10px', gap:'6px',boxShadow:'0.5px 2px 5px rgba(100,100,100,0.6)', borderRadius:'5px', cursor:'pointer'}}
              onClick={()=>{BlockStudent(std)}}
              >
                <span style={{fontSize:'14px',backgroundColor:'rgba(139, 245, 255, 1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:'8px', color:'rgba(1, 80, 70, 1)'}}>
                  {
                    std?.status == 'active' ? <FaUser/> : <FaUserSlash/>
                  }
                </span>
                <span>
                  {
                    std?.status == 'active' ? 'Deactivate' : 'Activate'
                  }
                </span>
              </div>
            </div>
          )) : ""
        }
       </div>
    </div>
  )
}

function CoursesActions({decodeHTML}){
  const navigateTo = useNavigate();
  const [coursesStats, setcoursesStats] = useState([]);
  useEffect(()=>{
    async function FetchCoursesStats(){
     const formData = new FormData();

     const res = await fetch('https://www.tanzcoffee.co.tz/mwangaza-backend/fetch_all_coursesStats.php',{
      method:'POST',
      body:formData,
     });

     if(res.ok){
      const data = await res.json();
      setcoursesStats(data.courses);
      //alert(data.message);
     }
     else{
      alert('Failed to fetch users');
     }
  }
  FetchCoursesStats();
  },[]);

  return(
    <div style={{display:'flex', flexDirection:'column', gap:'15px', marginTop:'30px', maxHeight:'500px', overflow:'auto', boxShadow:'1px 0.5px 7px rgba(68, 67, 67, 0.81)', borderRadius:'5px', padding:'14px'}}>
      <h2 style={{marginBottom:'20px'}}>Courses Statistics</h2>
      {
        coursesStats? coursesStats?.map((courseStat, index)=>(
        <div key={courseStat.id} style={{display:'flex', gap:'15px', flexWrap:'wrap', alignItems:'center', borderBottom:'1px solid rgba(98, 98, 98, 0.69)', paddingBottom:'15px'}}>
          {/** Pic */}
          <img src={ courseStat?.picture ? `https://www.tanzcoffee.co.tz/mwangaza-backend/${courseStat.picture}`: logo} alt='course_picture' width={"200px"} style={{aspectRatio:16/9, objectFit:'cover'}} />
          <div style={{display:'flex',flexDirection:'column', flex:'1 1 400px'}}>
            {/** Name/Title */}
            <span style={{fontSize:'16px', fontWeight:700}}>
              {courseStat.title+"    ID_"+courseStat.id}
            </span>
            {/** Desc */}
            <span  style={{fontSize:'13px', fontWeight:700, color:'rgba(61, 60, 60, 0.75)'}} dangerouslySetInnerHTML={{__html: decodeHTML(courseStat.description)}}>{}</span>
          </div>
          {/** STudents number accessed it */}
          <div style={{display:'flex',flexDirection:'column', flex:'1 1 400px', gap:'15px'}}>
            <div style={{display:'flex', gap:'7px', alignItems:'center'}}> 
              <span style={{fontSize:'16px', fontWeight:700}}>{courseStat.students_accessed}</span> 
              <span style={{fontSize:'13px', fontWeight:600}}>students opened</span>
            </div>
            <div onClick={()=>{navigateTo(`/enroll_course/${courseStat.id}`)}} style={{boxShadow:"1px 0.4px 10px rgba(46, 46, 46, 0.84)", padding:'7px', borderRadius:'5px', width:'fit-content', cursor:'pointer', display:'flex', gap:"7px", alignItems:'center'}}>
              <span style={{fontSize:'15px', padding:'12px 9px', boxShadow:"1px 1px 10px rgba(60, 60, 60, 0.76)"}}><MdOutlineDocumentScanner/></span>
              <span style={{fontSize:'14px', fontWeight:700}}>Open course</span>
            </div>
          </div>

          {/* COURSE MODULES */}
          <div style={{display:'flex', flexDirection:'column', gap:'6px'}}>
            {courseStat.modules?.map((module, i) => (
              <div
                key={module.id}
                style={{
                  display:'flex',
                  justifyContent:'space-between',
                  padding:'8px 10px',
                  background:'rgba(0,0,0,0.04)',
                  borderRadius:'4px',
                  fontSize:'13px',
                  gap:'12px',
                }}
              >
                <span>
                  {i + 1}. {module.title}
                </span>
                <span>ID_{module.id}</span>
                <span style={{fontWeight:600}}>
                  {module.students_accessed} students
                </span>
              </div>
            ))}
          </div>

        </div>
      )) :""
      }
    </div>
  )
}