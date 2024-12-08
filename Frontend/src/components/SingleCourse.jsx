import React, { useEffect, useState } from 'react'
import {HeartOutlined,ShoppingCartOutlined,HeartFilled} from '@ant-design/icons';
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";    
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import AddReviewModal from './AddReviewModal';
import EditReviewModal from './EditReviewModal';
import BuyNow from './BuyNow';
import UpdateCourseModal from './UpdateCourseModal';
import DeleteCourseModal from './DeleteCourseModal';
import styled from 'styled-components';
import '../css/SingleCourse.css'

const A = styled.a`
  text-decoration:none;
  color:black;
  margin-right:10px;
  
  &:hover {
    text-decoration:underline;
  }
`;


export default function SingleCourse() {
    const {id}=useParams();
    const [course,setCourse]=useState({});
    const [usersEnrolled,setUsersEnrolled]=useState([]);
    const navigate=useNavigate();

    useEffect(()=>{
        const fetchCourse=async()=>{
            const res=await fetch(`http://localhost:8080/courses/${id}`);
            const data=await res.json();
            setCourse(data);
            if(localStorage.getItem('userId')){
                const userRes=await fetch(`http://localhost:8080/courses/usersEnrolled/${id}`,{
                    headers:{
                        'Authorization':`Bearer ${localStorage.getItem('token')}`
                    }
                })
                if(userRes.status==401){
                    toast.error("Please login");
                    localStorage.clear();
                    return navigate("/login");
                }
                const userData=await userRes.json();
                setUsersEnrolled(userData);
            }
        }
        fetchCourse();
        
    },[id]);

    const handleReviewAdded = async () => {
        const res=await fetch(`http://localhost:8080/courses/${id}`);
        const data=await res.json();
        setCourse(data);
    };
          
    const deleteReview = async (rev_id) => {
        try {
            const token=localStorage.getItem('token');
            const res = await fetch(`http://localhost:8080/reviews/delete/${rev_id}`, {
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
                toast.success("Review deleted successfully");
                setCourse((prevCourse) => ({
                    ...prevCourse,
                    courseReviews: prevCourse.courseReviews.filter((review) => review.id !== rev_id)
                }));
            }
        } 
        catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    const addToWishlist=async(id)=>{
        try {
            const token=localStorage.getItem('token');
            const res = await fetch(`http://localhost:8080/users/addToWishlist/${localStorage.getItem('userId')}/${id}`, {
                method: 'POST',
                headers:{
                    'Authorization' : `Bearer ${token}`
                }
            });
            if(res.status==401){
                toast.error("Please login")
                return navigate('/login');
            }
            if(res.status==409){
                toast.warn("Course already in wishlist")
            }
    
            if (res.ok) {
                toast.success("Course added to wishlist");
            }
        } 
        catch (error) {
            console.error("Error deleting review:", error);
        }
    }

    const addToCart=async(id)=>{
        try {
            const token=localStorage.getItem('token');
            const res = await fetch(`http://localhost:8080/users/addToCart/${localStorage.getItem('userId')}/${id}`, {
                method: 'POST',
                headers:{
                    'Authorization' : `Bearer ${token}`
                }
            });
            if(res.status==401){
                toast.error("Please login")
                return navigate('/login');
            }
            if(res.status==409){
                toast.warn("Course already in cart")
            }
    
            if (res.ok) {
                toast.success("Course added to cart");
            }
        } 
        catch (error) {
            console.error("Error deleting cart:", error);
        }
    }

   return (
    <>
        <div>
            <div style={{backgroundColor:"#2D2F31",color:'white'}}>
            <div style={{width:"60%",padding:"3% 0 3% 7%"}}>
                <div>
                    <h2 style={{fontWeight:"700"}}>{course.title}</h2>
                    {localStorage.getItem('role')=="ADMIN"?<>
                    <span style={{color:'#ff4040'}}>&#10224; <UpdateCourseModal course={course}/></span> &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>&#10224; <DeleteCourseModal id={course.id} /></span>
                    </>:<></>}
                </div><br />
                    <p>{course.description}</p>
                    <div style={{display:"flex",alignItems:'center'}}>
                        <span style={{fontSize:'0.8rem',fontWeight:'bold',color:"#FF4040"}}>{course.rating}</span> &nbsp;
                        <div className="Stars" style={{ "--rating": course.rating, display:"inline",fontSize:"1.3rem"  }}></div>
                    </div><br />
                    <span style={{fontWeight:"600"}}>&#9678; {course.tutor}</span>&nbsp;&nbsp;&nbsp;<span style={{fontWeight:"600"}}>&#9678; {course.language}</span><br />
            </div>
            </div>
            {course.topicsCovered?<div style={{width:"60%",padding:"3% 0 0 7%"}}>
                <h2 style={{fontWeight:"700"}}>Topics Covered</h2> 
                <div style={{display:"flex",alignItems:"center",flexWrap:"wrap"}}>
                    {course.topicsCovered.map((top)=>(
                        <div style={{border:"2px solid black",borderRadius:"25px",padding:"10px",margin:'0 10px 15px 0',fontWeight:'500'}} key={uuidv4()}>{top}</div>
                    ))}
                </div>
            </div>:<></>}
            {course.courseObjectives?<div style={{width:"60%",padding:"3% 0 0 7%"}}>
                <h2 style={{fontWeight:"700"}}>Course Objectives</h2> 
                <ul>
                    {course.courseObjectives.map((cou)=>(
                        <li style={{textTransform:"capitalize",listStyle:'square'}} key={uuidv4()}>{cou}</li>
                    ))}
                </ul>
            </div>:<></>}
        </div>
        
        <div className='singlecourse-fixedimg' style={{padding:"3% 0 10% 7%",position:"absolute",top:"3rem",right:"5rem"}}>
            <div className="card cours-card" style={{borderRadius:'0',border:"2px solid #2D2F31",paddingBottom:"2rem"}}>
                <img src={course.image} className="card-img-top img-top" alt="course_img" style={{ height: '12rem', width: '20rem',borderRadius:'0'}} />
                <div className="card-body">
                    <div className="card-text">
                        <div style={{width:"20rem"}}>
                            {course.price?<div style={{fontWeight:"700",fontSize:'1.5rem',padding:'10px 0 0 1.5rem'}}>&#8377;{course.price.toLocaleString('en-IN')}</div>:<></>}
                            <div style={{display:"flex",justifyContent:"space-between",margin:"0.5rem 1.5rem 0 1.5rem"}}>
                                <button style={{backgroundColor:"#FF4040",border:"none",padding:"10px",width:"13rem",fontWeight:"700",color:"white",fontSize:"1.1rem"}} onClick={()=>addToCart(course.id)}>Add To Cart</button>
                                <button style={{padding:"10px",width:"3rem",fontSize:'1.1rem',backgroundColor:"white",border:"1px solid black",fontWeight:"700"}} onClick={()=>addToWishlist(course.id)}><HeartOutlined/></button>
                            </div>
                            <div style={{display:"flex",justifyContent:"space-between",margin:"0.5rem 1.5rem 0 1.5rem"}}> 
                                <BuyNow id={course.id}></BuyNow>
                                {/* <button style={{backgroundColor:"white",padding:"10px",width:"17rem",fontWeight:"700",color:"black",fontSize:"1.1rem",border:"1px solid black"}} >Buy Now</button> */}
                            </div>
                        </div>
                        <br />
                        <p style={{textAlign:'center',fontSize:"0.8rem"}}>30-Day Money-Back Guarantee</p>
                    </div>
                </div>
            </div>
        </div>
        <br /><br />
        <div style={{ textAlign: 'center',marginBottom:'5%' }}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
              <h2 style={{fontWeight:'600'}}>Reviews</h2>
              <div>
                <AddReviewModal c_id={course.id} onReviewAdded={handleReviewAdded}></AddReviewModal>
              </div>
            </div>
            <br />
            <div style={{display: 'grid',gridTemplateColumns: 'repeat(2, 1fr)',gap: '16px',width: '60%',margin: '0 auto'}}>
                {course.courseReviews && course.courseReviews.length>0?course.courseReviews.map((rev, index) => (
                    <div key={index} style={{borderRadius: '8px',textAlign: 'center',padding:'8px',backgroundColor:'#2D2F31' }}>
                        <strong style={{color:'white'}}>@{rev.reviewerName}</strong> <br /><br />
                        <div style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                            <span style={{fontSize:'0.8rem',color:'white'}}>{rev.rating}</span> &nbsp;
                            <div className="Stars" style={{ "--rating": rev.rating, display:"inline" }}></div>
                        </div>
                        <span style={{color:'white'}}>{rev.comment}</span> <br />
                        <br />
                        {rev.reviewerName==localStorage.getItem('username')?
                            <div>
                                <EditReviewModal rev_id={rev.id} onReviewEdited={handleReviewAdded} curRev={rev}/> &nbsp;&nbsp;
                                <button onClick={()=>deleteReview(rev.id)} className='btn btn-light btn-sm'>Delete</button>
                            </div>
                        :<></>}
                    </div>
                )) : <p style={{fontStyle:'italic'}}>No Reviews Added</p> }
            </div>
        </div>        
        {
            usersEnrolled&&usersEnrolled.length>0&&localStorage.getItem('role')=="ADMIN"?
            <div style={{width:"100%",padding:"3% 0 0 7%"}}>
                <h6 style={{fontWeight:"700"}}>~Users Enrolled <sup>({usersEnrolled.length})</sup></h6> 
                <div style={{display:"flex",alignItems:"center",flexWrap:"wrap"}}>
                    {usersEnrolled.map((top)=>(
                        <Link key={uuidv4()} to={`/profile/${top.id}`} style={{color:'black',marginRight:'10px',textDecoration:'none'}}>&#9733;{top.username}</Link>
                    ))}
                </div>
            </div>:<></>
        }
        <br /><br />
    </>
   )
 }
 