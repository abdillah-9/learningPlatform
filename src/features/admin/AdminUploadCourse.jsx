import React, { useState } from "react";
import MwangazaLogo from "../../assets/MwangazaLogo.jpg";
import userPic from "../../assets/Sospeter.webp";
import { HiHome, HiUser } from "react-icons/hi2";
import { FaBars, FaBookOpenReader, FaCircleXmark } from "react-icons/fa6";
import UserManager from "./UserManagment.jsx";
import Dashboard from "./AdminDashboard.jsx";
import CourseManager from "./CourseManager.jsx";

export default function AdminUploadCourse() {
  const [active, setActive] = useState("courses");
  const [sideBarOpened, setSideBar] = useState(true);

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return <Dashboard />
      case "users":
        return <UserManager/>
      case "courses":
      default:
        return <CourseManager />
    }
  };

  return (
    <div>
      <TopNavBar sideBarOpened={sideBarOpened} setSideBar={setSideBar}/>
      <div style={{ display: "flex"}}>
        <SideBar active={active} setActive={setActive} sideBarOpened={sideBarOpened}/>
        <div style={{ flexGrow: 1, width: "calc(100% - 200px)" }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

/****************************************************
 SIDEBAR
****************************************************/

function SideBar({ active, setActive, sideBarOpened }) {
  const links = [
    { name: "Dashboard", key: "dashboard", icon: <HiHome /> },
    { name: "User Management", key: "users", icon: <HiUser /> },
    { name: "Courses Management", key: "courses", icon: <FaBookOpenReader /> },
  ];

  return (
    <div
      style={{
        backgroundColor: "#F4B342",
        width: sideBarOpened ? "200px" : '0px',
        overflow:'hidden',
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: sideBarOpened ? "25px 0px 0px 15px": '0px',
        fontSize:'13px'
      }}
    >
      {links.map((link) => (
        <div
          key={link.key}
          onClick={() => setActive(link.key)}
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
              backgroundColor: active === link.key ? "#F4B342" : "black",
              color: active === link.key ? "black" : "#F4B342",
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
  return (
    <section>
      <div
        style={{
          width: "100vw",
          minHeight: "80px",
          backgroundColor: "#0C2B4E",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 15px",
          alignItems: "center",
          flexWrap: "wrap",
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
            MWANGAZA BUSINESS & INVESTMENT SCHOOL
          </span>
        </div>

        <div style={{ display: "flex", gap: "50px" }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {
              sideBarOpened ? 
              <FaCircleXmark style={{fontSize:'25px', cursor:'pointer', marginRight:'20px'}} onClick={()=>{setSideBar(false)}}/> :             
              <FaBars style={{fontSize:'25px', cursor:'pointer', marginRight:'20px'}} onClick={()=>{setSideBar(true)}}/>
            }            
            <img
              src={userPic}
              width="60"
              height="60"
              style={{ borderRadius: "50%" }}
            />
            <div style={{ fontSize: "14px" }}>
              <span style={{ color: "rgba(200,200,200,0.8)", fontSize: "16px" }}>
                Hello{" "}
              </span>
              <span>Mayani</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}





