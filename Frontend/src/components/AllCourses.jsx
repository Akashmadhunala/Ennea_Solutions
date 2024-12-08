import React, { useEffect, useState } from 'react'
import "../css/AllCourses.css"
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";  

export default function AllCourses() {
    const [courses,setCourses]=useState([]);
    useEffect(()=>{
        const fetchAllCourses=async()=>{
            const res=await fetch('http://localhost:8080/courses/all');
            const data=await res.json();
            setCourses(data);
        }
        fetchAllCourses();
        
    },[]);

    return (
        <div style={{display:"flex",justifyContent:"center"}}>
        <div className="grid-container" style={{display:"flex",justifyContent:"space-evenly",flexWrap:"wrap",marginTop:"5%",width:"90%"}}>
            {courses.map((course) => (
                <Link to={`/course/${course.id}`} className="course-link" key={course.id}>
                    <div className="card course-card">
                        <img src={course.image} className="card-img-top all-img" alt="course_img" style={{ height: '14rem', width: '14rem' }} />
                        <div className="card-body">
                            <div className="card-text">
                                <span style={{fontWeight:"700"}}>{course.title}</span> <br />
                                <span style={{fontSize:"0.8rem"}}>{course.tutor}</span>
                                <div style={{display:"flex",alignItems:'center'}}>
                                    <span style={{fontSize:'0.8rem',fontWeight:'bold'}}>{course.rating}</span> &nbsp;
                                    <div className="Stars" style={{ "--rating": course.rating, display:"inline",fontSize:"1.3rem"  }}></div>
                                </div>
                                <span style={{fontWeight:"700"}}>&#8377;{course.price.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
        </div>
        
    );
}