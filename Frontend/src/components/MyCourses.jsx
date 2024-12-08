import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import styled from 'styled-components';

const A = styled.a`
  text-decoration:none;
  color:black;
  
  &:hover {
    text-decoration:underline;
  }
`;

const Button=styled.button`
    background-color:#ff4040;
    border:2px solid #2D2F31;
    padding:10px 20px 10px 20px;
    font-weight:500;
    font-size:1.2rem;
`

const Td=styled.td`
    background-color:white;
    font-size:0.9rem;
    cursor:pointer;
    &:hover{
        color:#ff4040;
    }
`;

export default function MyCourses() {
    const [enrolled,setEnrolled]=useState([]);
    const {id}=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
        const token=localStorage.getItem('token');
        const fetchCart=async()=>{
            const res=await fetch(`http://localhost:8080/users/courses_enrolled/${id}`,{
                headers:{
                    'Authorization' : `Bearer ${token}`
                }
            }); 
            if(res.status==401){
                toast.error("Please login");
                localStorage.clear();
                return navigate('/login');
            }
            const data=await res.json();
            setEnrolled(data);
        }
        fetchCart();
    },[id]);

    const removeFromCart=async(courseId)=>{
        try {
            const token=localStorage.getItem('token');
            const res = await fetch(`http://localhost:8080/users/courses_enrolled/${localStorage.getItem('userId')}/${courseId}`, {
                method: 'DELETE',
                headers:{
                    'Authorization' : `Bearer ${token}`
                }
            });
            if(res.status==401){
                toast.error("Please login")
                return navigate('/login');
            }
            if (res.ok) {
                toast.success("Cancelled enrollment successfully");
                setEnrolled((prevEnr) => 
                    prevEnr.filter((ca) => ca.id !== courseId)
                );
            }
        } 
        catch (error) {
            console.error("Error deleting cart:", error);
        }
    }


return (
    <>
      {enrolled && enrolled.length>0?<div style={{marginTop:'2%'}}>
        <h3 style={{fontWeight:'600',textAlign:'center'}}>My Courses</h3>
        <br />
        <div>
          <div style={{padding:'0 5% 0 5%'}}>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th style={{fontSize:'1.10rem',fontWeight:'500'}}></th>
                        <th style={{fontSize:'1.10rem',fontWeight:'500'}}>Course Name</th>
                        <th style={{fontSize:'1.10rem',fontWeight:'500'}}>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {enrolled.map((course)=>(
                        <tr key={course.id}>
                            <td><a href={`/course/${course.id}`}><img src={course.image} alt="" style={{height:"50px",width:"60px"}}/></a></td>
                            <td style={{verticalAlign:'middle'}}><A href={`/course/${course.id}`}>{course.title}</A></td>
                            <td style={{verticalAlign:'middle'}}>&#8377; {course.price.toLocaleString('en-IN')}</td>
                            <Td style={{verticalAlign:'middle'}} onClick={()=>removeFromCart(course.id)}>Cancel Enrollment</Td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
        </div>
        
      </div>:<div style={{marginTop:'160px',fontSize:'2rem',textAlign:'center'}}>No Courses Enrolled</div>}
      <br />
    </>
  )

}
