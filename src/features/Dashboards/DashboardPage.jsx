import React from 'react'
import { BiLogOut, BiSearchAlt2, BiSolidSearchAlt2 } from 'react-icons/bi'
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs'
import { FaUserEdit, FaUserMd } from 'react-icons/fa'
import { MdPendingActions } from 'react-icons/md'
import { PiArrowLineRight, PiBookOpenUser } from 'react-icons/pi'
import { RiDeleteBin5Fill, RiFileCheckFill } from 'react-icons/ri'
import { TbLogout } from 'react-icons/tb'
import AI_Gen_2 from "../../assets/AI Gen 2.webp";

export default function DashboardPage({calcWidth}) {
  return (
    <div style={{padding:'15px',display:'flex', gap:'20px', flexDirection:'column'}}>
      <QuickActions/>
      <CoursesDetails />
    </div>
  )
}

function QuickActions(){
  return(
    <div style={{boxShadow:'1px 2px 20px rgba(100,100,100,0.6)', borderRadius:'5px', padding:'15px', display:'flex', flexWrap:'wrap', gap:'20px', fontSize:'13px'}}>
      
      <div style={{display:'flex', alignItems:'center', padding:'10px', gap:'6px',boxShadow:'1px 1px 20px rgba(100,100,100,0.6)', borderRadius:'5px', cursor:'pointer', width:'100%', maxWidth:'160px'}}>
        <span style={{fontSize:'16px',backgroundColor:'rgba(153, 153, 241, 1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', color:'rgba(9, 18, 87, 1)'}}><FaUserEdit/></span>
        <span>My Profile</span>
      </div>

      <div style={{display:'flex', alignItems:'center', padding:'10px', gap:'6px',boxShadow:'1px 1px 20px rgba(100,100,100,0.6)', borderRadius:'5px', cursor:'pointer', width:'100%', maxWidth:'160px'}}>
        <span style={{fontSize:'16px',backgroundColor:'rgba(138, 236, 141, 1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', color:'rgba(1, 80, 35, 1)'}}><TbLogout/></span>
        <span>Logout</span>
      </div>

      <div style={{display:'flex', alignItems:'center', padding:'10px', gap:'6px',boxShadow:'1px 1px 20px rgba(100,100,100,0.6)', borderRadius:'5px', cursor:'pointer', width:'100%', maxWidth:'160px'}}>
        <span style={{fontSize:'16px',backgroundColor:'rgba(248, 133, 133, 1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', color:'rgba(80, 1, 1, 1)'}}><RiDeleteBin5Fill/></span>
        <span>Delete Account</span>
      </div>
    </div>
  )
}

function CoursesDetails(){

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
            {userCourses.length}
          </span>
        </span>
        <span style={{display:'flex', height:'30px', position:'absolute',top:'70px', right:'10px'}}>
          <input type='search'name='search'/>
          <span style={{display:'flex',backgroundColor:'rgba(13, 136, 138, 1)', color:'white', fontSize:'19px', justifyContent:'center', alignItems:'center', padding:'6px 7px', cursor:'pointer'}}><BiSearchAlt2/></span>
        </span>
        <div style={{width:'100%', display:'flex', gap:"15px", flexDirection:'column' }}>
          {userCourses && userCourses.map((course, index)=>(
            <div key={index} style={{flexWrap:'wrap',display:'flex', gap:'7px',boxShadow:'1px 2px 20px rgba(44, 43, 43, 0.6)', borderRadius:'5px',
            maxWidth:'900px',
            }}>
              <img src={AI_Gen_2} alt="pic" style={{width:'40%', maxWidth:'250px', aspectRatio:16/9, objectFit:'cover'}}/>
              <div style={{flex:'1 1 160px',display:'flex', flexDirection:'column', justifyContent:'space-between',padding:'20px 10px'}}>
                <span style={{fontSize:'18px', fontWeight:700}}>{course.name}</span>
                <span style={{cursor:'pointer', display:'flex', gap:'5px', alignItems:'center', justifyContent:'space-between'}}>
                  <span>Mwangaza-Started at 21-3-2026</span>
                  <span style={{fontWeight:700, fontSize:'15px'}}>Un-Enrolled Course</span>
                  <span style={{border:'1px solid rgba(13, 136, 138, 1)',padding:'3px', borderRadius:'5px', fontWeight:700, width:'140px', textAlign:'center', color:'rgba(13, 136, 138, 1)'}}>Resume Course</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    {/**IN-PROGRESS */}
      <div style={{display:'flex', flexDirection:'column',alignItems:'center', padding:'15px', gap:'10px',boxShadow:'1px 1px 20px rgba(100,100,100,0.6)', borderRadius:'5px', flex:'1 1 900px',position:'relative',}}>
        <span style={{fontSize:'21px',backgroundColor:"#F4B342",borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', color:'rgba(81, 48, 1, 1)'}}><MdPendingActions/></span>
        <span style={{fontSize:'18px',fontWeight:500, display:'flex', gap:'6px', alignItems:'center', paddingBottom:'20px'}}>
          In-Progress Courses 
          <span style={{fontSize:'20px',fontWeight:500,padding:'3px 13px', boxShadow:'1px 0.5px 3px rgba(56, 55, 55, 1)', borderRadius:'50%',display:'block', height:'fit-content',}}>
            {userCourses.length}
          </span>
        </span>
        <span style={{display:'flex', height:'30px', position:'absolute', top:'70px', right:'10px'}}>
          <input type='search'name='search'/>
          <span style={{display:'flex',backgroundColor:'rgba(13, 136, 138, 1)', color:'white', fontSize:'19px', justifyContent:'center', alignItems:'center', padding:'6px 7px', cursor:'pointer'}}><BiSearchAlt2/></span>
        </span>
        <div style={{width:'100%', display:'flex', gap:"15px", flexDirection:'column' }}>
          {userCourses && userCourses.map((course, index)=>(
            <div key={index} style={{flexWrap:'wrap',display:'flex', gap:'7px',boxShadow:'1px 2px 20px rgba(44, 43, 43, 0.6)', borderRadius:'5px',
            maxWidth:'900px',
            }}>
              <img src={AI_Gen_2} alt="pic" style={{width:'40%', maxWidth:'250px', aspectRatio:16/9, objectFit:'cover'}}/>
              <div style={{flex:'1 1 160px',display:'flex', flexDirection:'column', justifyContent:'space-between',padding:'20px 10px'}}>
                <span style={{fontSize:'18px', fontWeight:700}}>{course.name}</span>
                <span style={{cursor:'pointer', display:'flex', gap:'5px', alignItems:'center', justifyContent:'space-between'}}>
                  <span>Mwangaza-Started at 21-3-2026</span>
                  <span style={{fontWeight:700, fontSize:'15px'}}>Un-Enrolled Course</span>
                  <span style={{border:'1px solid rgba(13, 136, 138, 1)',padding:'3px', borderRadius:'5px', fontWeight:700, width:'140px', textAlign:'center', color:'rgba(13, 136, 138, 1)'}}>Resume Course</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}