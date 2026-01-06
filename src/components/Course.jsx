import course_image from '../assets/logo.webp';
import { BsCalendar2Date, BsFillInfoCircleFill, BsTwitterX } from "react-icons/bs";
import { FaPaperPlane, FaPencil } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import MwangazaLogo from '../assets/MwangazaLogo.jpg';
import { SiFacebook } from "react-icons/si";
import { TbBrandLinkedin, TbBrandLinkedinFilled } from "react-icons/tb";
import { TiSocialInstagram } from "react-icons/ti";
import { useContext, useEffect, useState } from 'react';
import { PiWhatsappLogoLight } from 'react-icons/pi';
import { AuthContext } from '../AuthProvider';

export default function Course(){
    const navigateTo = useNavigate();
    const {courseId} = useParams();
    const [courseData, setCourseData] = useState(null);
    const {userData} = useContext(AuthContext); 

    //fetch respective course
    useEffect(()=>{
        async function fetchCourse() {
            const formData = new FormData();
            formData.append('courseId',courseId);
            try{
                const res = await fetch('https://www.tanzcoffee.co.tz/mwangaza-backend/get_selected_course.php',{
                    method:"POST",
                    body:formData
                });

                if(res.ok){
                    const data = await res.json();
                    console.log(JSON.stringify(data));
                    setCourseData(data);
                }
            }   
            catch(err){
                alert('Error '+err);
            }         
        }
        fetchCourse();
    },[]);

    const decodeHTML = (encoded) => {
    try {
        return decodeURIComponent(escape(atob(encoded)));
    } catch {
        return encoded; // fallback for old DB rows
    }
    };
    
    if(!courseData){
        return
    }

    return(
        <div style={{width:'100vw', display:'flex', flexDirection:'column', gap:'40px', backgroundColor:'rgba(225, 227, 253, 1)',}}>
            <nav style={{backgroundColor:'rgba(0, 29, 82, 1)', display:'flex', justifyContent:'space-between', padding:'40px 50px 20px 50px', color:'white', flexWrap:'wrap', gap:"15px"}}>

                {/** Logo and company name */}
                <div style={{fontSize:'20px', fontWeight:500, display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap', gap:'15px',height:'fit-content'}}>
                    <img src={MwangazaLogo} alt="logo" width={'60px'} height={'auto'} style={{aspectRatio:1/0.95, borderRadius:'50%'}} />
                    <span style={{maxWidth:'300px',minWidth:'250px'}}>
                        MWANGAZA BUSINESS & INVESTMENT SCHOOL
                    </span>
                </div>
                {/** Course number & Course name */}
                <div style={{display:'flex', gap:'3px', fontSize:'17px', position:'relative', minHeight:'70px', top:'40px', marginBottom:'40px'}}>
                    <span>{courseData.course.number}:</span>
                    <span>{courseData.course.name}</span>
                </div>
                {/** Buotton links */}
                <div style={{display:'flex', gap:'20px', height:'fit-content', }}>
                    <div style={{borderRadius:'3px', padding:'10px', fontWeight:700, border:'1px solid rgba(70, 169, 194, 1)', color:'rgba(70, 169, 194, 1)', cursor:'pointer'}} onClick={()=>{navigateTo('/auth/register')}}>REGISTER</div>
                    <div style={{borderRadius:'3px', padding:'10px', fontWeight:700, color:'white', backgroundColor:'rgba(70, 169, 194, 1)', cursor:'pointer'}} onClick={()=>{navigateTo('/auth/sign_in')}}>SIGN IN</div>
                </div>
            </nav>

            {/** Main Course body */}
            <section style={{width:'93%', backgroundColor:'white', alignSelf:'center', padding:'15px'}}>
                {/** Heading */}
                <div style={{border:'1px solid black', display:'flex', flexWrap:'wrap', padding:'20px', gap:'30px', justifyContent:'space-between', alignItems:'center'}}>
                    <div style={{flex:'1 1 60%',display:'flex', flexDirection:'column'}}>
                        <div style={{display:'flex', gap:'10px'}}>
                            <p style={{fontSize:'33px'}}>
                                {courseData.course.name}
                            </p>
                            <span style={{backgroundColor:'rgba(70, 169, 194, 1)',padding:'5px 20px', color:'white', borderRadius:"10px", height:'fit-content'}}>{courseData.course.number}</span>
                        </div>
                        <p style={{paddingBottom:'20px', borderBottom:'2px solid rgba(200,200,200,0.8)',fontSize:'16px', color:'rgba(54, 53, 53, 0.8)',width:'90%'}}
                        dangerouslySetInnerHTML={{__html:decodeHTML(courseData.course.description)}}>
                        </p>
                        <span style={{background:'linear-gradient(180deg,rgba(23, 161, 241, 1) 40%, rgba(0, 116, 184, 1) 60%', padding:'10px', color:'white', fontSize:'19px', textAlign:'center', marginTop:'20px', width:'90%',maxWidth:'400px', border:'1px solid black', borderRadius:'5px', cursor:'pointer'}}>
                            Building a Generation of Founders and C.E.Os
                        </span>
                    </div>
                    <img src={
                        courseData.course.picture
                        ? `https://www.tanzcoffee.co.tz/mwangaza-backend/${courseData.course.picture}`
                        : course_image
                    }

                    alt="pic" width={'40%'} style={{aspectRatio:1/0.6, maxWidth:"300px"}}/>
                </div>

                {/** Body */}
                <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between', gap:'50px', paddingTop:'50px'}}>
                    <div style={{display:'flex',flexDirection:'column', gap:'50px', flexGrow:1, width:'60%', textAlign:'justify'}}>
                        <div style={{display:'flex', flexDirection:'row',gap:'40px', justifyContent:'space-between', flexWrap:'wrap'}}>
                            
                            {/* About Left */}
                            <div style={{maxWidth:'700px', width:'100%'}}>
                                <h2 style={{textAlign:'left'}}>About This Course</h2>
                                <p dangerouslySetInnerHTML={{__html:decodeHTML(courseData.course.about)}} style={{whiteSpace:'pre-wrap'}}>
                                </p>
                            </div>

                            {/** About right */}
                            <div style={{maxWidth:'500px'}}>
                                <div style={{display:'flex',flexDirection:'column', gap:'0px',paddingTop:'0px', color:'rgba(100,100,100,0.8)', flexGrow:1, width:'fit-content', minWidth:'250px', fontSize:'15px'}}>
                                    <div style={{display:'flex', gap:'20px', borderBottom:'1px solid rgba(100,100,100,0.8)', alignItems:'center',justifyContent:'center', padding:'0px 0px 20px 0px', fontSize:'30px',}}>
                                        <RiTwitterXFill />
                                        <TbBrandLinkedinFilled/>
                                        <TiSocialInstagram />
                                        <SiFacebook/>
                                    </div>
                                    <div style={{display:'flex', justifyContent:'space-between', gap:'15px', flexWrap:'wrap', minWidth:'250px', padding:'10px 0px',borderBottom:'1px solid rgba(100,100,100,0.8)',color:'rgba(80,80,80,0.8)',height:'fit-content'}}>
                                        <div style={{display:'flex', gap:'7px'}}>
                                            <span><BsFillInfoCircleFill/></span>
                                            <span>Course Number</span>
                                        </div>
                                        <div  style={{fontWeight:600}}>
                                            {courseData.course.number}
                                        </div>
                                    </div>
                                    <div style={{display:'flex', justifyContent:'space-between', gap:'15px', flexWrap:'wrap', minWidth:'250px', padding:'10px 0px',borderBottom:'1px solid rgba(100,100,100,0.8)',color:'rgba(80,80,80,0.8)',height:'fit-content'}}>
                                        <div style={{display:'flex', gap:'7px'}}>
                                            <span><BsCalendar2Date/></span>
                                            <span>Classes Start</span>
                                        </div>
                                        <div style={{fontWeight:600}}>
                                            {courseData.course.start_date}
                                        </div>
                                    </div>
                                    <div style={{display:'flex', justifyContent:'space-between', gap:'15px', flexWrap:'wrap', minWidth:'250px', padding:'10px 0px',borderBottom:'1px solid rgba(100,100,100,0.8)',color:'rgba(80,80,80,0.8)',height:'fit-content'}}>
                                        <div style={{display:'flex', gap:'7px'}}>
                                            <span><FaPencil/></span>
                                            <span>Course duration</span>
                                        </div>
                                        <div style={{fontWeight:600}}>
                                            {courseData.course.duration}
                                        </div>
                                    </div>

                                </div>                                
                            </div>
                        </div>

                        {/**Course Modules */}
                        <div style={{display:'flex', flexDirection:'column',gap:'10px'}}>
                            <h2 style={{textAlign:'left'}}>
                                Course Modules
                            </h2>
                            <section style={{display:'flex', flexDirection:'column', gap:'20px'}}>
                                {
                                    courseData.courseModules.map((item, index)=>
                                <div key={index}  style={{display:'flex', gap:'10px', alignItems:'', justifyContent:'space-between', fontSize:'15px', flexWrap:'wrap'}} > 
                                    <div style={{paddingLeft:'30px', cursor:'pointer', maxWidth:'700px', width:'100%'}} onClick={()=>{navigateTo(`main_App/moduleId/${item.id}`)}}>
                                        <div style={{fontSize:'16px', fontWeight:500, display:'flex', width:'100%',maxWidth:'700px', justifyContent:'space-between', flexWrap:'wrap', gap:'12px', alignItems:'center',}}>
                                            <div>Module {++index}: {item.title}</div>
                                            <div style={{fontSize:'13px', boxShadow:'1px 0.5px 6px rgba(52, 51, 51, 0.72)', color:'rgba(29, 29, 29, 0.72)', padding:'7px 12px', borderRadius:'10px'}}>
                                                {
                                                    userData ? 'Start learning':
                                                    'Enroll Now'
                                                }
                                            </div>
                                        </div>
                                        <p style={{color:'rgba(80,80,80,0.8)', maxWidth:'700px'}}>
                                            {item.description}
                                        </p>
                                    </div>
                                    <div style={{display:'flex', justifyContent:'space-between', gap:'15px', flexWrap:'wrap', minWidth:'250px', padding:'10px 0px',borderBottom:'1px solid rgba(100,100,100,0.8)',color:'rgba(80,80,80,0.8)',height:'fit-content'}}>
                                        <div style={{display:'flex', gap:'7px', }}>
                                            <span>Session Costs</span>
                                        </div>
                                        <div style={{fontWeight:600}}>
                                            {item.cost}
                                        </div>
                                    </div>
                                </div>
                                )
                                }
                            </section>
                        </div>

                        {/** Who should take this course */}
                        <div style={{display:'flex', flexDirection:'column',gap:'10px', maxWidth:'700px', fontSize:'15px', color:'rgba(24, 23, 23, 0.8)'}}>
                            <h2 style={{textAlign:'left', color:'black'}}>
                                Who Should Take This Course
                            </h2>
                            <div dangerouslySetInnerHTML={{__html:decodeHTML(courseData.course.target_audience)}}>
                            </div>
                            {/* <h2 style={{textAlign:'left', color:'black', fontSize:'16px'}}>
                                Click Enroll Now to get started
                            </h2> */}
                        </div>
                        {/** Hint */}
                        <div style={{display:'flex', flexDirection:'column',gap:'10px',maxWidth:'900px'}}>
                            <h2 style={{textAlign:'left'}}>
                                How to Access a Course or Module
                            </h2>
                            <p style={{boxShadow:'1px 0.5px 5px #0c2b4e96', padding:'20px', borderRadius:'40px', cursor:'pointer', whiteSpace:'pre-wrap'}}
                            dangerouslySetInnerHTML={{__html:decodeHTML(courseData.course.hint)}}>
                            </p>
                        </div>
                        <div
                        style={{
                            display: 'flex',
                            gap: '5px',
                            flexWrap: 'wrap',
                            fontSize: '14px',
                            alignItems: 'center',
                            fontWeight: '700',
                            cursor: 'pointer'
                        }}
                        onClick={() => window.open('https://wa.me/255788491086', '_blank')}
                        >
                        <span>You may reach us through</span>
                        <PiWhatsappLogoLight style={{ fontSize: '24px' }} />
                        </div>
                    </div>
                </div>

            </section>

            {/** Footer */}
            <footer style={{backgroundColor:'rgba(0, 29, 82, 1)', display:'flex', justifyContent:'space-between', padding:'40px 50px 20px 50px', color:'white', flexWrap:'wrap', gap:"15px"}}>

                {/** Logo and company name */}
                <div style={{fontSize:'20px', fontWeight:500, display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <img src={MwangazaLogo} alt="logo" width={'60px'} height={'auto'} style={{aspectRatio:1/0.95, borderRadius:'50%'}} />
                    <span style={{width:'250px', textAlign:'center'}}>
                        MWANGAZA BUSINESS & INVESTMENT SCHOOL
                    </span>
                </div>
                {/** Course number & Course name */}
                <div style={{display:'flex', gap:'20px', fontSize:'30px', position:'relative', minHeight:'70px', top:'40px', marginBottom:'40px', justifyContent:'center',}}>
                    <RiTwitterXFill />
                    <TbBrandLinkedinFilled/>
                    <TiSocialInstagram />
                    <SiFacebook/>             
                </div>
            </footer>
        </div>
    )
}