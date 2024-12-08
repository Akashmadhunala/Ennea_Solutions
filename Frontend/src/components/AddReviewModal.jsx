import React, { useState } from 'react';
import { Button, Modal, Form, InputNumber, Input} from 'antd';
import { toast } from "react-toastify";
import '../reviewButton.css'
import { useNavigate } from 'react-router-dom';

const AddReviewModal = ({c_id,onReviewAdded}) => {
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
        fetch(`http://localhost:8080/reviews/add/${localStorage.getItem('userId')}/${c_id}`, {
          method: 'POST',
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
            return navigate("/login");
          }
          
          onReviewAdded(values) //To change state to re-render with new reviews
          toast.success("Review added successfully");
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
        <Button  className='addRev' onClick={showModal}>
            Add Review
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
            name={`addReviewForm-${c_id}`}
            initialValues={{ remember: true }} // Set initial form values
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


export default AddReviewModal;