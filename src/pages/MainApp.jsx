import React, { useContext, useEffect, useState } from "react";
import MwangazaLogo from "../assets/MwangazaLogo.jpg";
import { HiHome, HiUser } from "react-icons/hi2";
import { FaBars, FaBookBookmark, FaBookOpenReader, FaCircleXmark, FaComment, FaXmark } from "react-icons/fa6";
import UserManager from "../features/admin/UserManagment.jsx";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider.jsx";
import Userpage from "../features/Users/UserPage.jsx";
import DashboardPage from "../features/Dashboards/DashboardPage.jsx";
import UpcomingCourse from "../features/admin/UpcomingCourses.jsx";
import AvailableCourses from "../features/admin/AvailableCourses.jsx";
import AdminDashboard from "../features/admin/AdminDashboard.jsx";
import SetAccess from "../features/admin/SetAccess.jsx";
import { FaUniversalAccess } from "react-icons/fa";
import { RiHome9Fill, RiInstagramFill, RiTwitterXFill } from "react-icons/ri";
import { IoIosMail, IoLogoLinkedin, IoMdCall } from "react-icons/io";
import { BsTiktok } from "react-icons/bs";

export default function MainApp() {
  const {userData} = useContext(AuthContext);
  let defaultMenu = userData.user_role == "admin" ? 'Available Courses' : 'Course Module'
  const [active, setActive] = useState(defaultMenu);
  const [width, setWidth] = useState(window.innerWidth);
  const [sideBarOpened, setSideBar] = useState(window.innerWidth >= 720);


  useEffect(() => {
    if (width >= 720) {
      setSideBar(true);
    } else {
      setSideBar(false);
    }
  }, [width]);

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => setWidth(window.innerWidth);

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency = run once on mount

  const renderContent = () => {

    switch (active) {
      case "Dashboard":
        return(
          <div>
            {
              userData?.user_role == 'admin' ? <AdminDashboard  active={active} setActive={setActive}/> :
              <DashboardPage active={active} setActive={setActive} />
            }
          </div>
      )
      case "User Account":
        return <Userpage />
      case "Course Module":
        return <UserManager/>
      case "Upcoming Courses":
        return <UpcomingCourse/>
      case "Set Access":
        return(
          <div>
            {userData.user_role == 'admin' ? <SetAccess/> : ''}
          </div>
        )
      case "Available Courses":
      default:
        return (
      <div>
        {userData.user_role == 'admin' ? <AvailableCourses /> : ''}
      </div>
        )
    }
  };

  return (
    <div>
      <TopNavBar sideBarOpened={sideBarOpened} setSideBar={setSideBar}/>
      <div style={{ display: "flex"}}>
        <SideBar
          active={active}
          setActive={setActive}
          sideBarOpened={sideBarOpened}
          width={width}
          setSideBar={setSideBar}
        />
        <div style={{height:'100vh', overflow:'auto', 
          flexGrow: 1, width: "calc(100% - 200px)", 
        }}>
          {renderContent()}
        </div>
      </div>
        {/** Footer */}
        <footer style={{backgroundColor:'#253957', display:'flex', justifyContent:'space-between', padding:'15px 50px 10px 50px', color:'white', flexWrap:'wrap', gap:"15px", alignItems:'center'}}>

          {/** Logo and company name */}
          <div style={{fontSize:'20px', fontWeight:500, display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', border:'1px solid re'}}>
              <img src={MwangazaLogo} alt="logo" width={'60px'} height={'auto'} style={{aspectRatio:1/0.95, borderRadius:'50%'}} />
              <span style={{textAlign:'cente'}}>
                  Mwangaza Knowledge Hub
              </span>
          </div>
        <div
          style={{
            display: "flex",
            //border: "1px solid red", 
            //justifyContent: "center",
            gap: "20px",
            fontSize: "23px",
            position: "relative",
            width: "210px",
          }}
        >
          {/* Instagram */}
          <a
            href="https://www.instagram.com/iam_sospeter?igsh=MXJpajZ3MXVvaWg1aA=="
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            style={{ color: "inherit", cursor: "pointer" }}
          >
            <RiInstagramFill style={{fontSize:'26px'}}/>
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@sospeter_owuor?_r=1&_t=ZS-93JEfZWK6qN"
            target="_blank"
            rel="noopener noreferrer"
            title="TikTok"
            style={{ color: "inherit", cursor: "pointer" }}
          >
            <BsTiktok />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/sospeter-owuor-8b9359182/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            style={{ color: "inherit", cursor: "pointer" }}
          >
            <IoLogoLinkedin  style={{fontSize:'30px'}}/>
          </a>
        </div>
      </footer>
    </div>
  );
}

/****************************************************
 SIDEBAR
****************************************************/

function SideBar({ active, setActive, sideBarOpened, width, setSideBar }) {
  const {userData} = useContext(AuthContext);
  const links = [
    { name: "Dashboard", key: "Dashboard", icon: <HiHome /> },
    { studentOnly: true,name: "Course module", key: "Course Module", icon: <FaBookOpenReader /> },
    { name: "User Account", key: "User Account", icon: <HiUser /> },
    { adminOnly: true,name: "Upcoming Courses", key: "Upcoming Courses", icon: <FaBookBookmark /> },
    { adminOnly: true,name: "Set Access", key: "Set Access", icon: <FaUniversalAccess /> },
    { adminOnly: true,name: "Available Courses", key: "Available Courses", icon: <FaBookOpenReader /> },
  ];
// Filter links based on user role
  const filteredLinks = links.filter(link => {
    if (link.adminOnly && userData.user_role !== 'admin') {
      return false;
    }
    if (link.studentOnly && userData.user_role == 'admin'){
      return false
    }
    return true;
  });

  return (
    <div
      style={{
        backgroundColor: "#eebd3e",
        width: sideBarOpened ? "200px" : "0px",
        minHeight:'100vh',
        overflow:'hidden',
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: sideBarOpened ? "25px 0px 0px 15px": '0px',
        fontSize:'13px',
        position: width < 720 ? "fixed" : "relative",
        top:'0px',
        zIndex:3
      }}
    >
      {filteredLinks.map((link) => (

        <div
          key={link.key}
          onClick={() => {
            setActive(link.key);

            // Close sidebar ONLY on small devices
            if (width < 720) {
              setSideBar(false);
            }
          }}
          style={{
            borderRadius: "30px 0px 0px 30px",
            padding: "5px",
            display: "flex",
            gap: "7px",
            alignItems: "center",
            cursor: "pointer",
            backgroundColor: active === link.key ? "white" : "transparent",
          }}
        >
          <span
            style={{
              padding: "7px 11px",
              borderRadius: "50%",
              backgroundColor: active === link.key ? "#eebd3e" : "black",
              color: active === link.key ? "black" : "#eebd3e",
            }}
          >
            {link.icon}
          </span>
          <span
            style={{
              color: active === link.key ? "#835912ff" : "#000000ff",
            }}
          >
            {link.name}
          </span>
        </div>
      ))}
    </div>
  );
}

/****************************************************
 TOP NAV BAR
****************************************************/

function TopNavBar({sideBarOpened, setSideBar}) {
  const {setUserData, userData} = useContext(AuthContext);
  const navigate = useNavigate();

  async function LogoutHandler() {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUserData(null);
      // Redirect to login
      navigate("/auth/sign_in", { replace: true });
      alert("You have successfully logget out ");
    } catch (err) {
      console.error("Logout error:", err);
      alert("Failed to logout. Please try again.");
    }
  }

  return (
    <section>
      <div
        style={{
          width: "100vw",
          minHeight: "80px",
          backgroundColor: "#253957",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 15px",
          alignItems: "center",
          flexWrap: "wrap",
          gap:'15px'
        }}
      >
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <img
            src={MwangazaLogo}
            width="60"
            height="60"
            style={{ borderRadius: "50%" }}
          />
          <span style={{ fontSize: "17px", fontWeight: 600 }}>
            Mwangaza Knowledge Hub
          </span>
        </div>

        <div style={{ display: "flex", gap: "50px" }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {
              sideBarOpened ? 
              <div style={{padding:'10px 5px',borderRadius:'50px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <FaBars style={{fontSize:'16px', cursor:'pointer'}} onClick={()=>{setSideBar(false)}}/> 
              </div>
              :
              <div style={{padding:'10px 5px',borderRadius:'50px', display:'flex', justifyContent:'center', alignItems:'center'}}> 
                <FaBars style={{fontSize:'16px', cursor:'pointer'}} onClick={()=>{setSideBar(true)}}/>
              </div>             
            }
            <div style={{padding:'10px 5px',borderRadius:'50px', display:'flex', justifyContent:'center', alignItems:'center', textAlign:'center', fontSize:"11px", fontWeight:900, cursor:'pointer'}} onClick={LogoutHandler}>
              Logout  
            </div>
            <div style={{marginRight:'10px',padding:'10px 5px',borderRadius:'50px', display:'flex', justifyContent:'center', alignItems:'center', textAlign:'center', fontSize:"11px", fontWeight:900, cursor:'pointer', gap:'4px'}} onClick={()=>navigate('/')}>
              <span>Home</span>  
            </div>            
            <img
              src={`https://www.tanzcoffee.co.tz/mwangaza_hub/uploads/users/${userData.user_pic}`}
              style={{ borderRadius: "50%", width:'50px', height:'45px', objectFit:'cover', marginRight:'15px' }}
            />
            {/* <div style={{ fontSize: "14px", display:'flex', flexWrap:'wrap', gap:'7px', alignItems:'center' }}>
              <span style={{ color: "rgba(200,200,200,0.8)", fontSize: "16px" }}>
                Hello,
              </span>
              <span style={{textTransform:'capitalize', fontSize:'13.5px'}}>
                {
                   userData.full_name
                }
              </span>
            </div> */}
          </div>
        </div>

      </div>
      
    </section>
  );
}





