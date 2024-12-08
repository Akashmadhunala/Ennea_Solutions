import React, { useState } from 'react';
import { Button, Modal, Form, InputNumber, Input} from 'antd';
import { toast } from "react-toastify";
import '../reviewButton.css'
import { useNavigate } from 'react-router-dom';

const EditReviewModal = ({rev_id,curRev,onReviewEdited}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm(); 
  const navigate=useNavigate();
  
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);
        fetch(`http://localhost:8080/reviews/edit/${rev_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json', 
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(values), 
        })
        .then((data) => {
          if(data.status==401){
            toast.error("Please login");
            localStorage.clear();
            return navigate('/login');
          }
          toast.success("Review edited successfully");
          onReviewEdited(values);
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
        <Button  className='edRev' onClick={showModal}>
            Edit
        </Button>
        <Modal
            title="Add New Review"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            centered
            okButtonProps={{
                style: { 
                  backgroundColor: '#ff4040', 
                  border: 'none', 
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
            name={`editReviewForm-${rev_id}`}
            initialValues={curRev} // Set initial form values
            >
            
            <Form.Item
                label="Rating"
                name="rating"
                rules={[{ required: true,message:'Please input the product rating!'}]}
            >
                <InputNumber style={{ width: '100%' }} placeholder="Enter your rating" min={1} max={5}/>
            </Form.Item>

            <Form.Item
                label="Your Review"
                name="comment"
                rules={[{ required: true, message: 'Please input the product review!' }]}
            >
                <Input.TextArea placeholder="Enter your review/feedback" />
            </Form.Item>

            </Form>
        </Modal>
    </>
  );
};


export default EditReviewModal;