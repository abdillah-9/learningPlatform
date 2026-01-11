import { useContext, useEffect, useState } from "react";
import { BsBook, BsFacebook, BsLinkedin, BsWhatsapp } from "react-icons/bs";
import pic1 from '../assets/pic1.webp';
import pic2 from '../assets/pic2.webp';
import pic3 from '../assets/pic3.webp';
import pic4 from '../assets/pic4.webp';
import pic5 from '../assets/pic5.webp';
import pic6 from '../assets/pic6.jpeg';
import pic7 from '../assets/pic7.jpg';
import man from '../assets/icon.jpeg';
import woman from '../assets/woman.png';
import pic9 from '../assets/pic9.jpeg';
import AI_Gen_2 from '../assets/AI Gen 2.webp';
import { CgChevronDoubleLeft, CgChevronDoubleRight } from "react-icons/cg";
import '../Homepage.css';
import Sospeter from '../assets/Sospeter.webp';
import SospeterNew from '../assets/SospeterNew.jpg';
import MwangazaLogo from '../assets/MwangazaLogo.jpg';
import { PiArrowBendUpRightThin } from "react-icons/pi";
import { HiArrowRight, HiMiniArrowLongRight, HiUser } from "react-icons/hi2";
import { BookAIcon, BookOpenCheckIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

export default function Home(){
  const [coursesList, setCoursesList] = useState([]);
  const decodeHTML = (encoded) => {
  try {
    return decodeURIComponent(escape(atob(encoded)));
  } catch {
    return encoded; // fallback for old DB rows
  }
};

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

  const navigateTo = useNavigate();
  if(!coursesList){
    return
  }

  return(
    <div>
      {/** SLIDESHOW */}
      <SlideShow />
      {/** POPULAR Courses */}
      <PopularCourses coursesList={coursesList} decodeHTML={decodeHTML}/>
    
      {/** StartJourney */}
      <StartJourney />

      {/** Testimonials */}
      <Testimonials />

      {/** Footer */}
      <Footer />
    </div>

  )
}

function SlideShow() {
  const navigateTo = useNavigate();
  const [animate, setAnimate] = useState(true);
  const [index, setIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);

  const images = [pic1, pic2, pic3, pic4, pic5];
  const texts = [
    "Own your company and be your own C.E.O",
    "It's 21st Century, Pursue a Business Opportunity Through Creation of a Company",
    "Money Without Financial Intelligence Is Money Gone Soon",
    "An Asset Puts Money in Your Pocket, Liability Takes Money Out of Your Pock",
    "Embrace a Mindset of Lifelong, Voluntary Pursuit of New Knowledge"
  ];
  const headings = [
    "Brela and Business Registration",
    "Shaping a Business Opportunity ",
    "Financial Literacy ",
    "Intelligent Spending ",
    "Upgrade Your Mindset and Productivity "
  ];

  // Preload all images
useEffect(() => {
  const temp = new Array(images.length);
  let loadedCount = 0;

  images.forEach((src, index) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      temp[index] = img;     // ✔️ always keep original order
      loadedCount++;
      if (loadedCount === images.length) {
        setLoadedImages(temp);
        setAllLoaded(true);
      }
    };
  });
}, []);


  // Auto-slide only after images loaded
  useEffect(() => {
    if (!allLoaded) return;
    const timer = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % loadedImages.length);
        setAnimate(true);
      }, 20);
    }, 7000);
    return () => clearInterval(timer);
  }, [allLoaded]);

  const next = () => {
    if (!allLoaded) return;
    setAnimate(false);
    setTimeout(() => {
      setIndex(prev => (prev + 1) % loadedImages.length);
      setAnimate(true);
    }, 20);
  };

  const prev = () => {
    if (!allLoaded) return;
    setAnimate(false);
    setTimeout(() => {
      setIndex(prev => (prev - 1 + loadedImages.length) % loadedImages.length);
      setAnimate(true);
    }, 20);
  };

  if (!allLoaded) {
    // Placeholder while images load
    return <div style={{ height: "400px", width: "100%", backgroundColor: "#eee" }} />;
  }

  return (
    <div className={`slideShowHeight ${animate ? 'slideScale' : ''}`} style={{ width: "100vw", position: "relative", overflow: "hidden",height:'100%' }}>
      {/* Top nav bar */}
      <div style={{position:'relative', top:0, left:0, width:'100%', height:'fit-content',minHeight:'80px', backgroundColor:'#253957',color:'white',zIndex:1, display:'flex', justifyContent:'space-between',padding:'10px 15px', alignItems:'center', flexWrap:'wrap', gap:'15px'}}>
        <div style={{display:'flex',gap:'10px',height:'fit-content', alignItems:'center'}}>
            <img src={MwangazaLogo} alt="logo"                      width={'60px'} height={'60px'} style={{borderRadius:'50%'}} />
          <span style={{fontSize:'17px', fontWeight:600, textAlign:'center'}}> Mwangaza Knowledge Hub</span>
        </div>
        <div style={{display:'flex', gap:'50px', fontSize:'14px',fontWeight:500}}> <span style={{cursor:'pointer'}} onClick={()=>{navigateTo('/about')}}>About Us </span> <span style={{cursor:'pointer'}} onClick={()=>{navigateTo('/view_all_courses')}}>View All Courses</span> 
        </div>
      </div>
      {/* Image */}
      <div style={{ position: 'relative', width: '100%', height:'auto', aspectRatio:16/9}}>
        <img
          src={loadedImages[index].src}
          alt="slide"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
        />
      </div>

{/* Reverse Circular Darkening Overlay */}
<div
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",

    background: `
      radial-gradient(
        circle at center,
        rgba(0, 0, 0, 0.55) 0%,
        rgba(0, 0, 0, 0.30) 35%,
        rgba(0, 0, 0, 0.20) 60%,
        rgba(0, 0, 0, 0.60) 80%,
        rgba(0, 0, 0, 0.85) 100%
      )
    `
  }}
