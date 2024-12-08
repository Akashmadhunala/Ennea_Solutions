import React, { useEffect, useState,Suspense } from 'react'
import { LinkedinFilled ,InstagramOutlined} from '@ant-design/icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import UpdateProfileModal from './UpdateProfileModal'
import DeleteProfileModal from './DeleteProfileModal'
import { toast } from 'react-toastify'
import Spinner from './Spin'
const UserImage=React.lazy(()=>import('./UserImage'))


const But = styled.button`
  padding:0;
  background-color:white;
  color:#ff4040;
  font-weight:bold;
  border:none;
  &:hover{
  text-decoration:underline;
  }
`;

export default function UserProfile() {
    const {id}=useParams();
    const [user,setUser]=useState({});
    const navigate=useNavigate();

    useEffect(()=>{
        const fetchUser=async()=>{
            const token = localStorage.getItem('token');
            const res=await fetch(`http://localhost:8080/users/profile/${id}`,{
                headers:{
                    'Authorization' : `Bearer ${token}`
                }
            });
            if(res.status==401){
                toast.error("Please login");
                localStorage.clear();
                return navigate("/login");
            }
            if(res.ok){
                const data=await res.json();
                setUser(data);
            }
            else{
                return navigate("/login");
            }
        }
        fetchUser();
        
    },[id]);

  return (
    <>
        <br />
        <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
            <span><UpdateProfileModal details={user} st={false}/></span>
            <span><DeleteProfileModal id={user.id} st={false}/></span>
            {localStorage.getItem('userId')==user.id?
                <span style={{color:"#ff4040"}}><But onClick={()=>{localStorage.clear();toast.success("Logout Successful");return navigate("/")}}>&#10224; Log Out</But></span>
            :<></>}
        </div> <br />
        <div style={{display:"flex",justifyContent:'center',alignItems:'center',marginTop:'1%'}}>
            <div>
                <div style={{display:"flex",justifyContent:'center',alignItems:'center'}}>
                    {user.image?
                        // <img src={user.image} alt="" style={{width:"10rem",height:"10rem",borderRadius:"50%"}}/> 
                        <Suspense fallback={<Spinner/>}><UserImage user={user}/></Suspense>:
                        <div style={{width:"10rem",height:"10rem",borderRadius:"50%",backgroundColor:'#ff4040',display:"flex",justifyContent:'center',alignItems:'center',fontWeight:'600',fontSize:'3rem'}}>{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                </div>
                    }
                </div> <br />
                
                <h4 style={{fontWeight:"600"}}>{user.firstName} &nbsp;{user.lastName}</h4>
                <p><b>Username :</b> {user.username}</p>
                <p><b>Email :</b> {user.email}</p>
                <p><b>Phone :</b> {user.phone}</p>
                <p><b>About Me :</b> <br />{user.aboutYourself}</p>
                <p><LinkedinFilled style={{fontSize:"1.8rem",color:"#0A66C2"}}/> : {user.linkedIn && user.linkedIn.length>0?<a target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}} href={user.linkedIn}>LinkedIn</a>:'N/A'}</p>
                <p><InstagramOutlined style={{fontSize:"1.8rem"}}/> : {user.instagram && user.instagram.length>0?<a target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}} href={user.instagram}>Instagram</a>:'N/A'}</p>
                <p><i className="fa-brands fa-square-x-twitter" style={{fontSize:"1.8rem",color:'black'}}></i> : {user.twitter && user.twitter.length>0?<a target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}} href={user.twitter}>Twitter</a>:'N/A'}</p>
            </div>   
        </div> <br />
  </>
  )
}
