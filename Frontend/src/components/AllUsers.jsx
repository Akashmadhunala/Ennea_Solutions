import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UpdateProfileModal from './UpdateProfileModal';
import DeleteProfileModal from './DeleteProfileModal';
import { toast } from 'react-toastify';

const A = styled.a`
  text-decoration:none;
  color:black;
  
  &:hover {
    text-decoration:underline;
  }
`;

const Button = styled.button`
  padding:10px;
  background-color:#ff4040;
  color:white;
  font-weight:bold;
  border:2px solid black;
`;

export default function AllUsers() {
  const [users,setUsers]=useState([]);
  const navigate=useNavigate();

    useEffect(()=>{
        const token=localStorage.getItem('token');
        if(localStorage.getItem('role')!="ADMIN"){
          toast.error("Authorization denied");
          return navigate("/");
        }
        const fetchAllUsers=async()=>{
            const res=await fetch('http://localhost:8080/users/all',{
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
            setUsers(data);
        }
        fetchAllUsers();
        
    },[]);

    const handleAddUser=async()=>{
      if(localStorage.getItem('role')!="ADMIN"){
        toast.error("Authorization denied");
        return "/";
      }
      return navigate("/signup");
    }
    
  return (
    <>
      <br />
      <div style={{width:'150px',position:'absolute',right:'15px'}}>
        <Button onClick={()=>handleAddUser()}>Add New User</Button>
      </div>
      <br /> 
      <div style={{marginTop:'2%'}}>
        <h3 style={{fontWeight:'700',textAlign:'center'}}>All Profiles</h3>
        <div>
          <div style={{padding:'0 5% 0 5%'}}>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th style={{fontSize:'1.10rem',fontWeight:'500'}}>User Id</th>
                        <th style={{fontSize:'1.10rem',fontWeight:'500'}}>Profile</th>
                        <th style={{fontSize:'1.10rem',fontWeight:'500'}}></th>
                        <th style={{fontSize:'1.10rem',fontWeight:'500'}}></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user)=>(
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td style={{display:'flex',alignItems:'center'}}>
                                <img src={user.image} alt="" style={{height:"40px",width:"40px",borderRadius:'50%'}}/> &nbsp;&nbsp;&nbsp;
                                <A href={`profile/${user.id}`}>{user.firstName} {user.lastName}</A>
                            </td>
                            <td style={{verticalAlign:'middle'}}><DeleteProfileModal id={user.id} st={true}/></td>
                            <td style={{verticalAlign:'middle'}}><UpdateProfileModal details={user} st={true}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
        </div>
      </div>
      <br /> <br />
    </>
  )
}
