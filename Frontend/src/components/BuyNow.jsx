import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, InputNumber, Input} from 'antd';
import { toast } from "react-toastify";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const Td=styled.td`
    background-color:white;
    font-size:0.9rem;
    cursor:pointer;
    &:hover{
        color:#ff4040;
    }
`;

const BuyNow = ({id}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm(); 
  const [course,setCourse]=useState({});
  const navigate=useNavigate();

    useEffect(()=>{
        const fetchCourse=async()=>{
            if(!id)
                return;
            const res=await fetch(`http://localhost:8080/courses/${id}`);
            const data=await res.json();
            setCourse(data);
        }
        fetchCourse();
    
    },[id]);
  
  const showModal = () => {
    setOpen(true);
  };

  
  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setConfirmLoading(true);
        try {
            const res = await fetch(`http://localhost:8080/users/courses_enrolled/${localStorage.getItem('userId')}/${course.id}`, {
                method: 'POST',
                headers:{
                  'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            });
            if(res.status==401){
              toast.error("Please login");
              localStorage.clear();
              return navigate('/login');
            }
            if (res.status === 409) {
                toast.warn(`Already enrolled in ${course.title}`);
            }
            if(res.status==403){
              toast.error(`You cannot enroll in more than 5 courses at once`);
            } 
            else if (res.ok) {
                toast.success("Enrolled successfully");
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
        <Button  className='insBuy' onClick={showModal}>
            Buy Now
        </Button>
        <Modal
            title="Buy The Course"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            centered
            width={700}
            okText="Enroll Now"
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
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th style={{fontSize:'1.10rem',fontWeight:'500'}}></th>
                        <th style={{fontSize:'1.10rem',fontWeight:'500'}}>Course Name</th>
                        <th style={{fontSize:'1.10rem',fontWeight:'500'}}>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={course.id}>
                        <td><img src={course.image} alt="" style={{height:"50px",width:"60px"}}/></td>
                        <td style={{verticalAlign:'middle'}}>{course.title}</td>
                        <td style={{verticalAlign:'middle'}}>&#8377; {course.price?course.price.toLocaleString('en-IN'):''}</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <div style={{display:'flex',justifyContent:'end',padding:'0 5% 0 5%',marginTop:'2%'}}>
                <span style={{fontSize:'1.5rem'}}>Total :&nbsp;&#8377;{(course.price*1.05).toLocaleString('en-IN')}</span> &nbsp;&nbsp; <span style={{fontSize:'0.8rem',fontWeight:'300',fontStyle:'italic'}}>(5% gst)</span>
            </div>
            <br />
            </Form>
        </Modal>
        
    </>
  );
};


export default BuyNow;