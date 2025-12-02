import { useEffect, useState } from "react";
import { BsBook, BsFacebook, BsLinkedin, BsWhatsapp } from "react-icons/bs";
import pic1 from '../assets/african-man-harvesting-vegetables.webp';
import pic2 from '../assets/countryside-workers-out-field.webp';
import pic3 from '../assets/african-man-harvesting-vegetables.webp';
import pic4 from '../assets/countryside-workers-out-field.webp';
import pic5 from '../assets/african-man-harvesting-vegetables.webp';
import AI_Gen_2 from '../assets/AI Gen 2.webp';
import { CgChevronDoubleLeft, CgChevronDoubleRight } from "react-icons/cg";
import '../Homepage.css';
import Sospeter from '../assets/Sospeter.webp';
import { PiArrowBendUpRightThin } from "react-icons/pi";
import { HiArrowRight, HiMiniArrowLongRight } from "react-icons/hi2";
import { BookAIcon, BookOpenCheckIcon } from "lucide-react";

export default function Home(){
  return(
    <div>
      <div style={{width:'100vw', backgroundColor:'rgba(0, 29, 82, 1)',color:'white', padding:'0px 25px', textTransform:'uppercase', fontSize:'20px', fontWeight:500 }}>
        {/** Top nav bar */}
        <nav style={{display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%', height:'90px'}}>
          <div style={{display:'flex', gap:'7px', alignItems:'center'}}> 
            <BsBook/>
            <span>The African Investment School</span>
          </div>
          <div style={{display:'flex', gap:'40px', flexWrap:'wrap',}}>
            <span>About</span>
            <span>Courses</span>
          </div>
        </nav>
      </div>
      {/** SLIDESHOW */}
      <div style={{height:'calc(100vh - 90px)', width:'100vw',position:'relative', backgroundImage:`url(${AI_Gen_2})`, backgroundSize:'cover',backgroundPosition:'center', }}>
        <div style={{position:'absolute', inset: 0, backgroundColor:'rgba(22, 52, 105, 0.7)', justifyContent:'center', alignItems:'center', color:'white', display:'flex', flexDirection:'column', gap:"50px"}}>
          <div style={{textAlign:'center', fontSize:'45px', fontWeight:600, maxWidth:'600px'}}>
            Learning to Change the <span style={{borderBottom:'2px solid white', paddingBottom:'10px'}}>World</span>
          </div>
          <div style={{textAlign:'center', fontSize:'22px', fontWeight:350, maxWidth:'800px'}}>
            Free online courses for anyone making a difference, taught by leading social entrepreneurs and nonprofit leaders.
          </div>
        </div>
      </div>

      {/** POPULAR Courses */}
      <PopularCourses/>
    
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
  const [animate, setAnimate] = useState(true);
  const [index, setIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);

  const images = [pic1, pic2, pic3, pic4, pic5];
  const texts = [
    "Text 1",
    "Text 2",
    "Text 3",
    "Text 4",
    "Text 5"
  ];
  const headings = [
    "Heading 1",
    "Heading 2",
    "Heading 3",
    "Heading 4",
    "Heading 5"
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
      {/* Image */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', minHeight:'400px' }}>
        <img
          src={loadedImages[index].src}
          alt="slide"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
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
        rgba(0, 0, 0, 0.05) 0%,
        rgba(0, 0, 0, 0.20) 35%,
        rgba(0, 0, 0, 0.40) 60%,
        rgba(0, 0, 0, 0.60) 80%,
        rgba(0, 0, 0, 0.75) 100%
      )
    `
  }}
/>


      {/* Heading */}
      <div className={`${animate ? 'slideTop' : ''}`} style={{ ...topSlideshowTexts, color: 'white', top:'30%' }}>
        {headings[index]}
      </div>

      {/* Text */}
      <div className={`${animate ? 'slideTop' : ''}`} style={{ ...topSlideshowTexts, color: 'white', fontSize:'21px' }}>
        {texts[index]}
      </div>

      {/* NEXT/PREV BUTTONS */}
      <div style={{ position: "absolute", top: "50%", left: '2%', transform: "translateY(-50%)", zIndex: 10, borderRadius: '50%', padding: '10px 13px', backgroundColor: 'rgba(0, 29, 82, 0.5)', cursor: 'pointer' }} onClick={prev}>
        <CgChevronDoubleLeft style={{ fontSize: '35px', color: 'white' }} />
      </div>

      <div style={{ position: "absolute", top: "50%", right: '2%', transform: "translateY(-50%)", zIndex: 10, borderRadius: '50%', padding: '10px 13px', backgroundColor: 'rgba(0, 29, 82, 0.5)', cursor: 'pointer' }} onClick={next}>
        <CgChevronDoubleRight style={{ fontSize: '35px', color: 'white' }} />
      </div>
    </div>
  );
}

function MiniSlideShow({ items }) {

  return (
    <div style={{display:'flex', justifyContent:'space-between', gap:'25px', flexWrap:'wrap',padding:'0px 20px'}}>
      {items.map((item, i) => (
        <div key={i} className="slideShowHeight" style={{ minWidth:'150px',width: "30%", position: "relative", overflow: "hidden",aspectRatio:1/0.85}}>
          
          <div style={{ position: 'relative', width: '100%',height:'100%' }}>
            <img
              src={item.img}
              alt="slide"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div style={{ ...miniSlideshowTexts, color: 'white', backgroundColor:'rgba(0, 29, 82, 1)', width:'100%', display:'flex', flexDirection:'column', gap:'15px', padding:'20px 0px'}} className="heightHover">
            <div>
              {item.text}
            </div>
            <div style={{fontSize:'15px', color:'rgba(250, 250, 250, 0.66)',display:'flex', gap:'5px', flexDirection:'column'}} className="opacityHover">
              <span>{item.desc}</span>
              <span><HiMiniArrowLongRight style={{fontSize:'25px'}}/></span>
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

  const images = [pic1, pic2, pic3, pic4, pic5];
  const texts = [
    "Student 1",
    "Student 2",
    "Student 3",
    "Student 4",
    "Student 5"
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
      <div className={`${animate ? 'slideTop' : ''}`} style={{display:'flex', justifyContent:'space-between', flexDirection:'column', gap:'40px'}}>
        <div>TESTIMONIALS FROM OUR LEARNERS</div>
        <div>Discover what it looks like when organizations approach their work with new skill sets &  support ready for challenges and confident to lead.
        </div>
        <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{width:'60%'}}> 
            {texts[index]}
          </div>
          <img src={images[index]} alt="Sospeter" width={'30%'} height={'auto'} style={{borderRadius:'50%', aspectRatio:1/1, border:'6px solid rgba(0, 29, 82, 1)'}}/>
        </div>
      </div>

      {/* NEXT/PREV BUTTONS */}
      <div style={{ position: "absolute", top: "50%", left: '0%', transform: "translateY(-50%)", zIndex: 10, borderRadius: '50%', padding: '7px 10px', backgroundColor: 'rgba(0, 29, 82, 0.5)', cursor: 'pointer' }} onClick={prev}>
        <CgChevronDoubleLeft style={{ fontSize: '25px', color: 'white' }} />
      </div>

      <div style={{ position: "absolute", top: "50%", right: '0%', transform: "translateY(-50%)", zIndex: 10, borderRadius: '50%', padding: '7px 10px', backgroundColor: 'rgba(0, 29, 82, 0.5)', cursor: 'pointer' }} onClick={next}>
        <CgChevronDoubleRight style={{ fontSize: '25px', color: 'white' }} />
      </div>
    </div>
  );
}

function PopularCourses(){
    // 9 items – 3 will show at a time
const popularCoursesData = [
  { img: pic1, text: "Course 1", desc:'desc 1' },
  { img: pic2, text: "Course 2", desc:'desc 2'  },
  { img: pic3, text: "Course 3", desc:'desc 3'  },
  { img: pic4, text: "Course 4", desc:'desc 4'  },
  { img: pic5, text: "Course 5", desc:'desc 5'  },
  { img: pic1, text: "Course 6", desc:'desc 6'  },
  { img: pic2, text: "Course 7", desc:'desc 7'  },
  { img: pic3, text: "Course 8", desc:'desc 8'  },
  { img: pic4, text: "Course 9", desc:'desc 9'  },
];
  const [index, setIndex] = useState(0); // 0, 3, 6

  const next = () => {
    setIndex((prev) => (prev + 3) % popularCoursesData.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 3 + popularCoursesData.length) % popularCoursesData.length);
  };

  // slice 3 items
  const itemsToShow = popularCoursesData.slice(index, index + 3);

  return(
    <div style={{display:'flex',gap:'60px', flexDirection:'column', padding:'50px 20px'}}>
      <div style={{fontWeight:700, fontSize:'20px', padding:'10px 13px'}}>POPULAR COURSES</div>
      
      <div style={{display:'flex', width:'100%',  alignItems:'center'}}>
        
        <div style={{ zIndex: 10, borderRadius: '50%', padding: '7px 10px', backgroundColor: 'rgba(0, 29, 82, 0.5)', cursor: 'pointer', height:'fit-content' }} onClick={prev}>
          <CgChevronDoubleLeft style={{ fontSize: '25px', color: 'white' }} />
        </div>

        <MiniSlideShow items={itemsToShow} />

        <div style={{zIndex: 10, borderRadius: '50%', padding: '7px 10px', backgroundColor: 'rgba(0, 29, 82, 0.5)', cursor: 'pointer', height:'fit-content' }} onClick={next}>
          <CgChevronDoubleRight style={{ fontSize: '25px', color: 'white' }} />
        </div>

      </div>
    </div>
  );
}


function StartJourney(){
  return(
    <div style={{width:'100%', height:'fit-content', display:'flex', justifyContent:'center', alignItems:'center', padding:'50px 20px', background:'linear-gradient(45deg, blue, purple', gap:'20px', flexDirection:'column', color:'white'}}>
      <div>Ready to Start Your Journey</div>
      <div>Join thousands entrepreneurs who are building their dreamswith Our app</div>
      <div style={{backgroundColor:'white', color:'blue', padding:'15px', width:'150px', borderRadius:'15px'}}>Sign Up Now</div>
    </div>
  )
}

function Testimonials(){
  return(
    <div style={{display:'flex', flexWrap:'wrap', gap:'50px', margin:'50px 0px'}}>
      <div style={{display:'flex', flexDirection:'column', gap:'40px', width:'45%', flexGrow:1, minWidth:'250px', padding:'20px'}}>
        <div>Mr SosPeter Owur</div>
        <div>pargraph one ... pargraph one ... pargraph one ... pargraph one ... pargraph one ... pargraph one ... pargraph one ... pargraph one ... pargraph one ... pargraph one ... pargraph one ...
        </div>
        <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{width:'60%'}}> author words, author words author words, author words author words, author wordsauthor words, author wordsauthor words, author words
          </div>
          <img src={Sospeter} alt="Sospeter" width={'30%'} height={'auto'} style={{borderRadius:'50%', aspectRatio:1/1, border:'6px solid rgba(0, 29, 82, 1)'}}/>
        </div>
      </div>
      <div style={{ width:'45%', flexGrow:1, minWidth:'250px',display:'flex', padding:'20px', background:'linear-gradient(45deg, blue, purple', color:'white'}}>
        <UltraMiniSlideShow/>
      </div>
    </div>
  )
}

function Footer(){
  return(
    <div style={{backgroundColor:'rgba(0, 29, 82, 1)', display:'flex', flexWrap:'wrap', color:'white', padding:'30px', justifyContent:'space-around', gap:'40px'}}>
      <div style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'30%', minWidth:'300px', gap:'20px'}}>
        <div style={{display:'flex',gap:'5px', flexDirection:'column', justifyContent:'center'}}>
          <span style={{display:'block',left:'135px', position:'relative'}}><BookOpenCheckIcon style={{fontSize:'50px'}}/></span>
          <span style={{fontSize:'22px', fontWeight:500}}>The African Investment School</span>
        </div>
        <div>
          Philanthropy University is an online learning platform  for social impact organizations.
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
          <span>About Us</span>
          <span>Terms Of Use</span>
          <span>Privacy</span>
        </div>
      </div>

      <div style={{display:'flex', flexDirection:'column', width:'30%', minWidth:'300px', gap:'20px'}}>
        <div style={{display:'flex',gap:'5px', flexDirection:'column', justifyContent:'center'}}>
          <span style={{fontSize:'22px', fontWeight:500}}>Company</span>
        </div>
        <div style={{display:'flex', gap:'15px', flexDirection:'column'}}>
          <span>Courses</span>
        </div>
      </div>

    </div>
  )
}

const topSlideshowTexts = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "25px",
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
  height:'60%',
  zIndex:10,
}