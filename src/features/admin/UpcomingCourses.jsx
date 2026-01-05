import React, { useEffect, useState } from 'react'
import { BiLogOut, BiSearchAlt2, BiSolidSearchAlt2 } from 'react-icons/bi'
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs'
import { FaUserEdit, FaUserMd } from 'react-icons/fa'
import { MdLibraryAdd, MdPendingActions } from 'react-icons/md'
import { PiArrowLineRight, PiBookOpenUser, PiNotePencilLight, PiTrashLight } from 'react-icons/pi'
import { RiDeleteBin5Fill, RiFileCheckFill } from 'react-icons/ri'
import { TbLogout } from 'react-icons/tb'
import AI_Gen_2 from "../../assets/AI Gen 2.webp";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from 'react-icons/io'
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner'

export default function UpcomingCourses() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const LIMIT = 5;
    const [formState, setFormState] = useState(false);
    const [editModeState, setEditModeState] = useState(false);
    const [courseData, setCourseData] = useState([]);
    const [fetchedCourses, setFetchedCurses] = useState([]);
    const [loading, setLoading] = useState(true);

    async function FetchAllUpcomingCourses(page = 1) {
      setLoading(true);
      const formData = new FormData();
      formData.append("page", page);
      formData.append("limit", LIMIT);
      try{
        const res = await fetch(
          "https://www.tanzcoffee.co.tz/mwangaza-backend/fetch_upcoming_courses.php",
          { method: "POST", body: formData }
        );

        if (res.ok) {
          const data = await res.json();
          setFetchedCurses(data.data);
          setCurrentPage(data.current_page);
          setTotalPages(data.total_pages);
        }
      }
      catch(e){
        console.log(e);
      }
      finally{
        setLoading(false);
      }
    }

    useEffect(() => {
      FetchAllUpcomingCourses(currentPage);
    }, [currentPage]);


    if(loading){
      return <MiniLoadingSpinner/>
    }
    return (
        <div style={{padding:'15px',display:'flex', gap:'20px', flexDirection:'column'}}>
          <QuickActions 
            formState={formState} setFormState={setFormState}
            editModeState={editModeState} setEditModeState={setEditModeState} 
            courseData={courseData} setCourseData={setCourseData} 
          />
          <CoursesDetails 
            formState={formState} setFormState={setFormState}
            editModeState={editModeState} setEditModeState={setEditModeState}
            courseData={courseData} setCourseData={setCourseData}
            FetchAllUpcomingCourses={FetchAllUpcomingCourses}
            fetchedCourses={fetchedCourses}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />

          <Form 
            formState={formState} setFormState={setFormState}
            editModeState={editModeState} setEditModeState={setEditModeState}
            courseData={courseData} setCourseData={setCourseData}
            FetchAllUpcomingCourses={FetchAllUpcomingCourses}
          />
        </div>
    )
}

function QuickActions({formState, setFormState, setEditModeState, setCourseData}){
  return(
    <div style={{boxShado:'1px 2px 20px rgba(100,100,100,0.6)', borderRadius:'5px', padding:'0px', display:'flex', flexWrap:'wrap', gap:'20px', fontSize:'13px'}}> 
      <div style={{display:'flex', alignItems:'center', padding:'10px', gap:'6px',boxShadow:'1px 1px 20px rgba(100,100,100,0.6)', borderRadius:'5px', cursor:'pointer', width:'100%', maxWidth:'250px'}} 
      onClick={()=>{setFormState(!formState); setEditModeState(false); setCourseData(null)}}>
        <span style={{fontSize:'16px',backgroundColor:'rgba(153, 153, 241, 1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', color:'rgba(9, 18, 87, 1)'}}><MdLibraryAdd/></span>
        <span>Insert new upcoming course</span>
      </div>
    </div>
  )
}

