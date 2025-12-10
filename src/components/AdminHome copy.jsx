export default function AdminHome(){
    return(
        <div style={{padding:"20px", display:'flex', gap:'15px', flexDirection:'column'}}>
            <div>Appload New Course</div>
            <form onSubmit={(e)=>{e.preventDefault();}} style={{display:'flex', flexWrap:'wrap', gap:'20px', justifyContent:'space-between', fontSize:'15px'}}>

                {/**Course Number */}
                <div style={{display:'flex', gap:'10px', alignItems:'center', width:'100%', maxWidth:'450px', border:'1px solid red', justifyContent:'space-between'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>
                        Course Number
                    </label>
                    <input type="text" name="heading" placeholder="Course Number" style={{fontSize:'15px',padding:'10px 15px', border:'1px solid rgba(146,146,146,1)',borderRadius:'5px'}} t/>
                </div>

                {/**Course Heading */}
                <div style={{display:'flex', gap:'10px', alignItems:'center', width:'100%', maxWidth:'450px',  border:'1px solid red', justifyContent:'space-between'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>
                        Course Heading
                    </label>
                    <input type="text" name="heading" placeholder="Course Heading" style={{fontSize:'15px',padding:'10px 15px', border:'1px solid rgba(146,146,146,1)',borderRadius:'5px'}} t/>
                </div>

                {/**Course Desc */}
                <div style={{display:'flex', gap:'10px', alignItems:'center', width:'100%', maxWidth:'450px', border:'1px solid red', justifyContent:'space-between'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>
                        Course Description
                    </label>
                    <input type="text" name="heading" placeholder="Course Number" style={{fontSize:'15px',padding:'10px 15px', border:'1px solid rgba(146,146,146,1)',borderRadius:'5px'}} t/>
                </div>

                {/**Course Picture  */}
                <div style={{display:'flex', gap:'10px', alignItems:'center', width:'100%', maxWidth:'450px',  border:'1px solid red', justifyContent:'space-between'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>
                        Course Image 
                    </label>
                    <input type="file" name="heading" placeholder="Course Heading" style={{fontSize:'15px',padding:'10px 15px', border:'1px solid rgba(146,146,146,1)',borderRadius:'5px'}} />
                </div>

                {/**Course  */}
                <div style={{display:'flex', gap:'10px',width:'100%',maxWidth:'450px', border:'1px solid red', flexWrap:'wrap', flexDirection:'column',}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>
                        About This Course Desc
                    </label>
                    <textarea rows={5} width={'100%'} type="text" name="about_this_course_desc" placeholder="About This Course Desc" style={{fontSize:'15px',padding:'10px 15px',flexGrow:1, border:'1px solid rgba(146,146,146,1)',borderRadius:'5px'}}></textarea>
                </div>

                {/** Who should take this course */}
                <div style={{display:'flex', gap:'10px',width:'100%',maxWidth:'450px', border:'1px solid red', flexWrap:'wrap', flexDirection:'column',}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>
                        Who should take the course
                    </label>
                    <textarea rows={5} width={'100%'} type="text" name="about_this_course_desc" placeholder="About This Course Desc" style={{fontSize:'15px',padding:'10px 15px',flexGrow:1, border:'1px solid rgba(146,146,146,1)',borderRadius:'5px'}}></textarea>
                </div>

                {/**Course Date*/}
                <div style={{display:'flex', gap:'10px', alignItems:'center', width:'100%', maxWidth:'450px',  border:'1px solid red', justifyContent:'space-between'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>
                        Course Image 
                    </label>
                    <input type="date" name="start_date" placeholder="Course Heading" style={{fontSize:'15px',padding:'10px 15px', border:'1px solid rgba(146,146,146,1)',borderRadius:'5px'}} />
                </div>

                {/**Course Duration*/}
                <div style={{display:'flex', gap:'10px', alignItems:'center', width:'100%', maxWidth:'450px',  border:'1px solid red', justifyContent:'space-between'}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>
                        Course Duration 
                    </label>
                    <input type="text" name="course_duration" placeholder="Course Duration" style={{fontSize:'15px',padding:'10px 15px', border:'1px solid rgba(146,146,146,1)',borderRadius:'5px'}} />
                </div>

                {/** Course Hint */}
                <div style={{display:'flex', gap:'10px',width:'100%',maxWidth:'450px', border:'1px solid red', flexWrap:'wrap', flexDirection:'column',}}>
                    <label style={{fontSize:'16px', fontWeight:500}}>
                        Hint
                    </label>
                    <textarea rows={5} width={'100%'} type="text" name="course_hint" placeholder="Hint" style={{fontSize:'15px',padding:'10px 15px',flexGrow:1, border:'1px solid rgba(146,146,146,1)',borderRadius:'5px'}}></textarea>
                </div>

            </form>
        </div>
    )
}