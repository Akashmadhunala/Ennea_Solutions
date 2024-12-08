import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import register from '../assets/register.svg'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const navigate=useNavigate();
    const onFinish = async(values) => {
        {values.remember?values.role="ADMIN":values.role="USER"};
        console.log(values);
        try{
            const res=await fetch(`http://localhost:8080/users/register`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                },
                body: JSON.stringify(values), 
            })
            if(res.ok){
                toast.success("Registered successfully")
                if(localStorage.getItem('role')=="ADMIN")
                    return navigate("/allusers");
                return navigate(`/login`);
            }
            if(res.status==500)
                toast.error("Username already exists");
        }
        catch(err){
            console.log(err);
        }
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    return(
    <>
    <br />
    <h1 style={{fontWeight:'700',color:'black',textAlign:'center'}}>Register</h1> <br />
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'0 2% 0 2%',flexWrap:'wrap'}}>
    <img src={register} style={{width:'38%'}}/>
    <Form
        name="basic"
        style={{
        maxWidth: 700,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <div style={{display:'flex',alignItems:'center'}}>
            <Form.Item style={{marginRight:'15px'}} label="First Name" name="firstName" rules={[{ required: true,message:'Please input the first name!'}]}>
                <Input style={{ width: '100%' }} placeholder="Enter First Name" />
            </Form.Item>

            <Form.Item label="Last Name" name="lastName" rules={[{ required: true,message:'Please input the last name!'}]}>
                <Input style={{ width: '100%' }} placeholder="Enter Last Name" />
            </Form.Item>
        </div>
                
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true,message:'Please input the username!'}]}
                    
                >
                    <Input style={{ width: '100%' }} placeholder="Enter Username" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true,message:'Please input the password!'},{
                        pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                        message: 'Password must be at least 6 characters long, contain at least one letter, one number, and one special character!',
                    }]}
                >
                    <Input.Password style={{ width: '100%' }} placeholder="Enter Password" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true,message:'Please input the email!'},{ type: 'email', message: 'Please enter a valid email address!' }]}
                    
                >
                    <Input style={{ width: '100%' }} placeholder="Enter Email" />
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true,message:'Please input the phone number!'},{ 
                        pattern: /^[0-9]{10}$/, 
                        message: 'Please enter a valid 10-digit phone number!' 
                    }]}
                
                >
                    <Input style={{ width: '100%' }} placeholder="Enter Phone Number" />
                </Form.Item>

                <Form.Item
                    label="About Me"
                    name="aboutYourself"
                    rules={[{ required: true,message:'Please input about yourself!'}]}
                    
                >
                    <Input.TextArea style={{ width: '100%' }} placeholder="Enter About Yourself" />
                </Form.Item>

                <Form.Item
                    label="LinkedIn"
                    name="linkedIn"
                >
                    <Input style={{ width: '100%' }} placeholder="Enter LinkedIn URL" />
                </Form.Item>

                <Form.Item
                    label="Instagram"
                    name="instagram"
                >
                    <Input style={{ width: '100%' }} placeholder="Enter Instagram URL" />
                </Form.Item>

                <Form.Item
                    label="Twitter"
                    name="twitter"
                >
                    <Input style={{ width: '100%' }} placeholder="Enter Twitter URL" />
                </Form.Item>

                <Form.Item
                    label="Profile Picture"
                    name="image"
                >
                <Input style={{ width: '100%' }} placeholder="Enter Profile Picture URL" />
                </Form.Item>

                {localStorage.getItem('userId')&&localStorage.getItem('role')=="ADMIN"?
                <Form.Item name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Register as Admin</Checkbox>
                </Form.Item>:<></>}

                <div style={{display:'flex',justifyContent:'center'}}>
                    <FormItem>
                        <Button htmlType="submit" style={{backgroundColor:'#ff4040',border:'none',color:'black',fontWeight:'500'}}>Sign Up</Button>
                    </FormItem>
                </div>
            

    </Form>
  </div></>
    )
};
export default Signup;