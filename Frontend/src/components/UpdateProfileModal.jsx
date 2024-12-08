import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, InputNumber, Input} from 'antd';
import { toast } from "react-toastify";
import '../reviewButton.css'

const UpdateProfileModal = ({details,st}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm(); 

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);
        fetch(`http://localhost:8080/users/update/${details.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify(values), 
        })
        .then((data) => {
          if(data.status==401){
            toast.error("Please login");
            localStorage.clear();
            return navigate("/login");
          }
          
          toast.success("Details updated successfully");
          setOpen(false);
          setConfirmLoading(false);
          form.resetFields();
          
        })
        .catch((error) => {
          console.error('Error:', error);
          setConfirmLoading(false); // Stop the loading in case of an error
        });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
        <Button  className={st?'':'updPro'} onClick={showModal}>
        &#10224; Update Profile
        </Button>
        <Modal
            title="Add New Review"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            centered
            okText={"Update"}
            okButtonProps={{
                style: { 
                  backgroundColor: '#ff4040', 
                  border: '2px solid #ff4040', 
                  color: 'black', 
                  fontWeight: 'bold'
                }
                
            }}
            cancelButtonProps={{
              style:{
                color:'black',
                borderColor:'black'
              }
            }}
        >
            <Form
            form={form} 
            layout="vertical" 
            name={`addReviewForm}`}
            initialValues={{ remember: true }} // Set initial form values
            >

            <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true,message:'Please input the first name!'}]}
                initialValue={details.firstName}
            >
                <Input style={{ width: '100%' }} placeholder="Enter First Name" />
            </Form.Item>

            <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true,message:'Please input the last name!'}]}
                initialValue={details.lastName}
            >
                <Input style={{ width: '100%' }} placeholder="Enter Last Name" />
            </Form.Item>
            
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true,message:'Please input the username!'}]}
                initialValue={details.username}
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
                <Input style={{ width: '100%' }} placeholder="Enter Password" />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true,message:'Please input the email!'},{ type: 'email', message: 'Please enter a valid email address!' }]}
                initialValue={details.email}
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
                initialValue={details.phone}
            >
                <Input style={{ width: '100%' }} placeholder="Enter Phone Number" />
            </Form.Item>

            <Form.Item
                label="About Me"
                name="aboutYourself"
                rules={[{ required: true,message:'Please input about yourself!'}]}
                initialValue={details.aboutYourself}
            >
                <Input.TextArea style={{ width: '100%' }} placeholder="Enter About Yourself" />
            </Form.Item>

            <Form.Item
                label="LinkedIn"
                name="linkedIn"
                initialValue={details.linkedIn?details.linkedIn:""}
            >
                <Input style={{ width: '100%' }} placeholder="Enter LinkedIn URL" />
            </Form.Item>

            <Form.Item
                label="Instagram"
                name="instagram"
                initialValue={details.instagram?details.instagram:""}
            >
                <Input style={{ width: '100%' }} placeholder="Enter Instagram URL" />
            </Form.Item>

            <Form.Item
                label="Twitter"
                name="twitter"
                initialValue={details.twitter?details.twitter:""}
            >
                <Input style={{ width: '100%' }} placeholder="Enter Twitter URL" />
            </Form.Item>

            <Form.Item
                label="Profile Picture"
                name="image"
                initialValue={details.image?details.image:""}
            >
                <Input style={{ width: '100%' }} placeholder="Enter Profile Picture URL" />
            </Form.Item>

            </Form>
        </Modal>
    </>
  );
};


export default UpdateProfileModal;