function CoursesDetails({formState, setFormState, setEditModeState, courseData, setCourseData, FetchAllUpcomingCourses, fetchedCourses, currentPage,
  setCurrentPage,totalPages}){
  async function HandleDeleteCourse(upcoming_course_id){
    const formData = new FormData();
    formData.append('upcoming_course_id',upcoming_course_id);

    const res = await fetch('https://www.tanzcoffee.co.tz/mwangaza-backend/delete_upcoming_course.php',{
      body:formData,
      method:"post"
    });
    if(res.ok){
      const data = await res.json();
      await FetchAllUpcomingCourses();
      alert(data.message);
    }
    else{
      alert("Failed to delede this upcoming course");
    }
  }

  return(
    <div style={{boxShado:'1px 2px 20px rgba(100,100,100,0.6)', borderRadius:'5px', padding:'0px', display:'flex', flexWrap:'wrap', gap:'20px', fontSize:'13px'}}>  
      <div style={{display:'flex', flexDirection:'column',padding:'15px', gap:'30px',boxShadow:'1px 1px 20px rgba(100,100,100,0.6)', borderRadius:'5px', flex:'1 1 900px',position:'relative',}}>

      {/* PREV AND NEXT */}
      <div style={{display:'flex', justifyContent:"space-between", gap:'20px'}}>

        {/* PREV */}
        <span
          onClick={() => currentPage > 1 && setCurrentPage(p => p - 1)}
          style={{
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            opacity: currentPage === 1 ? 0.5 : 1,
            borderRadius:'20px',
            padding:'6px 10px',
            backgroundColor:"#F4B342",
            display:'flex',
            alignItems:'center',
            gap:'5px'
          }}
        >
          <IoMdArrowDropleftCircle />
          <span style={{fontSize:'13px', fontWeight:600}}>PREV</span>
        </span>

        {/* PAGE INFO */}
        <span style={{
          padding:'6px 10px',
          backgroundColor:"#F4B342",
          fontSize:'13px',
          fontWeight:700
        }}>
          {currentPage} / {totalPages}
        </span>

        {/* NEXT */}
        <span
          onClick={() => currentPage < totalPages && setCurrentPage(p => p + 1)}
          style={{
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            opacity: currentPage === totalPages ? 0.5 : 1,
            borderRadius:'20px',
            padding:'6px 10px',
            backgroundColor:"#F4B342",
            display:'flex',
            alignItems:'center',
            gap:'5px'
          }}
        >
          <span style={{fontSize:'13px', fontWeight:600}}>NEXT</span>
          <IoMdArrowDroprightCircle />
        </span>

      </div>


        {/** Main Courses here */}
        <div style={{width:'100%', display:'flex', gap:"15px", flexDirection:'column' }}>
          {fetchedCourses && fetchedCourses?.map((course, index)=>(
            <div key={index} style={{flexWrap:'wrap',display:'flex', gap:'7px',boxShadow:'1px 2px 20px rgba(44, 43, 43, 0.6)', borderRadius:'5px',
            maxWidth:'900px',
            }}>
              <img src={'https://www.tanzcoffee.co.tz/mwangaza-backend/'+(course.course_photo ? course.course_photo : "uploads/noPhoto.jpeg")} alt="pic" style={{width:'40%', maxWidth:'250px', aspectRatio:16/9, objectFit:'cover'}}/>
              <div style={{flex:'1 1 160px',display:'flex', flexDirection:'column', justifyContent:'space-between',padding:'20px 10px'}}>
                <span style={{fontSize:'18px', fontWeight:700}}>{course.course_name}</span>
                <span style={{cursor:'pointer', display:'flex', gap:'5px', alignItems:'center', justifyContent:'space-between'}}>
                  <span>
                    {course.course_desc}
                  </span>
                  <span style={{color:'rgba(6, 57, 59, 1)', fontSize:'20px',display:'flex', gap:'10px'}}>
                    <span style={{border:'1px solid rgba(13, 136, 138, 1)',padding:'3px 7px', borderRadius:'5px', }} title='Edit Upcoming Course'
                    onClick={()=>{setEditModeState(true); setFormState(true);
                      setCourseData({
                        'upcoming_course_id':course.id,
                        'course_name':course.course_name,
                        'course_desc':course.course_desc,
                        'starting_date': course.starting_date,
                        'course_photo': course.course_photo,
                      });
                    }}
                    >
                        <PiNotePencilLight/>
                    </span>
                    <span style={{border:'1px solid rgba(13, 136, 138, 1)',padding:'3px 7px', borderRadius:'5px', }} title='Delete Upcoming Course'
                    onClick={()=>{HandleDeleteCourse(course.id)}}>
                        <PiTrashLight/>
                    </span>
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

function Form({formState, setFormState, editModeState, courseData, FetchAllUpcomingCourses}){

  async function handleSubmit(e){
     e.preventDefault();
     try{
      const formData = new FormData(e.target);
      formData.append('editMode',editModeState);
      formData.append('upcoming_course_id', courseData?.upcoming_course_id || "false");

      const res = await fetch('https://www.tanzcoffee.co.tz/mwangaza-backend/create_edit_upcoming_course.php',{
        method:'POST',
        body:formData,
      });

      if(res.ok){
        const data = await res.json();
        console.log(data.message);
        alert(data.message);
        await FetchAllUpcomingCourses();
        setFormState(false);
      }
      else{
        alert('course upload failed');
      }
     }
     catch(e){
      console.log('catched err is '+e);
      alert(e);
     }
  }

    return(
      <div style={{display:'flex', justifyContent:'center', alignItems:'center',   
            position:'fixed',
            top:0,
            left:0,
            zIndex:3,
            width:'100vw',
            backdropFilter:'blur(5px)',
            height: formState ? '100vh' : '0vh',
            overflow:'auto',
            }}>
        <form onSubmit={handleSubmit} style={{
            height:'auto',
            width:'90vw',
            maxWidth:'600px',
            backgroundColor:'white',
            transition:'all',
            padding:'50px 20px',
            borderRadius:'10px',
            boxShadow:'1px 2px 20px black',
            display:'flex',
            flexDirection:'column',
            gap:'20px',
            overflow:'auto'
        }}>
            <div style={{display:'flex', gap:'15px', alignItems:'center', borderBottom:'1px solid rgba(29, 61, 69, 0.64)', justifyContent:'space-between', paddingBottom:'15px', flexWrap:'wrap'}}>
                <label style={{fontSize:'14px', fontWeight:600}}>Course name</label>
                <input required type='text' name='course_name' placeholder='Course name'style={{
                  padding:'10px', border:'1px solid rgba(29, 61, 69, 0.64)', borderRadius:'5px', width:'220px'
                }} defaultValue={courseData ? courseData.course_name : ""}/>
            </div>
            <div style={{display:'flex', gap:'15px', alignItems:'center', borderBottom:'1px solid rgba(29, 61, 69, 0.64)', justifyContent:'space-between', paddingBottom:'15px', flexWrap:'wrap'}}>
                <label style={{fontSize:'14px', fontWeight:600}}>Course description</label>
                <input required type='text' name='course_desc' placeholder='Course desc' style={{
                  padding:'10px', border:'1px solid rgba(29, 61, 69, 0.64)', borderRadius:'5px', width:'220px'
                }} defaultValue={courseData ? courseData.course_desc : ""}/>
            </div>
            <div style={{display:'flex', gap:'15px', alignItems:'center', borderBottom:'1px solid rgba(29, 61, 69, 0.64)', justifyContent:'space-between', paddingBottom:'15px', flexWrap:'wrap'}}>
                <label style={{fontSize:'14px', fontWeight:600}}>Start date</label>
                <input required type='date' name='start_date' placeholder='Course date' style={{
                  padding:'10px', border:'1px solid rgba(29, 61, 69, 0.64)', borderRadius:'5px', width:'220px'
                }} defaultValue={courseData ? courseData.starting_date : ""}/>
            </div>
            <div style={{display:'flex', gap:'15px', alignItems:'center', borderBottom:'1px solid rgba(29, 61, 69, 0.64)', justifyContent:'space-between', paddingBottom:'15px', flexWrap:'wrap'}}>
                <label style={{fontSize:'14px', fontWeight:600}}>Course photo</label>
                <input type='file' name='course_photo'  key={Date.now()}
                style={{
                  padding:'10px', border:'1px solid rgba(29, 61, 69, 0.64)', borderRadius:'5px', width:'220px', cursor:'pointer'
                }}/>
                {
                  courseData?.course_photo ?
                  <img src={courseData ? 'https://www.tanzcoffee.co.tz/mwangaza-backend/'+courseData.course_photo : ""} alt='pic' style={{objectFit:'cover', width:'50%', aspectRatio:16/9, boxShadow:'1px 2px 3px black'}}/> :""
                }
            </div>
            <div style={{display:'flex', gap:'15px', alignItems:'center', borderBottom:'1px solid rgba(29, 61, 69, 0.64)', justifyContent:'space-between', paddingBottom:'15px', flexWrap:'wrap'}}>
                <input type='submit' name='submit' value='Submit' style={{backgroundColor:'rgba(100, 198, 111, 1)', color:'rgba(18, 65, 4, 1)', border:"1px solid rgba(0,0,0,0)", padding:'7px 15px', borderRadius:'5px', fontWeight:700, cursor:'pointer', boxShadow:'1px 2px 2px black'}}/>
                <button type='button' onClick={()=>{setFormState(!formState)}} style={{backgroundColor:'rgba(255, 112, 112, 1)', color:'rgba(65, 4, 4, 1)', border:"1px solid rgba(0,0,0,0)", padding:'7px 15px', borderRadius:'5px', fontWeight:700, cursor:'pointer', boxShadow:'1px 2px 2px black'}}>
                  Cancel
                </button>
            </div>
        </form>
      </div>
    )
}