import { useEffect, useState } from "react";
import { HiBookOpen } from "react-icons/hi2";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export default function Auth(){
  const navigateTo = useNavigate();
  const location = useLocation();
  const authValue = location.pathname.includes('register') ? 'register' : 'sign_in';
  const [authLink, setAuthLink] = useState(authValue);

  useEffect(()=>{
    setAuthLink(authValue);
  },[authValue])
    return(
        <div style={{display:'flex', flexWrap:'wrap',justifyContent:'center', alignItems:'center'}}>
            <div style={{display:'flex', flexDirection:'column',color:'white' , padding:'50px', flexGrow:1}} className="authBackground">
                <div style={{maxWidth:'300px'}}>
                    <HiBookOpen/>
                    <span>The African Investment School</span>
                </div>
                <span style={{fontSize:'60px', fontWeight:700, maxWidth:'300px'}}>
                    Start learning
                </span>
                <span style={{fontSize:'60px', fontWeight:700, maxWidth:'300px', color:'rgba(145, 152, 255, 1)'}}>
                    with The African Investment School
                </span>
            </div>
            <div style={{width:'50%', flexGrow:1, alignItems:'center', justifyContent:'center', padding:'20px'}}>
                <div style={{display:'flex', gap:'12px', fontSize:'20px', borderBottom:'2px solid rgba(146, 146, 146, 1)',maxWidth:'500px'}}>
                    <span style={ authLink == 'register' ? {...activeL, padding:'15px', fontWeight:500} : {padding:'15px', fontWeight:500, cursor:'pointer'}} onClick={()=>{setAuthLink('register'); navigateTo('/auth/register')}}>Register</span>
                    <span style={ authLink == 'sign_in' ? {...activeL, padding:'15px', fontWeight:500} : {padding:'15px', fontWeight:500, cursor:'pointer'}} onClick={()=>{setAuthLink('sign_in');  navigateTo('/auth/sign_in');}}>Sign In</span>
                </div>
                {
                    authLink == 'register' ? <SignUp/> : <SignIn />
                }
            </div>

        </div>
    )
}

function SignUp(){
    return(
        <form style={{}} onClick={(e)=>e.preventDefault()}>
            <div style={{display:'flex', flexDirection:'column', gap:'25px', maxWidth:'500px', padding:'25px 0px'}}>
                <input style={{fontSize:'16px',padding:'10px 15px', border:'1px solid rgba(146,146,146,1)',borderRadius:'5px'}} type="text" name="full_name" placeholder="Full Name" />
                <input style={{fontSize:'16px',padding:'10px 15px', border:'1px solid rgba(146,146,146,1)',borderRadius:'5px'}} type="text" name="username_email" placeholder="Username or Email" />
                <input style={{fontSize:'16px',padding:'10px 15px', border:'1px solid rgba(146,146,146,1)',borderRadius:'5px'}} type="password" name="p_word" placeholder="Password" />
                <p style={{color:'rgba(146,146,146,1)', fontSize:'14px'}}>
                    By continuing, you confirm that you are at least 16 years of age and agree to Africa Investment School Terms of Use.
                </p>
                <input type="submit" name="submit" value={'Create an account for free'} style={{backgroundColor:'rgba(145, 152, 255, 1)', color:'white', padding:'10px 15px', width:'fit-content', fontSize:'20px', border:'1px solid rgba(0,0,0,0)', display:'block', cursor:'pointer'}} />
            </div>
        </form>
    )
}

function SignIn(){
    return(
        <form style={{}} onClick={(e)=>e.preventDefault()}>
            <div style={{display:'flex', flexDirection:'column', gap:'25px', maxWidth:'500px', padding:'25px 0px'}}>
                <input style={{fontSize:'16px',padding:'10px 15px', border:'1px solid rgba(146,146,146,1)',borderRadius:'5px'}} type="text" name="username_email" placeholder="Username or Email" />
                <input style={{fontSize:'16px',padding:'10px 15px', border:'1px solid rgba(146,146,146,1)',borderRadius:'5px'}} type="password" name="p_word" placeholder="Password" />
                <div style={{display:'flex', flexWrap:'wrap', gap:'20px', alignItems:'center'}}>
                    <input type="submit" name="submit" value='Sign In' style={{backgroundColor:'rgba(145, 152, 255, 1)', color:'white', padding:'8px 13px', width:'fit-content', fontSize:'20px', border:'1px solid rgba(0,0,0,0)', display:'block', cursor:'pointer', borderRadius:'5px', height:'fit-content'}} />
                    <p style={{color:'rgba(146,146,146,1)', fontSize:'18px', cursor:'pointer'}}>
                        Forgot Password?
                    </p>
                </div>
            </div>
        </form>
    )
}

const activeL = {
    borderBottom:'3px solid rgba(145, 152, 255, 1)',
    color:'rgba(145, 152, 255, 1)'
}