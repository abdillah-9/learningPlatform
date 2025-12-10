import { BookOpenCheck, MailIcon } from "lucide-react";
import course_image from '../assets/AI Gen 2.webp';
import { BsCalendar2Date, BsFillInfoCircleFill, BsTwitterX } from "react-icons/bs";
import { FaPaperPlane, FaPencil } from "react-icons/fa6";
import { MdMarkEmailUnread } from "react-icons/md";
import { IoIosMail, IoMdCall } from "react-icons/io";
import { RiTwitterXFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import MwangazaLogo from '../assets/MwangazaLogo.jpg';
import { SiFacebook } from "react-icons/si";
import { TbBrandLinkedin, TbBrandLinkedinFilled } from "react-icons/tb";
import { TiSocialInstagram } from "react-icons/ti";

export default function Course(){
    const navigateTo = useNavigate();
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
                    <span>FZ234:</span>
                    <span>Planning for Evaluation and Monitoring</span>
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
                    <div style={{width:'fit-content', display:'flex', flexDirection:'column'}}>
                        <div style={{display:'flex', gap:'10px'}}>
                            <p style={{fontSize:'33px'}}>
                                Planning for Monitoring and Evaluation
                            </p>
                            <span style={{backgroundColor:'rgba(70, 169, 194, 1)',padding:'5px 20px', color:'white', borderRadius:"10px", height:'fit-content'}}>FZ234</span>
                        </div>
                        <p style={{paddingBottom:'20px', borderBottom:'2px solid rgba(200,200,200,0.8)',fontSize:'16px', color:'rgba(54, 53, 53, 0.8)',width:'90%'}}>
                            Learn how successful projects plan for data collection, management, analysis, and use.
                        </p>
                        <span style={{background:'linear-gradient(180deg,rgba(23, 161, 241, 1) 40%, rgba(0, 116, 184, 1) 60%', padding:'10px', color:'white', fontSize:'20px', textAlign:'center', marginTop:'20px', width:'90%',maxWidth:'400px', border:'1px solid black', borderRadius:'5px', cursor:'pointer'}}>Enroll Now</span>
                    </div>
                    <img src={course_image} alt="pic" width={'40%'} style={{aspectRatio:1/0.6, maxWidth:"350px"}}/>
                </div>

                {/** Body */}
                <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between', gap:'50px', paddingTop:'50px'}}>
                    <div style={{display:'flex',flexDirection:'column', gap:'50px', flexGrow:1, width:'60%', textAlign:'justify'}}>
                        <div style={{display:'flex', flexDirection:'row',gap:'40px', justifyContent:'space-between', flexWrap:'wrap'}}>
                            
                            {/* About Left */}
                            <div style={{maxWidth:'700px', width:'100%'}}>
                                <h2 style={{textAlign:'left'}}>About This Course</h2>
                                <p>
                                    How will you measure your project’s success? This free online course will help you answer this question by introducing the basics of monitoring and evaluation (M&E). In this course, you will learn how successful projects plan for data collection, management, analysis, and use. As you complete the course assignments, you will create an M&E plan for your own project. Learners who complete this free online M&E course are eligible to receive a Certificate of Achievement through the Haas School of Business at the University of California, Berkeley (Berkeley Haas).
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
                                            FZ234
                                        </div>
                                    </div>
                                    <div style={{display:'flex', justifyContent:'space-between', gap:'15px', flexWrap:'wrap', minWidth:'250px', padding:'10px 0px',borderBottom:'1px solid rgba(100,100,100,0.8)',color:'rgba(80,80,80,0.8)',height:'fit-content'}}>
                                        <div style={{display:'flex', gap:'7px'}}>
                                            <span><BsCalendar2Date/></span>
                                            <span>Classes Start</span>
                                        </div>
                                        <div style={{fontWeight:600}}>
                                            Jan, 2 2025
                                        </div>
                                    </div>
                                    <div style={{display:'flex', justifyContent:'space-between', gap:'15px', flexWrap:'wrap', minWidth:'250px', padding:'10px 0px',borderBottom:'1px solid rgba(100,100,100,0.8)',color:'rgba(80,80,80,0.8)',height:'fit-content'}}>
                                        <div style={{display:'flex', gap:'7px'}}>
                                            <span><FaPencil/></span>
                                            <span>Course duration</span>
                                        </div>
                                        <div style={{fontWeight:600}}>
                                            30 minutes
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
                                <div style={{display:'flex', gap:'10px', alignItems:'', justifyContent:'space-between', fontSize:'15px', flexWrap:'wrap'}}> 
                                    <div style={{paddingLeft:'30px'}}>
                                        <h2 style={{fontSize:'16px', fontWeight:500,}}>
                                            Module 1: Project Management
                                        </h2>
                                        <p style={{color:'rgba(80,80,80,0.8)', maxWidth:'700px'}}>
                                            This will help to govern the project of your choice .. .. .. .. ... ... .....
                                        </p>
                                    </div>
                                    <div style={{display:'flex', justifyContent:'space-between', gap:'15px', flexWrap:'wrap', minWidth:'250px', padding:'10px 0px',borderBottom:'1px solid rgba(100,100,100,0.8)',color:'rgba(80,80,80,0.8)',height:'fit-content'}}>
                                        <div style={{display:'flex', gap:'7px', }}>
                                            <span>Video Session Cost</span>
                                        </div>
                                        <div style={{fontWeight:600}}>
                                            50,000Tsh
                                        </div>
                                    </div>
                                </div>
                                
                                <div style={{display:'flex', gap:'10px', alignItems:'', justifyContent:'space-between', fontSize:'15px', flexWrap:'wrap'}}> 
                                    <div style={{paddingLeft:'30px'}}>
                                        <h2 style={{fontSize:'16px', fontWeight:500,}}>Module 2: Project Design</h2>
                                        <p style={{color:'rgba(80,80,80,0.8)', maxWidth:'700px'}}>
                                            This will help to govern the project of your choice .. .. .. .. ... ... .....
                                            This will help to govern the project of your choice .. .. .. .. ... ... .....
                                            This will help to govern the project of your choice .. .. .. .. ... ... .....
                                            This will help to govern the project of your choice .. .. .. .. ... ... .....
                                            This will help to govern the project of your choice .. .. .. .. ... ... .....
                                            This will help to govern the project of your choice .. .. .. .. ... ... .....
                                            This will help to govern the project of your choice .. .. .. .. ... ... .....
                                            This will help to govern the project of your choice .. .. .. .. ... ... .....
                                            This will help to govern the project of your choice .. .. .. .. ... ... .....
                                            This will help to govern the project of your choice .. .. .. .. ... ... .....
                                            This will help to govern the project of your choice .. .. .. .. ... ... .....
                                            This will help to govern the project of your choice .. .. .. .. ... ... .....
                                        </p> 
                                    </div>
                                    <div style={{display:'flex', justifyContent:'space-between', gap:'15px', flexWrap:'wrap', minWidth:'250px', padding:'10px 0px',borderBottom:'1px solid rgba(100,100,100,0.8)',color:'rgba(80,80,80,0.8)',height:'fit-content'}}>
                                        <div style={{display:'flex', gap:'7px'}}>
                                            <span>Video Session Cost</span>
                                        </div>
                                        <div style={{fontWeight:600}}>
                                            1,700Tsh
                                        </div>
                                    </div>
                                </div>

                                <div style={{display:'flex', gap:'10px', alignItems:'', justifyContent:'space-between', fontSize:'15px', flexWrap:'wrap'}}> 
                                    <div style={{paddingLeft:'30px'}}>
                                        <h2 style={{fontSize:'16px', fontWeight:500,}}>
                                            Module 3: Data Evaluation
                                        </h2>
                                    </div>
                                    <div style={{display:'flex', justifyContent:'space-between', gap:'15px', flexWrap:'wrap', minWidth:'250px', padding:'10px 0px',borderBottom:'1px solid rgba(100,100,100,0.8)',color:'rgba(80,80,80,0.8)',height:'fit-content'}}>
                                        <div style={{display:'flex', gap:'7px'}}>
                                            <span>Reading Session Cost</span>
                                        </div>
                                        <div style={{fontWeight:600}}>
                                            1,000Tsh
                                        </div>
                                    </div>
                                </div>

                                <div style={{display:'flex', gap:'10px', alignItems:'', justifyContent:'space-between', fontSize:'15px', flexWrap:'wrap'}}> 
                                    <div style={{paddingLeft:'30px'}}>
                                        <h2 style={{fontSize:'16px', fontWeight:500,}}>Module 4: Data Collection    
                                        </h2>
                                        <p style={{color:'rgba(80,80,80,0.8)', maxWidth:'700px'}}>
                                            This will help to govern the project of your choice .. .. .. .. ... ... .....
                                        </p>
                                    </div>
                                    <div style={{display:'flex', justifyContent:'space-between', gap:'15px', flexWrap:'wrap', minWidth:'250px', padding:'10px 0px',borderBottom:'1px solid rgba(100,100,100,0.8)',color:'rgba(80,80,80,0.8)',height:'fit-content'}}>
                                        <div style={{display:'flex', gap:'7px'}}>
                                            <span>Video Session Cost</span>
                                        </div>
                                        <div style={{fontWeight:600}}>
                                            23,000Tsh
                                        </div>
                                    </div>
                                </div>

                            </section>
                        </div>

                        {/** Who should take this course */}
                        <div style={{display:'flex', flexDirection:'column',gap:'10px', maxWidth:'700px', fontSize:'15px', color:'rgba(24, 23, 23, 0.8)'}}>
                            <h2 style={{textAlign:'left', color:'black'}}>
                                Who Should Take This Course
                            </h2>
                            <div>
                                Choice .. .. .. .. ... ... ..... This will help to govern the project of your choice .. .. .. .. ... ... ..... This will help to govern the project of your choice .. .. .. .. ... ... ..... This will help to govern the project of your choice .. .. .. .. ... ... ..... This will help to govern the project of your choice .. .. .. .. ... ... .....
                            </div>
                            <h2 style={{textAlign:'left', color:'black', fontSize:'17px'}}>
                                Click Enroll Now to get started
                            </h2>
                        </div>
                        {/** Hint */}
                        <div style={{display:'flex', flexDirection:'column',gap:'10px',maxWidth:'900px'}}>
                            <h2 style={{textAlign:'left'}}>
                                Hint
                            </h2>
                            <p style={{boxShadow:'1px 0.5px 5px #0c2b4e96', padding:'20px', borderRadius:'40px', cursor:'pointer'}}>
                                Costs (TZS 50,000 for company name reservation and minimum amount of TZS 20,000 and
                                maximum 550,000 depending on the nature of company and initial capital invested)
                            </p>
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