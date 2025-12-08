import { useNavigate } from 'react-router-dom';
import MwangazaLogo from '../assets/MwangazaLogo.jpg';
import pic3 from '../assets/pic3.jpeg';
import { MdArrowDropDown } from 'react-icons/md';
import { HiMiniArrowLongRight } from 'react-icons/hi2';
import pic1 from '../assets/pic1.jpeg';

export default function ViewAllCourses(){
    const navigateTo = useNavigate();
    return(
        <div>
            {/* Top nav bar */}
            <div style={{position:'absolute', top:0, left:0, width:'100%', height:'80px', backgroundColor:'#0C2B4E',zIndex:1, display:'flex', color:'white',justifyContent:'space-between',padding:'0px 15px', alignItems:'center'}}>
                <div style={{display:'flex',gap:'10px',height:'fit-content', alignItems:'center'}}>
                    <img src={MwangazaLogo} alt="logo"                      width={'60px'} height={'60px'} style={{borderRadius:'50%'}} />
                <span style={{fontSize:'21px', fontWeight:600}}> MWANGAZA BUSINESS & INVESTMENT SCHOOL</span>
                </div>
                <div style={{display:'flex', gap:'50px', fontSize:'18px',fontWeight:500, alignItems:'center'}}> 
                    <span style={{cursor:'pointer'}} onClick={()=>{navigateTo('/about')}}>Courses </span>
                    <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                        <img src={pic3} alt='pic' width={'50px'} height={'45px'} style={{borderRadius:'50%'}}/>
                        <span>Alex Daniel</span>  
                        <span style={{fontSize:'20px'}}><MdArrowDropDown/></span>   
                    </div> 
                </div>
            </div>

            {/** Main Courses  */}
            <div style={{display:'flex', width:'100%', gap:'20px', paddingTop:'100px', flexWrap:'wrap'}}>
                <div className="slideShowHeight" style={{flex:'1 1 250px', position: "relative", overflow: "hidden",aspectRatio:1/0.85, borderRadius:'5px'}}>
                          
                    <div style={{ position: 'relative', width: '100%',height:'100%' }}>
                    <img
                        src={pic1}
                        alt="slide"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    </div>
        
                    <a style={{ ...miniSlideshowTexts, color: 'white', backgroundColor:'#0C2B4E', width:'100%', display:'flex', flexDirection:'column', gap:'15px', padding:'20px 0px'}} className="heightHover" href="/enroll_course">
                    <div>
                        {"This is Heading"}
                    </div>
                    <div style={{fontSize:'15px', color:'rgba(250, 250, 250, 0.66)',display:'flex', gap:'5px', flexDirection:'column'}} className="opacityHover">
                        <span>{"Moderate description here ..."}</span>
                        <span style={{display:'flex',alignItems:'center', gap:'10px'}}><span>View Course </span><HiMiniArrowLongRight style={{fontSize:'25px'}}/></span>
                    </div>
                    </a>
        
                </div>

                <div className="slideShowHeight" style={{flex:'1 1 250px', position: "relative", overflow: "hidden",aspectRatio:1/0.85, borderRadius:'5px'}}>
                          
                    <div style={{ position: 'relative', width: '100%',height:'100%' }}>
                    <img
                        src={pic1}
                        alt="slide"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    </div>
        
                    <a style={{ ...miniSlideshowTexts, color: 'white', backgroundColor:'#0C2B4E', width:'100%', display:'flex', flexDirection:'column', gap:'15px', padding:'20px 0px'}} className="heightHover" href="/enroll_course">
                    <div>
                        {"This is Heading"}
                    </div>
                    <div style={{fontSize:'15px', color:'rgba(250, 250, 250, 0.66)',display:'flex', gap:'5px', flexDirection:'column'}} className="opacityHover">
                        <span>{"Moderate description here ..."}</span>
                        <span style={{display:'flex',alignItems:'center', gap:'10px'}}><span>View Course </span><HiMiniArrowLongRight style={{fontSize:'25px'}}/></span>
                    </div>
                    </a>
        
                </div>

                <div className="slideShowHeight" style={{flex:'1 1 250px', position: "relative", overflow: "hidden",aspectRatio:1/0.85, borderRadius:'5px'}}>
                          
                    <div style={{ position: 'relative', width: '100%',height:'100%' }}>
                    <img
                        src={pic1}
                        alt="slide"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    </div>
        
                    <a style={{ ...miniSlideshowTexts, color: 'white', backgroundColor:'#0C2B4E', width:'100%', display:'flex', flexDirection:'column', gap:'15px', padding:'20px 0px'}} className="heightHover" href="/enroll_course">
                    <div>
                        {"This is Heading"}
                    </div>
                    <div style={{fontSize:'15px', color:'rgba(250, 250, 250, 0.66)',display:'flex', gap:'5px', flexDirection:'column'}} className="opacityHover">
                        <span>{"Moderate description here ..."}</span>
                        <span style={{display:'flex',alignItems:'center', gap:'10px'}}><span>View Course </span><HiMiniArrowLongRight style={{fontSize:'25px'}}/></span>
                    </div>
                    </a>
        
                </div>

                <div className="slideShowHeight" style={{flex:'1 1 250px', position: "relative", overflow: "hidden",aspectRatio:1/0.85, borderRadius:'5px'}}>
                          
                    <div style={{ position: 'relative', width: '100%',height:'100%' }}>
                    <img
                        src={pic1}
                        alt="slide"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    </div>
        
                    <a style={{ ...miniSlideshowTexts, color: 'white', backgroundColor:'#0C2B4E', width:'100%', display:'flex', flexDirection:'column', gap:'15px', padding:'20px 0px'}} className="heightHover" href="/enroll_course">
                    <div>
                        {"This is Heading"}
                    </div>
                    <div style={{fontSize:'15px', color:'rgba(250, 250, 250, 0.66)',display:'flex', gap:'5px', flexDirection:'column'}} className="opacityHover">
                        <span>{"Moderate description here ..."}</span>
                        <span style={{display:'flex',alignItems:'center', gap:'10px'}}><span>View Course </span><HiMiniArrowLongRight style={{fontSize:'25px'}}/></span>
                    </div>
                    </a>
        
                </div>

                <div className="slideShowHeight" style={{flex:'1 1 250px', position: "relative", overflow: "hidden",aspectRatio:1/0.85, borderRadius:'5px'}}>
                          
                    <div style={{ position: 'relative', width: '100%',height:'100%' }}>
                    <img
                        src={pic1}
                        alt="slide"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    </div>
        
                    <a style={{ ...miniSlideshowTexts, color: 'white', backgroundColor:'#0C2B4E', width:'100%', display:'flex', flexDirection:'column', gap:'15px', padding:'20px 0px'}} className="heightHover" href="/enroll_course">
                    <div>
                        {"This is Heading"}
                    </div>
                    <div style={{fontSize:'15px', color:'rgba(250, 250, 250, 0.66)',display:'flex', gap:'5px', flexDirection:'column'}} className="opacityHover">
                        <span>{"Moderate description here ..."}</span>
                        <span style={{display:'flex',alignItems:'center', gap:'10px'}}><span>View Course </span><HiMiniArrowLongRight style={{fontSize:'25px'}}/></span>
                    </div>
                    </a>
        
                </div>

                <div className="slideShowHeight" style={{flex:'1 1 250px', position: "relative", overflow: "hidden",aspectRatio:1/0.85, borderRadius:'5px'}}>
                          
                    <div style={{ position: 'relative', width: '100%',height:'100%' }}>
                    <img
                        src={pic1}
                        alt="slide"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    </div>
        
                    <a style={{ ...miniSlideshowTexts, color: 'white', backgroundColor:'#0C2B4E', width:'100%', display:'flex', flexDirection:'column', gap:'15px', padding:'20px 0px'}} className="heightHover" href="/enroll_course">
                    <div>
                        {"This is Heading"}
                    </div>
                    <div style={{fontSize:'15px', color:'rgba(250, 250, 250, 0.66)',display:'flex', gap:'5px', flexDirection:'column'}} className="opacityHover">
                        <span>{"Moderate description here ..."}</span>
                        <span style={{display:'flex',alignItems:'center', gap:'10px'}}><span>View Course </span><HiMiniArrowLongRight style={{fontSize:'25px'}}/></span>
                    </div>
                    </a>
        
                </div>

                <div className="slideShowHeight" style={{flex:'1 1 250px', position: "relative", overflow: "hidden",aspectRatio:1/0.85, borderRadius:'5px'}}>
                          
                    <div style={{ position: 'relative', width: '100%',height:'100%' }}>
                    <img
                        src={pic1}
                        alt="slide"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    </div>
        
                    <a style={{ ...miniSlideshowTexts, color: 'white', backgroundColor:'#0C2B4E', width:'100%', display:'flex', flexDirection:'column', gap:'15px', padding:'20px 0px'}} className="heightHover" href="/enroll_course">
                    <div>
                        {"This is Heading"}
                    </div>
                    <div style={{fontSize:'15px', color:'rgba(250, 250, 250, 0.66)',display:'flex', gap:'5px', flexDirection:'column'}} className="opacityHover">
                        <span>{"Moderate description here ..."}</span>
                        <span style={{display:'flex',alignItems:'center', gap:'10px'}}><span>View Course </span><HiMiniArrowLongRight style={{fontSize:'25px'}}/></span>
                    </div>
                    </a>
        
                </div>

                <div className="slideShowHeight" style={{flex:'1 1 250px', position: "relative", overflow: "hidden",aspectRatio:1/0.85, borderRadius:'5px'}}>
                          
                    <div style={{ position: 'relative', width: '100%',height:'100%' }}>
                    <img
                        src={pic1}
                        alt="slide"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    </div>
        
                    <a style={{ ...miniSlideshowTexts, color: 'white', backgroundColor:'#0C2B4E', width:'100%', display:'flex', flexDirection:'column', gap:'15px', padding:'20px 0px'}} className="heightHover" href="/enroll_course">
                    <div>
                        {"This is Heading"}
                    </div>
                    <div style={{fontSize:'15px', color:'rgba(250, 250, 250, 0.66)',display:'flex', gap:'5px', flexDirection:'column'}} className="opacityHover">
                        <span>{"Moderate description here ..."}</span>
                        <span style={{display:'flex',alignItems:'center', gap:'10px'}}><span>View Course </span><HiMiniArrowLongRight style={{fontSize:'25px'}}/></span>
                    </div>
                    </a>
        
                </div>

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