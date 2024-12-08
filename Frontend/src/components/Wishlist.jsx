import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import styled from 'styled-components';

const Button=styled.button`
    border:none;
    padding:7px;
    font-size:0.9rem;
    &:hover{
        border:1px solid black !important;
    }
`;

export default function Wishlist() {
    const [wish,setWish]=useState([]);
    const {id}=useParams();

    useEffect(()=>{
        const token=localStorage.getItem('token');
        const fetchWish=async()=>{
            const res=await fetch(`http://localhost:8080/users/wishlist/${id}`,{
                headers:{
                    'Authorization' : `Bearer ${token}`
                }
            }); 
            if(res.status==401){
                toast.error("Please login");
                localStorage.clear();
                return navigate("/login");
            }
            const data=await res.json();
            setWish(data);
        }
        fetchWish();
        
    },[id]);

    const removeFromWishlist=async(userId,courseId)=>{
        try {
            const token=localStorage.getItem('token');
            const res = await fetch(`http://localhost:8080/users/wishlist/${localStorage.getItem('userId')}/${courseId}`, {
                method: 'DELETE',
                headers:{
                    'Authorization' : `Bearer ${token}`
                }
            });
            if(res.status==401){
                toast.error("Please login");
                localStorage.clear();
                return navigate("/login");
            }
            if (res.ok) {
                toast.success("Removed from Wishlist");
                setWish((prevWish) => 
                    prevWish.filter((wi) => wi.id !== courseId)
                );
            }
        } 
        catch (error) {
            console.error("Error deleting wish:", error);
        }
    }

  return (
    <>
    {wish&&wish.length>0?<h2 style={{textAlign:'center',marginTop:'2%',fontWeight:'600'}}>Your Wishlist</h2>:<></>}
    <div style={{display:"flex",justifyContent:"center"}}>        
        {wish.length>0?<div className="grid-container" style={{display:"flex",justifyContent:"space-evenly",flexWrap:"wrap",marginTop:"1.5%",width:"90%"}}>
            {wish.map((course) => (
                <div key={course.id}>
                    <div className="card course-card">
                        <Link to={`/course/${course.id}`} className="course-link">
                        <img src={course.image} className="card-img-top" alt="course_img" style={{ height: '14rem', width: '14rem' }} />
                        </Link>
                        <div className="card-body">
                            <div className="card-text">
                                <span style={{fontWeight:"700"}}>{course.title}</span> <br />
                                <span style={{fontSize:"0.8rem"}}>{course.tutor}</span>
                                <div style={{display:"flex",alignItems:'center'}}>
                                    <span style={{fontSize:'0.8rem',fontWeight:'bold'}}>{course.rating}</span> &nbsp;
                                    <div className="Stars" style={{ "--rating": course.rating, display:"inline",fontSize:"1.3rem"  }}></div>
                                </div>
                                <span style={{fontWeight:"700"}}>&#8377;{course.price.toLocaleString('en-IN')}</span><br />
                                <Button onClick={()=>removeFromWishlist(102,course.id)}>Remove From Wishlist</Button>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>:<div style={{marginTop:'160px',fontSize:'2rem'}}>Wishlist Is Empty</div>}
        </div>
        </>
  )
}
