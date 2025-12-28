import { useNavigate } from 'react-router-dom';
import MwangazaLogo from '../assets/MwangazaLogo.jpg';
import { MdArrowDropDown } from 'react-icons/md';
import { HiMiniArrowLongRight } from 'react-icons/hi2';
import pic from '../assets/logo.jpg';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider';

export default function ViewAllCourses(){
    const navigateTo = useNavigate();
    const {userData} = useContext(AuthContext);
    const [coursesList, setCoursesList] = useState([]);
    useEffect(()=>{
          async function FetchCourses(){
            const fData = new FormData();
            fData.append('course','Math');
        try{
          const res = await fetch("https://www.tanzcoffee.co.tz/mwangaza-backend/get_all_courses.php",{
            method:'POST',
            body:fData,
          });
    
          if(res.ok){
            const data = await res.json();
            console.log('Courses are '+JSON.stringify(data));
            setCoursesList(data.data);
          }
        }
        catch(e){
          alert('Err is '+e);
        }
      }
      FetchCourses();
      },[]);
    
    return(
        <div>
            {/* Top nav bar */}
            <div style={{position:'absolute', top:0, left:0, width:'100%', height:'80px', backgroundColor:'#0C2B4E',zIndex:1, display:'flex', color:'white',justifyContent:'space-between',padding:'0px 15px', alignItems:'center'}}>
                <div style={{display:'flex',gap:'10px',height:'fit-content', alignItems:'center'}}>
                    <img src={MwangazaLogo} alt="logo"                      width={'60px'} height={'60px'} style={{borderRadius:'50%'}} />
                <span style={{fontSize:'21px', fontWeight:600}}> MWANGAZA BUSINESS & INVESTMENT SCHOOL</span>
                </div>
                <div style={{display:'flex', gap:'50px', fontSize:'18px',fontWeight:500, alignItems:'center'}}> 
                    <span style={{cursor:'pointer'}} onClick={()=>{navigateTo('/about')}}>Upcoming Courses</span>
                    <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                        <img src={userData?.user_pic ? `https://www.tanzcoffee.co.tz/mwangaza-backend/uploads/${userData?.user_pic}` : pic } 
                        alt='pic' width={'70px'} height={'60px'} style={{borderRadius:'50%'}}/>
                        <span>{userData?.full_name}</span>  
                        <span style={{fontSize:'20px'}}><MdArrowDropDown/></span>   
                    </div> 
                </div>
            </div>

            {/** Main Courses  */}
            
            <div style={{display:'flex', width:'100%', gap:'20px', paddingTop:'100px', flexWrap:'wrap'}}>
            {
            coursesList ?  coursesList?.map((course, index)=>(
                <div className="slideShowHeight" key={course.id}
                style={{flex:'1 1 250px', position: "relative", overflow: "hidden",aspectRatio:1/0.85, borderRadius:'5px'}}>
                          
                    <div style={{ position: 'relative', width: '100%',height:'100%' }}>
                    <img
                        src={`https://www.tanzcoffee.co.tz/mwangaza-backend/uploads/`+course.picture}
                        alt="slide"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    </div>
        
                    <a style={{ ...miniSlideshowTexts, color: 'white', backgroundColor:'#0C2B4E', width:'100%', display:'flex', flexDirection:'column', gap:'15px', padding:'20px 0px'}} className="heightHover" href="/enroll_course">
                    <div>
                        {course.name}
                    </div>
                    <div style={{fontSize:'15px', color:'rgba(250, 250, 250, 0.66)',display:'flex', gap:'5px', flexDirection:'column'}} className="opacityHover">
                        <span>{course.description}</span>
                        <div style={{display:'flex',alignItems:'center', gap:'10px'}}
                        onClick={()=>navigateTo(`/enroll_course/${course.id}`)}>
                            <span>View Course </span>
                            <HiMiniArrowLongRight style={{fontSize:'25px'}}/>
                        </div>
                    </div>
                    </a>
                </div>
            ))
                : "Courses Not found ..."
                }
            </div>
            
        </div>
    )
}

const miniSlideshowTexts = {
  position: "absolute",
  bottom: "0%",
  left: "0%",
  fontSize: "25px",
  fontWeight: "500",
  textAlign: "center",
  width: "100%",
  zIndex:10,
}