/>


      {/* Heading */}
      <div className={`${animate ? 'slideTop PicTop' : ''}`} style={{ ...topSlideshowTexts, color: 'white',fontWeight:500 }}>
        <div className="PicFont" style={{fontWeight:700}}>{headings[index]}</div>
        <div className="PicFontMini">{texts[index]}</div>
      </div>

      {/* NEXT/PREV BUTTONS */}
      <div className="PicTop" style={{ position: "absolute", top: "50vh", left: '2%', transform: "translateY(-50%)", zIndex: 10, borderRadius: '50%', padding: '10px 13px', backgroundColor: '#253957', cursor: 'pointer' }} onClick={prev}>
        <CgChevronDoubleLeft style={{ fontSize: '25px', color: 'white' }} />
      </div>

      <div className="PicTop" style={{ position: "absolute", top: "50vh", right: '2%', transform: "translateY(-50%)", zIndex: 10, borderRadius: '50%', padding: '10px 13px', backgroundColor: '#253957', cursor: 'pointer' }} onClick={next}>
        <CgChevronDoubleRight style={{ fontSize: '25px', color: 'white' }} />
      </div>
    </div>
  );
}

function MiniSlideShow({ items, decodeHTML }) {
  const navigateTo = useNavigate();

  return (
    <div style={{display:'flex', justifyContent:'center', gap:'25px', flexWrap:'wrap',padding:'0px 20px'}}>
      {items.map((item, i) => (
        <div key={i} className="slideShowHeight" style={{ minWidth:'150px',width: "30%", position: "relative", overflow: "hidden",aspectRatio:1/0.85, borderRadius:'5px'}}>
          
          <div style={{ position: 'relative', width: '100%',height:'auto', aspectRatio:16/9, backgroundColor:'#253957' }}>
          <img
            src={ item.picture != null ? `https://www.tanzcoffee.co.tz/mwangaza-backend/${item.picture}` : pic1}
            alt={item.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          </div>

          <div style={{ ...miniSlideshowTexts, color: 'white', backgroundColor:'#253957', width:'100%', display:'flex', flexDirection:'column', gap:'10px', padding:'20px 0px'}} className="heightHover" onClick={()=>{navigateTo(`enroll_course/${item.id}`)}}>
            <div style={{fontSize:'15px'}}>
              {item.name}
            </div>
            <div style={{fontSize:'13px', color:'rgba(250, 250, 250, 0.66)',display:'flex', gap:'5px', flexDirection:'column'}} className="opacityHover">
              <span dangerouslySetInnerHTML={{__html:decodeHTML(item.description)}}></span>
              <span style={{display:'flex',alignItems:'center', gap:'10px', justifyContent:'center'}}><span>View Course </span><HiMiniArrowLongRight style={{fontSize:'25px'}}/></span>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}

function UltraMiniSlideShow() {
  const [animate, setAnimate] = useState(true);
  const [index, setIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);

  const images = [man, woman];
  const texts = [
    `As a graphic designer, I have created posters, company profiles and stickers for TanzCoffee Trading Company Ltd, Brice Agribusiness Limited, and many other companies. However, I must admit that during my years of freelancing, Sospeter introduced me to this platform, where I learned a lot. Today, I have opened and registered my own sole proprietorship, and I can tell you that registering a business has taken me from creating simple posters to receiving large contracts to create larger roadside billboards, company t-shirts, calendar design and printing.

    In fact, I have an office at Mavuno House, Poster Dar es Salaam. I am also working on upgrading from sole proprietorship to a corporate limited liability company`,

    `Following my graduation from University, I struggled to get employment as usual before being introduced to Mwangaza Knowledge Hub. I began studying Shaping a Business Idea slowly, and I was excited to discover that we university students are not taught several important details about business. I currently own my own business in town, and while I hope to open a limited liability corporation in the future, I am currently working to register a sole proprietorship very soon.`,
  ];
  const names=[
    'BAKARI M BAKARI',
    `ASIA L. KASUBI`,
  ]
  const positions=[
    'Founder & Managing Director',
    `Founder`,
  ]
  const companies=[
    'Brain Media Tech',
    `Asmarah Radiance`,
  ]
  // Preload all images
useEffect(() => {
  const temp = new Array(images.length);
  let loadedCount = 0;

  images.forEach((src, index) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      temp[index] = img;     // ✔️ always keep original order
      loadedCount++;
      if (loadedCount === images.length) {
        setLoadedImages(temp);
        setAllLoaded(true);
      }
    };
  });
}, []);


  // Auto-slide only after images loaded
  useEffect(() => {
    if (!allLoaded) return;
    const timer = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % loadedImages.length);
        setAnimate(true);
      }, 20);
    }, 7000);
    return () => clearInterval(timer);
  }, [allLoaded]);

  const next = () => {
    if (!allLoaded) return;
    setAnimate(false);
    setTimeout(() => {
      setIndex(prev => (prev + 1) % loadedImages.length);
      setAnimate(true);
    }, 20);
  };

  const prev = () => {
    if (!allLoaded) return;
    setAnimate(false);
    setTimeout(() => {
      setIndex(prev => (prev - 1 + loadedImages.length) % loadedImages.length);
      setAnimate(true);
    }, 20);
  };

  if (!allLoaded) {
    // Placeholder while images load
    return <div style={{ height: "400px", width: "100%", backgroundColor: "#eee" }} />;
  }

  return (
    <div className={`slideShowHeight ${animate ? 'slideScale' : ''}`} style={{ width: "100vw", position: "relative", overflow: "hidden",height:'100%'}}>
      {/* Image */}
      {/* <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', minHeight:'400px' }}>
        <img
          src={loadedImages[index].src}
          alt="slide"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div> */}

      {/* Text */}
      <div className={`${animate ? 'slideTop' : ''}`} style={{display:'flex', justifyContent:'space-between', flexDirection:'column', gap:'10px'}}>
        <div style={{fontSize:'25px', fontWeight:700, textAlign:'center'}}>
          TESTIMONIALS FROM OUR LEARNERS
        </div>
        {/* <div>Discover what it looks like when organizations approach their work with new skill sets &  support ready for challenges and confident to lead.
        </div> */}
        <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', flexDirection:'column'}}>
          <div style={{width:'85%', display:'flex', gap:'10px', flexDirection:'column',alignItems:'center', paddingTop:'20px'}}>
            <span style={{fontSize:'20px', fontWeight:700}}>
              {names[index]}
            </span>
            <span style={{padding:'17px 20px', backgroundColor:'rgba(200,200,200,0.8)', borderRadius:'50%' }}>
              <HiUser style={{color:'rgba(10, 5, 52, 1)', fontSize:'70px'}}/>
            </span>
            {/* <img src={images[index]} alt="Sospeter" width={'30%'} height={'auto'} style={{borderRadius:'50%', aspectRatio:1/1, border:'6px solid #253957'}}/> */}
            <span style={{fontSize:'17px', fontWeight:600}}>
              {positions[index]}
            </span> 
            <span style={{fontSize:'17px', fontWeight:400, color:'rgba(227, 227, 241, 1)'}}>
              {companies[index]}
            </span> 
            <span  style={{fontSize:'15px', fontWeight:200}}>
              {texts[index]}
            </span>
          </div>
        </div>
      </div>

      {/* NEXT/PREV BUTTONS */}
      <div style={{ position: "absolute", top: "50%", left: '0%', transform: "translateY(-50%)", zIndex: 10, borderRadius: '50%', padding: '7px 10px', backgroundColor: '#253957', cursor: 'pointer' }} onClick={prev}>
        <CgChevronDoubleLeft style={{ fontSize: '25px', color: 'white' }} />
      </div>

      <div style={{ position: "absolute", top: "50%", right: '0%', transform: "translateY(-50%)", zIndex: 10, borderRadius: '50%', padding: '7px 10px', backgroundColor: '#253957', cursor: 'pointer' }} onClick={next}>
        <CgChevronDoubleRight style={{ fontSize: '25px', color: 'white' }} />
      </div>
    </div>
  );
}

