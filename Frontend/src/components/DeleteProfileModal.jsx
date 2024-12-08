import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, InputNumber, Input} from 'antd';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const DeleteProfileModal = ({id,st}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm(); 
  const navigate=useNavigate();

  const showModal = () => {
    setOpen(true);
  };

  
  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setConfirmLoading(true);
        try {
            const res = await fetch(`http://localhost:8080/users/delete/${id}`, {
                method: 'DELETE',
                headers:{
                  'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            });
            if(res.status==401){
              toast.error("Please login");
              localStorage.clear();
              return navigate('/login');
            }
            if (res.ok) {
                toast.success(`Profile Deleted`);
                if(localStorage.getItem('role')=="ADMIN" && id!=localStorage.getItem('userId'))
                  return navigate("/allusers");
                else{
                  localStorage.clear();
                  return navigate("/login");
                }
            }
        } 
        catch (error) {
            console.error("Error enrolling in course:", error);
        } finally {
            setConfirmLoading(false); 
            setOpen(false); 
            form.resetFields();
        }
      })
      .catch((error) => {
        console.error('Validation Failed:', error);
        setConfirmLoading(false); // Stop the loading in case of an error
      });
    };

  

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
        <Button  className={st?'':'delPro'} onClick={showModal}>
        &#10224; Delete Profile
        </Button>
        <Modal
            title="Delete Profile"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            centered
            width={700}
            okText="Delete"
            okButtonProps={{
                style: { 
                  backgroundColor: '#ff4040', 
                  border: '2px solid #ff4040', 
                  color: 'black', 
                  fontWeight: 'bold',
                }
                
            }}
            cancelButtonProps={{
              style:{
                color:'black',
                borderColor:'black'
              }
            }}
        >
            <Form form={form}> 
                <p>Are you sure to delete your profile?</p>
            </Form>
        </Modal>
        
    </>
  );
};


export default DeleteProfileModal;