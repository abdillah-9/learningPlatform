import React, { useContext, useEffect } from 'react'
import "./Global.css"
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import { AuthContext } from './AuthProvider';
import LoadingSpinner from './components/LoadingSpinner';
import Course from './components/Course';
import Auth from './components/Auth/Auth';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import ViewAllCourses from './components/ViewAllCourses';
import MainApp from './pages/MainApp';
import ShowUpcomingCourses from './pages/ShowUpcomingCourses';

export default function App() {
    const userDataContext = useContext(AuthContext);
    let userData = null;
    if(userDataContext != undefined){
      userData = userDataContext
    }
    if(userData === undefined){
      return <LoadingSpinner/>
    }  
    console.log('userData inside App '+JSON.stringify(userData));
  return (
      <BrowserRouter>
        <Routes>
              <Route path={"/"} 
                     element={
                     <PublicRoute>
                      <Home/>
                     </PublicRoute>}
              />
              <Route path={"/auth/register"} 
                     element={
                     <PublicRoute>
                      <Auth />
                     </PublicRoute>}
              />
              <Route path={"/auth/sign_in"} 
                     element={
                     <PublicRoute>
                      <Auth />
                     </PublicRoute>}
              />
              <Route path={"/auth/forgot_password"} 
                     element={
                     <PublicRoute>
                      <ForgotPassword />
                     </PublicRoute>}
              />
              <Route path={"/auth/reset_password"} 
                     element={
                     <PublicRoute>
                      <ResetPassword />
                     </PublicRoute>}
              />
              <Route path={"/enroll_course/:courseId"} 
                     element={
                     <PublicRoute>
                      <Course />
                     </PublicRoute>}
              />
              <Route path={"/view_all_courses"} 
                     element={
                     <PublicRoute>
                      <ViewAllCourses />
                     </PublicRoute>}
              />
              <Route path={"/about"} 
                     element={
                      <PublicRoute>
                        <About />
                      </PublicRoute>}
              />
              <Route path={"/signIn"} 
                     element={
                      <PublicRoute>
                        <Home passedActiveLink={'SignIn'}/>
                      </PublicRoute>
                     }
              />
              <Route path={"/signUp"} 
                     element={
                      <PublicRoute>
                        <Home passedActiveLink={'SignUp'}/>
                      </PublicRoute>
                     }
              />

              {/* Protected routes */}
              <Route path={"/enroll_course/:courseId/main_App/moduleId/:moduleId"} 
                     element={
                      <ProtectedRoute>
                        <MainApp/>
                      </ProtectedRoute>
                     }
              />
              <Route
                path="/enroll_course/:courseId/main_App/moduleId/:moduleId/blockId/:blockId"
                element={
                  <ProtectedRoute>
                    <MainApp />
                  </ProtectedRoute>
                }
              />

              <Route path='/upcoming_courses' element={
                <ProtectedRoute>
                  <ShowUpcomingCourses/>
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFoundPage />} />
              <Route path={"/unAuthorized"} element={<UnAuthorizedPage/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export function UnAuthorizedPage(){
  alert('Not authorized after dismissing the alert youll be redirected to login page')
    
  return (
    <Navigate to={'../signIn'} replace/>
  );
}
export function NotFoundPage(){
  return(
    <div>The page you request is not available or your role is not allowed to access</div>
  )
}

export function ProtectedRoute({ children }) {
  const { userData, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (!userData) {
    return <Navigate to="/auth/sign_in" replace state={{ from: location }} />;
  }

  //check status here
  if(userData?.status != 'active'){
    return(
      <div style={{width:'100vw', height:'100vh', position:'relative',display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'15px'}}>
        <div style={{fontSize:'24px', fontWeight:700, color:'rgba(109, 3, 3, 1)'}}>
          Sorry you are not allowed to view these contents...!
        </div>
        <div style={{fontSize:'20px', fontWeight:600, color:'rgba(109, 3, 3, 1)'}}>
          Makesure that you have purchased the module
        </div>
      </div>
    )
  }

  return children;
}

// export function PublicRoute({children}){
//   const {userData} = useContext(AuthContext);
//   const location = useLocation();
//   let path = location.pathname;

//   if(userData && location.state?.from?.pathname) {
//     return (
//       <Navigate
//         to={location.state.from.pathname}
//         replace
//       />
//     );
//   }

//   else if(userData && !location.state?.from?.pathname && (location.pathname == '/auth/sign_in' || location.pathname == '/auth/register')) {
//     return (
//       <Navigate
//         to={'/'}
//         replace
//       />
//     );
//   }
//   return children;
// }

export function PublicRoute({ children }) {
  return children;
}