function PopularCourses({coursesList, decodeHTML}){

if(!coursesList){
  return;
}
  const [index, setIndex] = useState(0); // 0, 3, 6

  const next = () => {
    setIndex((prev) => (prev + 3) % coursesList.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 3 + coursesList.length) % coursesList.length);
  };

  // slice 3 items
  const itemsToShow = coursesList.slice(index, index + 3);

  return(
    <div style={{display:'flex',gap:'45px', flexDirection:'column', padding:'50px 20px'}}>
      <div style={{fontWeight:700, fontSize:'20px', padding:'10px 13px 0px 13px', display:'flex', flexDirection:'column', gap:'10px'}}>
        <span>
          COURSES
        </span>
      <span style={{padding:'10px 12px', fontStyle:'italic', fontWeight:500, borderRadius:'20px', border:'1px solid #0b0232a5', width:'fit-content', fontSize:'16px'}}>
        Click on your favorite course to get started
      </span>
      </div>
      
      <div style={{display:'flex', width:'100%',  alignItems:'center'}}>
        
        <div style={{ zIndex: 10, borderRadius: '50%', padding: '7px 10px', backgroundColor: '#253957', cursor: 'pointer', height:'fit-content' }} onClick={prev}>
          <CgChevronDoubleLeft style={{ fontSize: '25px', color: 'white' }} />
        </div>

        <MiniSlideShow items={itemsToShow} decodeHTML={decodeHTML}/>

        <div style={{zIndex: 10, borderRadius: '50%', padding: '7px 10px', backgroundColor: '#253957', cursor: 'pointer', height:'fit-content' }} onClick={next}>
          <CgChevronDoubleRight style={{ fontSize: '25px', color: 'white' }} />
        </div>

      </div>
    </div>
  );
}


