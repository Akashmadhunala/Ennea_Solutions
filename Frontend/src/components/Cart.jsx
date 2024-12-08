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

export default function Cart() {
    const [cart,setCart]=useState([]);
    const [total,setTotal]=useState([]);
    const {id}=useParams();
    const navigate=useNavigate();
    useEffect(()=>{
        const token=localStorage.getItem('token');
        const fetchCart=async()=>{
            const res=await fetch(`http://localhost:8080/users/cart/${id}`,{
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
            setCart(data);
        }
        fetchCart();
    },[id,total]);

    useEffect(()=>{
        setTotal(()=>(
            cart.reduce((tot,c)=>tot+c.price,0)
        ))
    })

    const removeFromCart=async(userId,courseId)=>{
        try {
            const token=localStorage.getItem('token');
            const res = await fetch(`http://localhost:8080/users/cart/${localStorage.getItem('userId')}/${courseId}`, {
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
                toast.success("Removed from Cart");
                setCart((prevCart) => 
                    prevCart.filter((ca) => ca.id !== courseId)
                );
            }
        } 
        catch (error) {
            console.error("Error deleting cart:", error);
        }
    }

    const addToMyCourses=async()=>{
        for(const ca of cart){
            try {
                const res = await fetch(`http://localhost:8080/users/courses_enrolled/${localStorage.getItem('userId')}/${ca.id}`, {
                    method: 'POST',
                    headers: {
                        'Authorization' : `Bearer ${localStorage.getItem('token')}`
                      },
                });
                if(res.status==401){
                    toast.error("Please login")
                    return navigate('/login');
                }
                if(res.status==409){
                    toast.warn(`Already enrolled in ${ca.title}`);
                }
                if(res.status==403){
                    toast.error(`You cannot enroll in more than 5 courses at once`);
                } 
                if (res.ok) {
                    console.log(ca.id);
                    toast.success("Enrolled successfully");
                }
            } 
            catch (error) {
                console.error("Error deleting cart:", error);
            }            
        };        
    }

return (
    <>
      {cart && cart.length>0?<div style={{marginTop:'2%'}}>
        <h3 style={{fontWeight:'600',textAlign:'center'}}>Your Cart</h3>
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
                    {cart.map((course)=>(
                        <tr key={course.id}>
                            <td><a href={`/course/${course.id}`}><img src={course.image} alt="" style={{height:"50px",width:"60px"}}/></a></td>
                            <td style={{verticalAlign:'middle'}}><A href={`/course/${course.id}`}>{course.title}</A></td>
                            <td style={{verticalAlign:'middle'}}>&#8377; {course.price.toLocaleString('en-IN')}</td>
                            <Td style={{verticalAlign:'middle'}} onClick={()=>removeFromCart(102,course.id)}>Remove From Cart</Td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
        </div>
        <div style={{display:'flex',justifyContent:'end',padding:'0 5% 0 5%',marginTop:'2%'}}>
            <span style={{fontSize:'1.5rem'}}>Total :&nbsp;&#8377;{(total*1.05).toLocaleString('en-IN')}</span> &nbsp;&nbsp; <span style={{fontSize:'0.8rem',fontWeight:'300',fontStyle:'italic'}}>(5% gst)</span>
        </div>
        <div style={{display:'flex',justifyContent:'center',marginTop:'4%'}}>
            <Button onClick={()=>addToMyCourses()}>Buy</Button>
        </div>
      </div>:<div style={{marginTop:'160px',fontSize:'2rem',textAlign:'center'}}>Cart Is Empty</div>}
      <br />
    </>
  )

}
