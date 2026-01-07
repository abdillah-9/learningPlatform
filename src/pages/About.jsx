import React from 'react'
import { FaBook } from 'react-icons/fa6';
import MwangazaLogo from '../assets/MwangazaLogo.jpg';
import aboutImage from '../assets/About1.jpeg';
import miniAboutImage from '../assets/About2.jpg';
import { RiTwitterXFill } from 'react-icons/ri';
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
      <div style={{display:'flex', gap:'15px', fontSize:'18px',fontWeight:500}}>
        <div style={{marginRight:'10px',padding:'10px 5px',borderRadius:'50px', display:'flex', justifyContent:'center', alignItems:'center', textAlign:'center', fontSize:"16px", fontWeight:600, cursor:'pointer', gap:'4px'}} onClick={()=>navigateTo('/')}>
          <span>Home</span>  
        </div> 
        <div style={{marginRight:'10px',padding:'10px 5px',borderRadius:'50px', display:'flex', justifyContent:'center', alignItems:'center', textAlign:'center', fontSize:"16px", fontWeight:600, cursor:'pointer', gap:'4px'}} onClick={()=>{navigateTo('/view_all_courses')}}>
          <span>All Courses</span>  
        </div> 
      </div>
    </div>

    {/** Huge Image */}
    <div style={{height:'calc(100vh)',width:'100vw', position:'relative', overflow:'hidden'}}>
      <img src={aboutImage} alt='pic' width={'100%'} height={'100%'} style={{aspectRatio:16/9, objectFit:'cover'}}/>
      <div style={{position:'absolute', top:0, left:0, width:'100%', height:'100%',backgroundColor:'rgba(1, 1, 54, 0.5)', color:'white', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', gap:'50px'}}>
        <h1 style={{fontSize:'40px'}}>About Us</h1>
        <p>Building a Generation of Founders and C.E.Os</p>
      </div>
    </div>

    {/** Main About Part*/}
    <div style={{display:'flex', flexWrap:'wrap', alignItems:'flex-start'}}>
      <div  style={{flex:'1 1 250px', padding:'15px', color:'rgba(5, 5, 49, 0.9)', gap:'15px', fontWeight:200, display:'flex', flexDirection:'column'}}>
        <h2>ABOUT US</h2>
        <p>
          We are a knowledge hub for business and investment, offering real-ground business experience and practical skills from real entrepreneurs and businessmen. The platform will impact a self-productive habit and a strong business mindset, both of which are necessary in the real world.
        </p>
        <p>
          Our goal as a non-certificate eLearning platform is to give people the knowledge and insightful information they need to become C.E.Os and business FOUNDERS, not particularly employees.
        </p>
        <p>
          As a team with a variety of expertise, we charge between TZS 5,000 and TZS 10,000 per module and TZS 25,000 to TZS 35,000 per course to cover platform operating expenses.
        </p>
        <p style={{fontStyle:'italic'}}>
          One might ask, why should I bother improving my knowledge? "Just to have more options," I reply. Significant global changes will occur in coming years, for example, AI might cause unemployment crisis and if you don't adapt, it will be a frightening period.
        </p>
        <p>
          In the real world, something more than just school grades are required.
        </p>
      </div>
      <div style={{width:'50%',maxWidth:'400px', aspectRatio:16/9}}>
        <img src={miniAboutImage} alt='pic' style={{width:'100%', height:'100%', objectFit:'cover'}} />
      </div>
    </div>

    {/** Last Div */}
    <div style={{display:'flex', flexWrap:'wrap', backgroundColor:'#0C2B4E', alignItems:'center', padding:'15px', justifyContent:'space-between'}}>
      <div  style={{flex:'1 1 250px', padding:'15px', color:'rgba(235, 235, 240, 0.9)', gap:'15px', fontWeight:200, display:'flex', flexDirection:'column', maxWidth:'700px'}}>
        <h2>What’s Ahead</h2>
        
        <div>
          •	You’ll learn that your mindset directs your habits, and your habits contributes greatly on your results.
        </div>
        <div>
          •	You’ll learn that goals are good for setting direction, but systems are best for making progress. It unwise to spend too much time thinking about your goals and not enough time designing your systems. 
        </div>
        <div>
          •	You’ll learn how identify and evaluate potential business opportunities particularly focusing on the existing social problem. The pursuit of opportunity without regard to resources you currently control. 
        </div>
        <div>
          • You’ll learn how to write a Business Plan or Investors Pitch Deck that incorporates all elements of your business idea, explaining the opportunity, target market, and all details about how your business expects to pursue the opportunity.
        </div>
        <div>
          •	You’ll learn about the various legal forms of business organization, their pros and cons and decide which organization is best for your venture. How to register your enterprise and comply with authority legal requirements. 
        </div> 
        <div>
          •	You’ll learn the financing requirements that businesses typically encounter in the first phase of their life cycles and how to get the funding to finance these various stages of your enterprise. 
        </div>
        <div>
          •	It also focuses on rapidly growing firms and their need for external capital specifically the role of investment banks.
        </div>
        <div>
          •	You’ll learn how key components of the enterprise work together to make money and how to begin to test your business model with real customers. You’ll learn about processes for formulating strategy and aligning business activities with it. 
        </div>
        <div>
          •	You’ll learn how to write a Business Plan or Investors Pitch Deck that incorporates all elements of your business idea, explaining the opportunity, target market and all details about how your business expects to pursue the opportunity.
        </div>
        <div>
          •	You’ll learn the effects of business growth and the strategic aspects of dealing with growth.
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
