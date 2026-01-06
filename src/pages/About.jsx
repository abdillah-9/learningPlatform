import React from 'react'
import aboutPic1 from '../assets/countryside-workers-out-field.webp';
import { FaPeopleGroup } from 'react-icons/fa6';
import { PiPlantFill } from 'react-icons/pi';
import { FaTractor } from 'react-icons/fa';
import MwangazaLogo from '../assets/MwangazaLogo.jpg';
import aboutImage from '../assets/aboutImage.jpeg';
import miniAboutImage from '../assets/miniAboutImage.jpeg';
import { RiHome9Fill, RiTwitterXFill } from 'react-icons/ri';
import { IoIosMail, IoMdCall } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export default function About(){
  const navigateTo = useNavigate();
  return(
<div style={{ display: "flex",flexDirection:'column'}}>
    {/* Top nav bar */}
    <div style={{position:'absolute', top:0, left:0, width:'100%', minHeight:'80px',height:'fit-content', backgroundColor:'#0C2B4E',color:'white',zIndex:1, display:'flex', justifyContent:'space-between',padding:'0px 15px', alignItems:'center', flexWrap:'wrap', gap:'25px'}}>
      <div style={{display:'flex',gap:'10px',height:'fit-content', alignItems:'center', flexGrow:1}}>
          <img src={MwangazaLogo} alt="logo" width={'60px'} height={'60px'} style={{borderRadius:'50%'}} />
        <span style={{fontSize:'21px', fontWeight:600}}> MWANGAZA BUSINESS & INVESTMENT SCHOOL</span>
      </div>
      <div style={{display:'flex', gap:'20px', fontSize:'18px',fontWeight:500}}>
        <span style={{cursor:'pointer'}} onClick={()=>{navigateTo('/view_all_courses')}}>
          View All Courses
        </span> 
        <div style={{marginRight:'10px',padding:'10px 5px',borderRadius:'50px', display:'flex', justifyContent:'center', alignItems:'center', textAlign:'center', fontSize:"11px", fontWeight:900, cursor:'pointer', gap:'4px'}} onClick={()=>navigateTo('/')}>
          <RiHome9Fill style={{fontSize:'13px'}}/> <span>Home</span>  
        </div> 
      </div>
    </div>

    {/** Huge Image */}
    <div style={{height:'calc(100vh)',width:'100vw', position:'relative', overflow:'hidden'}}>
      <img src={aboutImage} alt='pic' width={'100%'} height={'100%'} style={{aspectRatio:1/0.55}}/>
      <div style={{position:'absolute', top:0, left:0, width:'100%', height:'100%',backgroundColor:'rgba(1, 1, 54, 0.5)', color:'white', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', gap:'50px'}}>
        <h1 style={{fontSize:'40px'}}>About Us</h1>
        <p>Description here ...</p>
      </div>
    </div>

    {/** Main About Part*/}
    <div style={{display:'flex', flexWrap:'wrap'}}>
      <div  style={{flex:'1 1 250px', padding:'15px', color:'rgba(5, 5, 49, 0.9)', gap:'15px', fontWeight:200, display:'flex', flexDirection:'column'}}>
        <h2>ABOUT US</h2>
        <p>
          Building A Generation of Business Founders and C.E.O
          We are a business and investment educational hub, offering real-ground business expertise from real entrepreneurs and businessmen. These are skills that you won't learn in business school.
        </p>
        <p>
          We are a non-certificate eLearning Platform, our aim is to build the next generation of business founders and C.E.O not particularly employees. 
          As a team with a variety of expertise, we charge between TZS 3,500 and TZS 5,000 to cover platform operating expenses.
        </p>
        <p>
          One might ask, why should I bother improving my financial IQ? "Just to have more options," I reply. Significant global changes will occur in coming years, and if you don't adapt, it will be a frightening period. In the real world, something more than just school grades are required.
        </p>
      </div>
      <img src={miniAboutImage} alt='pic' style={{flex:'1 1 250px', aspectRatio:1/0.9}} />

    </div>

    {/** Last Div */}
    <div style={{display:'flex', flexWrap:'wrap', backgroundColor:'#0C2B4E', alignItems:'center', padding:'15px', justifyContent:'space-between'}}>
      <div  style={{flex:'1 1 250px', padding:'15px', color:'rgba(235, 235, 240, 0.9)', gap:'15px', fontWeight:200, display:'flex', flexDirection:'column', maxWidth:'700px'}}>
        <h2>What’s Ahead</h2>
        
        <div>• You’ll learn how to identify and evaluate potential business opportunities, particularly focusing on existing social problems. The pursuit of opportunity without regard to resources you currently control.</div>
        <div>• You’ll learn about the various legal forms of business organization, their pros and cons, and decide which organization is best for your venture. How to comply with authority legal compliance.</div>
        <div>• You’ll learn how key components of the enterprise work together to make money and how to begin to test your business model with real customers. Step-by-step process for formulating strategy and aligning business activities with it.</div>
        <div>• You’ll learn how to write a Business Plan or Investors Pitch Deck that incorporates all elements of your business idea, explaining the opportunity, target market, and all details about how your business expects to pursue the opportunity.</div>
        <div>• You’ll learn the financing requirements that businesses typically encounter in the first phase of their life cycles and how to get the funding to finance these various stages of your enterprise.
        </div> 
        <div>
        • It also focuses on rapidly growing firms and their need for external capital specifically the role of investment banks.
        </div>
        <div>
          • You’ll learn the effects of business growth and the and strategic aspects of dealing with growth.
        </div>
      </div>
      <div style={{border:'0px solid red', flex:'1 1 250px', alignItems:'center', justifyContent:'center', display:'flex'}}>
        <img src={MwangazaLogo} alt='pic' height={'230px'} width={'250px'} style={{borderRadius:'50%'}} />
      </div>
    </div>

    {/** Footer */}
    <footer style={{backgroundColor:'#061424ff', display:'flex', justifyContent:'space-between', padding:'40px 50px 20px 50px', color:'white', flexWrap:'wrap', gap:"15px"}}>

        {/** Logo and company name */}
        <div style={{fontSize:'20px', fontWeight:500, display:'flex', flexDirection:'column', alignItems:'center'}}>
            <img src={MwangazaLogo} alt="logo" width={'60px'} height={'auto'} style={{aspectRatio:1/0.95, borderRadius:'50%'}} />
            <span>
                MWANGAZA BUSINESS & INVESTMENT SCHOOL
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
