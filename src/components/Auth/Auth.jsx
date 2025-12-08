import { useEffect, useState } from "react";
import { HiBookOpen } from "react-icons/hi2";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import MwangazaLogo from '../../assets/MwangazaLogo.jpg';

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
            <div style={{display:'flex', flexDirection:'column',color:'white' , padding:'50px', flexGrow:1, minHeight:'100vh'}} className="authBackground">
                <div style={{display:'flex', flexWrap:'wrap', gap:'15px', alignItems:'center'}}>
                    <img src={MwangazaLogo} alt="logo" width={'40px'} height={'auto'} style={{aspectRatio:1/0.95, borderRadius:'50%'}} />
                    <span>MWANGAZA BUSINESS & INVESTMENT SCHOOL</span>
                </div>
                <span style={{fontSize:'45px', fontWeight:700, maxWidth:'300px'}}>
                    Start learning
                </span>
                <span style={{fontSize:'45px', fontWeight:700, maxWidth:'300px', color:'rgba(145, 152, 255, 1)'}}>
                    with MWANGAZA BUSINESS & INVESTMENT SCHOOL
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
    async function formSubmit(e){
        e.preventDefault();

        //frontend form validation
        const formdata = new FormData(e.target);
        
        // send data to Backend
        try{
            const res = await fetch('http://localhost/learnAPI/register.php',{
                method:'POST',
                credentials:'include',
                body: formdata
            });

            if(res.ok){
                const data = await res.json();
                console.log(data)
                alert(data.message);
            }
            else{
                const data = await res.json();
                console.log(data);
                alert(data.error);
            }
        }
        catch(err){
            console.log('catched err is '+err);
        }
    }

    return(
        <form style={{}} onSubmit={formSubmit}>
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
    const navigateTo = useNavigate();
    async function signInSubmit(e) {
    e.preventDefault();

    const formdata = new FormData(e.target);

    try {
        const res = await fetch("http://localhost/learnAPI/sign_in.php", {
            method: "POST",
            credentials: "include",
            body: formdata
        });

        const data = await res.json();

        if (res.ok) {
            alert(data.message);
            console.log("Logged in user:", data.user);
        } else {
            alert(data.error || "Login failed");
        }
        } catch (err) {
            console.log("Error:", err);
        }
    }

    return(
        <form style={{}} onSubmit={signInSubmit}>
            <div style={{display:'flex', flexDirection:'column', gap:'25px', maxWidth:'500px', padding:'25px 0px'}}>
                <input style={{fontSize:'16px',padding:'10px 15px', border:'1px solid rgba(146,146,146,1)',borderRadius:'5px'}} type="text" name="username_email" placeholder="Username or Email" />
                <input style={{fontSize:'16px',padding:'10px 15px', border:'1px solid rgba(146,146,146,1)',borderRadius:'5px'}} type="password" name="p_word" placeholder="Password" />
                <div style={{display:'flex', flexWrap:'wrap', gap:'20px', alignItems:'center'}}>
                    <input type="submit" name="submit" value='Sign In' style={{backgroundColor:'rgba(145, 152, 255, 1)', color:'white', padding:'8px 13px', width:'fit-content', fontSize:'20px', border:'1px solid rgba(0,0,0,0)', display:'block', cursor:'pointer', borderRadius:'5px', height:'fit-content'}} />
                    <p style={{color:'rgba(146,146,146,1)', fontSize:'18px', cursor:'pointer'}} onClick={()=>{navigateTo('/auth/forgot_password')}}>
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