import React, { useEffect, useState } from 'react'
import login from '../assets/login.svg'
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate,Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';


export default function Login() {
    const [succ,setSucc]=useState(true);
    const token=localStorage.getItem('token');
    const navigate=useNavigate();
    // useEffect(() => {
    //     if (token) {
    //         navigate('/');
    //     }
    // }, [token]);
    
    const onFinish = async(values) => {
        try{
            const res=await fetch(`http://localhost:8080/users/login`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                },
                body: JSON.stringify(values), 
            })
            if(res.ok){
                const token=await res.text();
                localStorage.setItem("token",token);
                const username=jwtDecode(token).sub;
                console.log(username);
                const newUserRes=await fetch(`http://localhost:8080/users/profile/username/${username}`,{
                    method:'GET',
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                });
                const userData=await newUserRes.json();
                localStorage.setItem('userId',userData.id);
                localStorage.setItem('fs',userData.firstName);
                localStorage.setItem('ls',userData.lastName);
                localStorage.setItem('role',userData.role);
                localStorage.setItem('username',userData.username);
                toast.success("Login successful")
                return navigate(`/`);
            }
            else
                setSucc(false);
        }
        catch(err){
            console.log(err);
        }
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
        <img src={login} width={'38%'} />
        <div style={{width:'38%'}}>
            <h1 style={{fontWeight:'700',color:'black'}}>Welcome Back,</h1><br />
            <Form name="basic" style={{width:'100%'}} initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item name="username" rules={[{required: true, message: 'Please input your username!',},]}>
                    <Input placeholder="Enter Username" style={{height:'40px',fontSize:'1rem'}}/>
                </Form.Item>

                <Form.Item name="password" rules={[{required: true,message: 'Please input your password!',},]}>
                    <Input.Password placeholder="Enter Password" style={{height:'40px',fontSize:'1rem'}}/>
                </Form.Item>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    {succ==false?<><div style={{color:'red'}}>* Invalid Username or Password </div><br /></>:<></>}
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <div style={{marginRight:'15px'}}>
                            <Form.Item label={null}>
                                <Button htmlType="submit" style={{padding:'10px',fontSize:'1rem',backgroundColor:'#ff4040',border:'2px solid black',fontWeight:'500',color:'white'}}>Log In</Button>
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item label={null}>
                                <Link  to={"/signup"} className='btn' style={{padding:'2px 7px',fontSize:'1rem',backgroundColor:'#455A64',border:'2px solid black',fontWeight:'500',color:'white',textDecoration:'none',margin:'0'}}>Sign Up</Link>
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    </div>
  )
}
