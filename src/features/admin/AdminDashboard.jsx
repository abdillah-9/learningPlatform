import React, { useContext } from 'react'
import { BiLogOut, BiSearchAlt2, BiSolidSearchAlt2 } from 'react-icons/bi'
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs'
import { FaUserEdit, FaUserMd } from 'react-icons/fa'
import { MdPendingActions } from 'react-icons/md'
import { PiArrowLineRight, PiBookOpenUser } from 'react-icons/pi'
import { RiDeleteBin5Fill, RiFileCheckFill } from 'react-icons/ri'
import { TbLogout } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../AuthProvider'

export default function AdminDashboard({setActive,active}) {
  const {userData, setUserData} = useContext(AuthContext);

  return (
    <div style={{padding:'15px',display:'flex', gap:'20px', flexDirection:'column'}}>
      <QuickActions active={active} setActive={setActive} userData={userData} setUserData={setUserData}/>
      <UsersActions/>
    </div>
  )
}

function QuickActions({setActive,active, userData, setUserData}){
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

async function DeleteAccount() {
  try {
    const formData = new FormData();
    formData.append("user_id", userData.user_id);
    formData.append("token", localStorage.getItem("token"));

// Get token from localStorage
const token = localStorage.getItem("token");

// Split the JWT into its 3 parts
const payloadBase64 = token.split('.')[1]; // middle part is payload

// Decode base64
const decodedPayload = JSON.parse(atob(payloadBase64));

console.log("Decoded token payload:", decodedPayload);


    const res = await fetch(
      "https://www.tanzcoffee.co.tz/mwangaza-backend/delete_account.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserData(null);
    alert(data.message);s
  } catch (e) {
    console.error(e);
  }
}
// Get token from localStorage
const token = localStorage.getItem("token");

// Split the JWT into its 3 parts
const payloadBase64 = token.split('.')[1]; // middle part is payload

// Decode base64
const decodedPayload = JSON.parse(atob(payloadBase64));

console.log("Decoded token payload:", decodedPayload);
console.log("user id "+userData.user_id);
  return(
    <div style={{boxShadow:'1px 2px 20px rgba(100,100,100,0.6)', borderRadius:'5px', padding:'15px', display:'flex', flexWrap:'wrap', gap:'20px', fontSize:'13px'}}>
      
      <div style={{display:'flex', alignItems:'center', padding:'10px', gap:'6px',boxShadow:'1px 1px 20px rgba(100,100,100,0.6)', borderRadius:'5px', cursor:'pointer', width:'100%', maxWidth:'160px'}}
      onClick={()=>{setActive('User Account')}}>
        <span style={{fontSize:'16px',backgroundColor:'rgba(153, 153, 241, 1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', color:'rgba(9, 18, 87, 1)'}}><FaUserEdit/></span>
        <span>My Profile</span>
      </div>

      <div style={{display:'flex', alignItems:'center', padding:'10px', gap:'6px',boxShadow:'1px 1px 20px rgba(100,100,100,0.6)', borderRadius:'5px', cursor:'pointer', width:'100%', maxWidth:'160px'}}
      onClick={LogoutHandler}>
        <span style={{fontSize:'16px',backgroundColor:'rgba(138, 236, 141, 1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', color:'rgba(1, 80, 35, 1)'}}><TbLogout/></span>
        <span>Logout</span>
      </div>

      <div style={{display:'none', alignItems:'center', padding:'10px', gap:'6px',boxShadow:'1px 1px 20px rgba(100,100,100,0.6)', borderRadius:'5px', cursor:'pointer', width:'100%', maxWidth:'160px'}}
      onClick={DeleteAccount}>
        <span style={{fontSize:'16px',backgroundColor:'rgba(248, 133, 133, 1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', color:'rgba(80, 1, 1, 1)'}}><RiDeleteBin5Fill/></span>
        <span>Delete Account</span>
      </div>
    </div>
  )
}

function UsersActions(){
  return(
    <div style={{boxShadow:'1px 2px 20px rgba(100,100,100,0.6)', borderRadius:'5px', padding:'15px', display:'flex', flexWrap:'wrap', gap:'20px', fontSize:'13px'}}>

    </div>
  )
}