function StartJourney(){
  const navigateTo = useNavigate();
  return(
    <div style={{width:'100%', height:'fit-content', display:'flex', justifyContent:'center', alignItems:'center', padding:'50px 20px', backgroundColor:'#253957', gap:'20px', flexDirection:'column', color:'white'}}>
      <div style={{fontSize:'22px', fontWeight:700}}>Upcoming Courses</div>
      <div>Stay With Us</div>
      <div style={{backgroundColor:'white', color:'#253957', padding:'15px', width:'150px', borderRadius:'15px', textAlign:'center',fontWeight:600, cursor:'pointer'}} onClick={()=>navigateTo('/upcoming_courses')}>
        View
      </div>
    </div>
  )
}

function Testimonials(){
  return(
    <div style={{display:'flex', flexWrap:'wrap', gap:'50px', margin:'50px 0px'}}>
      <div style={{display:'flex', flexDirection:'column', gap:'10px', width:'45%', flexGrow:1, minWidth:'250px', padding:'20px'}}>
        {/* <div style={{style:'20px ', fontWeight:500}}>Mr SosPeter Owur</div> */}
        <div style={{fontSize:'25px ', fontWeight:700, display:'flex', flexDirection:'column', gap:'10px',alignItems:"center"}}>
          <span>ABOUT FOUNDER</span>
          <img src={SospeterNew} alt="Sospeter" style={{borderRadius:'50%', aspectRatio:3/3, width:'30%',minWidth:'200px' ,objectFit:'cover'}}/>
        </div>
        <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', textAlign:'justify', gap:'15px'}}>
          <div style={{width:'100%', flex:'1 1 250px',gap:'30px', display:'flex', flexDirection:'column'}}> 
            <p>
              Sospeter Owuor is a visionary businessman, investor, and corporate leader whose focuses is modernizing Tanzania's agricultural sector to meet global standards. He has extensive experience in agricultural value chains, export operations, agro-processing and international trade. As the acting Managing Director and Co-Founder of TANZCOFFEE TRADING COMPANY LTD, he provides strategic leadership in operations, commercial development, and organizational expansion.
            </p>
            <p>
              He previously co-founded Brice Agribusiness Ltd and Brice Agribusiness UK, a London-based company branch where he served as Operations Director, following his resignation from Room to Read Tanzania. He effectively managed and coordinated exports to international markets, including South Africa, China, and Turkey.
            </p>
            <p>
              Before resigning and transitioning fully into business, Sospeter built a solid foundation in management and research while working with Room to Read Tanzania as a Research, Monitoring, and Evaluation (RME) Associate from 2018 to 2023, overseeing data analysis, program evaluation and performance measurement.
            </p>
          </div>
        </div>
      </div>
      <div style={{ width:'45%', flexGrow:1, minWidth:'250px',display:'flex', padding:'20px', background:'#253957', color:'white'}}>
        <UltraMiniSlideShow/>
      </div>
    </div>
  )
}

