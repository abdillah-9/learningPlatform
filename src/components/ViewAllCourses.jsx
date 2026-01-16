import { useNavigate } from 'react-router-dom';
import MwangazaLogo from '../assets/MwangazaLogo.jpg';
import { MdArrowDropDown } from 'react-icons/md';
import { HiMiniArrowLongRight } from 'react-icons/hi2';
import pic from '../assets/logo.webp';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider';
import MiniLoadingSpinner from './MiniLoadingSpinner';
import { RiHome9Fill, RiTwitterXFill } from 'react-icons/ri';
import { IoIosMail, IoMdCall } from 'react-icons/io';

export default function ViewAllCourses(){
    const navigateTo = useNavigate();
    const {userData} = useContext(AuthContext);
    const [coursesList, setCoursesList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
          async function FetchCourses(){
            const fData = new FormData();
            fData.append('course','Math');
        try{
            setLoading(true);
          const res = await fetch("https://www.tanzcoffee.co.tz/mwangaza_hub/get_all_courses.php",{
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
        finally{
            setLoading(false);
        }
      }
      FetchCourses();
      },[]);

    const decodeHTML = (encoded) => {
        try {
            return decodeURIComponent(escape(atob(encoded)));
        } catch {
            return encoded; // fallback for old DB rows
        }
    };
    
    if(loading){
        return <MiniLoadingSpinner/>
    }
    return(
        <div>
            {/* Top nav bar */}
            <div style={{position:'relative', top:0, left:0, width:'100%', height:'auto', backgroundColor:'#253957',zIndex:1, display:'flex', color:'white',justifyContent:'space-between',padding:'10px 10px', alignItems:'center', flexWrap:'wrap', gap:'10px'}}>
                <div style={{display:'flex',gap:'10px',height:'fit-content', alignItems:'center'}}>
                    <img src={MwangazaLogo} alt="logo"                      width={'60px'} height={'60px'} style={{borderRadius:'50%'}} />
                <span style={{fontSize:'18px', fontWeight:600}}>Mwangaza Knowledge Hub</span>
                </div>
                <div style={{display:'flex', gap:'20px', fontSize:'18px',fontWeight:500, alignItems:'center'}}> 
                    <div style={{marginRight:'10px',padding:'10px 5px',borderRadius:'50px', display:'flex', justifyContent:'center', alignItems:'center', textAlign:'center', fontSize:"14px", fontWeight:700, cursor:'pointer', gap:'4px'}} onClick={()=>navigateTo('/')}>
                        <span>Home</span>  
                    </div> 
                    <div style={{marginRight:'10px',padding:'10px 5px',borderRadius:'50px', display:'flex', justifyContent:'center', alignItems:'center', textAlign:'center', fontSize:"14px", fontWeight:700, cursor:'pointer', gap:'4px'}} onClick={()=>{navigateTo('/upcoming_courses')}}>
                        <span>Upcoming Courses</span>  
                    </div> 
                    {/* <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                        <img src={userData?.user_pic ? `https://www.tanzcoffee.co.tz/mwangaza_hub/uploads/users/${userData?.user_pic}` : pic } 
                        alt='user pic' width={'70px'} height={'60px'} style={{borderRadius:'50%'}}/>
                        <span>{userData?.full_name}</span>  
                        <span style={{fontSize:'20px'}}><MdArrowDropDown/></span>   
                    </div>  */}
                </div>
            </div>

            {/** Main Courses  */}
            
            <div style={{display:'flex', width:'100%', gap:'20px', padding:'20px', flexWrap:'wrap',height:'100vh', overflow:'auto', justifyContent:'center'}}>
            {coursesList ? coursesList.map((course) => (
            <div
                className="slideShowHeight"
                key={course.id}
                style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: '5px',
                minWidth:'220px',
                width: "30%",
                aspectRatio:1/0.85,
                }}
            >
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <img
                    src={course?.picture
                    ? `https://www.tanzcoffee.co.tz/mwangaza_hub/${course.picture}`
                    : pic}
                    alt="slide"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: 16 / 9 }}
                />
                </div>

                {/* FIXED PART */}
                <div
                className="heightHover"
                style={{
                    ...miniSlideshowTexts,
                    color: 'white',
                    backgroundColor: '#253957',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    padding: '10px',
                    cursor: 'pointer'
                }}
                onClick={() => navigateTo(`/enroll_course/${course.id}`)}
                >
                <div style={{fontSize:'15px'}}>{course.name}</div>

                <div
                    className="opacityHover"
                    style={{
                    fontSize: '14px',
                    color: 'rgba(250, 250, 250, 0.66)',
                    display: 'flex',
                    gap: '5px',
                    flexDirection: 'column'
                    }}
                >
                    <span style={{fontSize:'13px'}}
                    dangerouslySetInnerHTML={{
                        __html: decodeHTML(course.description)
                    }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent:'center' }}>
                    <span>View Course</span>
                    <HiMiniArrowLongRight style={{ fontSize: '25px' }} />
                    </div>
                </div>
                </div>
            </div>
            )) : "Courses Not found ..."}

            </div>
            {/** Footer */}
            <footer style={{backgroundColor:'#253957', display:'flex', justifyContent:'space-between', padding:'40px 50px 20px 50px', color:'white', flexWrap:'wrap', gap:"15px"}}>
        
                {/** Logo and company name */}
                <div style={{fontSize:'20px', fontWeight:500, display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <img src={MwangazaLogo} alt="logo" width={'60px'} height={'auto'} style={{aspectRatio:1/0.95, borderRadius:'50%'}} />
                    <span>
                        Mwangaza Knowledge Hub
                    </span>
                </div>
                {/** Course number & Course name */}
                <div style={{display:'flex', gap:'20px', fontSize:'30px', position:'relative', minHeight:'70px', top:'40px', marginBottom:'40px'}}>
                    <RiTwitterXFill />
                    <IoIosMail />
                    <IoMdCall />                
                </div>
            </footer>
            
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