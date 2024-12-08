import React from 'react';
import { Button, Space, Form, Input, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const AddCourse = () => {
    const navigate=useNavigate();
    const onFinish = async(values) => {
        const token=localStorage.getItem('token');
        if(localStorage.getItem('role')!="ADMIN"){
            toast.error("Authorization denied");
            return navigate("/");
        }
        try{
            const res=await fetch(`http://localhost:8080/courses/add`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(values), 
            })
            if(res.ok){
                toast.success("Course added successfully")
                return navigate(`/`);
            }
            if(res.status==401){
                toast.error("Please login")
                localStorage.clear();
                return navigate('/login');
            }
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
    <h1 style={{fontWeight:'700',color:'black',textAlign:'center'}}>Add Course</h1> <br />
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'0 2% 0 2%'}}>
    <Form
        name="basic"
        style={{
            width:600,
            maxWidth: 900,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        
            <Form.Item label="Title" name="title" rules={[{ required: true,message:'Please input the course title!'}]}>
                <Input style={{ width: '100%' }} placeholder="Enter Course Title" />
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

            <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
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
                                <Input placeholder="Enter Course Objective" style={{ width: '500px' }} />
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
            </div>     

            <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
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
                                <Input placeholder="Enter Course Topics Covered" style={{ width: '500px' }} />
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
            </div> 

            <Form.Item label="Price" name="price" rules={[{ required: true,message:'Please input the course price!'}]}>
                <InputNumber style={{ width: '100%' }} placeholder="Enter Course Price" min={0}/>
            </Form.Item>

            <Form.Item label="Image URL" name="image" rules={[{ required: true,message:'Please input the course image URL!'}]}>
                <Input style={{ width: '100%' }} placeholder="Enter Course Image URL" />
            </Form.Item>

            <div style={{display:'flex',justifyContent:'center'}}>
                <Form.Item>
                    <Button htmlType="submit" style={{backgroundColor:'#ff4040',border:'none',color:'black',fontWeight:'500'}}>Add Course</Button>
                </Form.Item>
            </div>
            

    </Form>
  </div></>
    )
};
export default AddCourse;