function Footer(){
    const navigateTo = useNavigate();
    const {userData} = useContext(AuthContext);
  return(
    <div style={{backgroundColor:'#253957', display:'flex', flexWrap:'wrap', color:'white', padding:'30px', justifyContent:'space-around', gap:'40px'}}>
      <div style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'30%', minWidth:'300px', gap:'20px'}}>
        <div style={{display:'flex',gap:'5px', flexDirection:'column', justifyContent:'center'}}>
          <span style={{display:'block',left:'95px', position:'relative'}}>
            <img src={MwangazaLogo} alt="logo" width={'60px'} height={'auto'} style={{aspectRatio:1/0.95, borderRadius:'50%'}} />
          </span>
          <span style={{fontSize:'22px', fontWeight:500}}> Mwangaza Knowledge Hub</span>
        </div>
        <div>
            Building a Generation of Founders and C.E.Os
        </div>
        <div style={{display:"flex", gap:'15px'}}>
          <span><BsFacebook/></span>
          <span><BsWhatsapp/></span>
          <span><BsLinkedin/></span>
        </div>
      </div>

      <div style={{display:'flex', flexDirection:'column',width:'30%', minWidth:'300px', gap:'20px'}}>
        <div style={{display:'flex',gap:'5px', flexDirection:'column',}}>
          <span style={{fontSize:'22px', fontWeight:500}}>Quick links</span>
        </div>
        <div style={{display:'flex', gap:'15px', flexDirection:'column'}}>
          <span style={{cursor:'pointer'}} onClick={()=>{navigateTo('/about')}}>About Us</span>
          {/* <span>Terms Of Use</span>
          <span>Privacy</span> */}
        </div>
      </div>

      <div style={{display:'flex', flexDirection:'column', width:'30%', minWidth:'300px', gap:'20px'}}>
        <div style={{display:'flex',gap:'5px', flexDirection:'column', justifyContent:'center'}}>
          <span style={{fontSize:'22px', fontWeight:500}}>Company</span>
        </div>
        <div style={{display:'flex', gap:'15px', flexDirection:'column'}}>
          <span onClick={()=>navigateTo('/view_all_courses')} style={{cursor:'pointer'}}>
            Courses
          </span>
          {
            userData?.user_role == 'admin' ?
            <span onClick={()=>{navigateTo("/enroll_course/admin/main_App/moduleId/admin")}} style={{cursor:'pointer'}}>Admin</span>:""
          }
        </div>
      </div>

    </div>
  )
}

const topSlideshowTexts = {
  position: "absolute",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontWeight: "500",
  textAlign: "center",
  width: "90%",
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
