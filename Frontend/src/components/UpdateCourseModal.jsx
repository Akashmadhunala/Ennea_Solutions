import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, InputNumber, Input,Space} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { toast } from "react-toastify";
import '../reviewButton.css'
import { useNavigate } from 'react-router-dom';

const UpdateCourseModal = ({course}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm(); 
  const navigate=useNavigate();

  const showModal = () => {
    setOpen(true);
  };

  
  const handleOk = () => {
    if(localStorage.getItem('role')!="ADMIN"){
        toast.error("Authorization denied");
        return navigate("/");
    }
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);
        fetch(`http://localhost:8080/courses/update/${course.id}`, {
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
            return navigate("/login");
          }
          
          console.log(values);
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
        <Button onClick={showModal} className='updCou'>
            Update Course
        </Button>
        <Modal
            title="Update Course Details"
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
            name="updateCourseForm"
            initialValues={course} // Set initial form values
            >

            <Form.Item label="Title" name="title" rules={[{ required: true,message:'Please input the course title!'}]}>
                <Input style={{ width: '100%' }} placeholder="Enter Course Title"/>
            </Form.Item>

            <Form.Item label="Description" name="description" rules={[{ required: true,message:'Please input the course description!'}]}>
                <Input.TextArea style={{ width: '100%' }} placeholder="Enter Course Description" />
            </Form.Item>

            <Form.Item label="Tutor" name="tutor" rules={[{ required: true,message:'Please input the course tutor!'}]}>
                <Input style={{ width: '100%' }} placeholder="Enter Course Tutor" />
            </Form.Item>

            <Form.Item label="Language" name="language" rules={[{ required: true,message:'Please input the course language!'}]}>
                <Input style={{ width: '100%' }} placeholder="Enter Course Language" />
            </Form.Item>

            
                <Form.List name="courseObjectives">
                        {(fields, { add, remove }) => (
                        <>
                            <div style={{paddingLeft:'10%'}}>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 4}} align="baseline">
                                <Form.Item label=""
                                {...restField}
                                name={[name]}
                                fieldKey={[fieldKey]}
                                rules={[{ required: true, message: 'Please input the course objectives!' }]}
                                >
                                <Input placeholder="Enter Course Objective" style={{ width: '400px' }} />
                                </Form.Item>
                                {/* Button to remove this specific field */}
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                            ))}

                            {/* Button to add more fields */}
                            <Form.Item>
                            <Button color="default" variant="solid" onClick={() => add()} block icon={<PlusOutlined />} style={{width:'300px'}}>
                                Add Course Objectives
                            </Button>
                            </Form.Item>
                            </div>
                        </>
                        )}
                </Form.List>
              

            
                <Form.List name="topicsCovered">
                        {(fields, { add, remove }) => (
                        <>
                            <div style={{paddingLeft:'10%'}}>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 4}} align="baseline">
                                <Form.Item label=""
                                {...restField}
                                name={[name]}
                                fieldKey={[fieldKey]}
                                rules={[{ required: true, message: 'Please input the course topics covered!' }]}
                                >
                                <Input placeholder="Enter Course Topics Covered" style={{ width: '400px' }} />
                                </Form.Item>
                                {/* Button to remove this specific field */}
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                            ))}

                            {/* Button to add more fields */}
                            <Form.Item>
                            <Button type="primary" onClick={() => add()} block icon={<PlusOutlined />} style={{width:'300px'}}>
                                Add Topics Covered
                            </Button>
                            </Form.Item>
                            </div>
                        </>
                        )}
                </Form.List>
            

            <Form.Item label="Price" name="price" rules={[{ required: true,message:'Please input the course price!'}]}>
                <InputNumber style={{ width: '100%' }} placeholder="Enter Course Price" min={0}/>
            </Form.Item>

            <Form.Item label="Image URL" name="image" rules={[{ required: true,message:'Please input the course image URL!'}]}>
                <Input style={{ width: '100%' }} placeholder="Enter Course Image URL" />
            </Form.Item>

            </Form>
        </Modal>
    </>
  );
};


export default UpdateCourseModal;