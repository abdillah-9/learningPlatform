import { useContext, useEffect, useState } from "react";
import AAviewLastCourse from "../../pages/ViewCourse";
import { AuthContext } from "../../AuthProvider";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import MiniLoadingSpinner from "../../components/MiniLoadingSpinner";

export default function UserManager() {
  const { userData } = useContext(AuthContext);
  const { courseId, moduleId } = useParams();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true)

  const navigateTo = useNavigate();
  
  // ✅ Function to check access
  async function checkUserAccess() {
    if (!userData?.user_id) return;

    const formData = new FormData();
    formData.append("student_id", userData.user_id);
    formData.append("course_id", courseId);
    if (moduleId) formData.append("module_id", moduleId);

    try {
      setLoading(true);
      const res = await fetch(
        "https://www.tanzcoffee.co.tz/mwangaza-backend/check_access.php",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok) {
        // backend should return something like { access: true/false, user_status: 'active'/'blocked' }
        if (data.access && data.user_status === "active") {
          setHasAccess(true);
        } else {
          setHasAccess(false);
          alert("You do not have access to this course/module or your account is blocked");
          //navigateTo(`/enroll_course/${courseId}`);
        }
      } else {
        alert(data.error || "Failed to check access");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while checking access");
    }
    finally{
      setLoading(false);
    }
  }

  // ✅ Run on component mount or when params change
  useEffect(() => {
    checkUserAccess();
  }, [userData, courseId, moduleId]);

  if(loading){
    return (
      <MiniLoadingSpinner/>
    )
  }

  if(!hasAccess){
     return(
      <Navigate to={'/enroll_course/${courseId}'} replace></Navigate>
     )
  }

  return (
    <>
      {hasAccess ? <AAviewLastCourse /> : <p style={{ padding: "20px", color: "red" }}>Access denied or account blocked.</p>}
    </>
  );
}
