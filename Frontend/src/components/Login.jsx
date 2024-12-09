import React, { useEffect, useState } from 'react'
import login from '../assets/login.svg'
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';


export default function Login() {
    const [succ, setSucc] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    // useEffect(() => {
    //     if (token) {
    //         navigate('/');
    //     }
    // }, [token]);

    const onFinish = async (values) => {
        try {
            const res = await fetch(`http://localhost:8080/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(values),
            })
            if (res.ok) {
                const token = await res.text();
                localStorage.setItem("token", token);
                const username = jwtDecode(token).sub;
                console.log(username);
                const newUserRes = await fetch(`http://localhost:8080/users/profile/username/${username}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const userData = await newUserRes.json();
                localStorage.setItem('userId', userData.id);
                localStorage.setItem('fs', userData.firstName);
                localStorage.setItem('ls', userData.lastName);
                localStorage.setItem('role', userData.role);
                localStorage.setItem('username', userData.username);
                toast.success("Login successful")
                return navigate(`/`);
            }
            else
                setSucc(false);
        }
        catch (err) {
            console.log(err);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f1f1f1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1000px', padding: '40px', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}>
                <img src={login} width={'40%'} style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }} />
                <div style={{ width: '50%' }}>
                    <h1 style={{ fontWeight: '700', color: '#333' }}>Welcome Back,</h1><br />
                    <Form name="basic" style={{ width: '100%' }} initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!', },]}>
                            <Input placeholder="Enter Username" style={{ height: '45px', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }} />
                        </Form.Item>

                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!', },]}>
                            <Input.Password placeholder="Enter Password" style={{ height: '45px', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }} />
                        </Form.Item>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {succ == false ? <><div style={{ color: 'red' }}>* Invalid Username or Password </div><br /></> : <></>}
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px' }}>
                                <div style={{ flex: 1 }}>
                                    <Form.Item label={null}>
                                        <Button htmlType="submit" style={{
                                            padding: '12px 20px', fontSize: '1rem', backgroundColor: '#4CAF50', border: 'none', fontWeight: '600', color: 'white', borderRadius: '5px', width: '100%'
                                        }}>Log In</Button>
                                    </Form.Item>
                                </div>
                                <div>
                                    <Form.Item label={null}>
                                        <Link to={"/signup"} className='btn' style={{
                                            padding: '12px 20px', fontSize: '1rem', backgroundColor: '#2196F3', border: 'none', fontWeight: '600', color: 'white', textDecoration: 'none', borderRadius: '5px'
                                        }}>Sign Up</Link>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}
