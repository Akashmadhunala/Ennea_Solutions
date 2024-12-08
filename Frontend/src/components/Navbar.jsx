import React, { useEffect, useState } from 'react'
import { Dropdown, Space,AutoComplete} from 'antd';
import {HeartOutlined,ShoppingCartOutlined} from '@ant-design/icons';
import styled from 'styled-components'
import {Link, NavLink ,useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../css/SingleCourse.css'

const Button = styled.button`
    height:32px;
    border:none;
    border-radius:10px;
    cursor:pointer;
    padding:0 10px 0 10px;
    color:black;
    background-color:#FF4040;
    font-weight:bold;
`;

const Span = styled.span`
    color:#FF4040;
`;

export default function Navbar() {
    const [options, setOptions] = useState([]);
    const [inp, setInp] = useState("");
    const navigate=useNavigate();
    const userId=localStorage.getItem('userId');  
    const fs=localStorage.getItem('fs'); 
    const ls=localStorage.getItem('ls');   
    const items = [
    {
        key: '1',
        label: (
        <Link rel="noopener noreferrer" to="/categories/development" style={{textDecoration:"none"}}>
            Development
        </Link>
        ),
    },
    {
        key: '2',
        label: (
        <Link rel="noopener noreferrer" to="/categories/data science" style={{textDecoration:"none"}}>
            Data Science
        </Link>
        ),
    },
    {
        key: '3',
        label: (
        <Link rel="noopener noreferrer" to="/categories/blockchain" style={{textDecoration:"none"}}>
            Blockchain
        </Link>
        ),
    },
    {
        key: '4',
        label: (
        <Link rel="noopener noreferrer" to="/categories/finance and accounting" style={{textDecoration:"none"}}>
            Finance & Accounting
        </Link>
        ),
    },
    {
        key: '5',
        label: (
        <Link rel="noopener noreferrer" to="/categories/business" style={{textDecoration:"none"}}>
            Business
        </Link>
        ),
    },
    {
        key: '6',
        label: (
        <Link rel="noopener noreferrer" to="/categories/lifestyle" style={{textDecoration:"none"}}>
            Lifestyle
        </Link>
        ),
    },
    {
        key: '7',
        label: (
        <Link rel="noopener noreferrer" to="/categories/government exams" style={{textDecoration:"none"}}>
            Government Exams
        </Link>
        ),
    },
    {
        key: '8',
        label: (
        <Link rel="noopener noreferrer" to="/categories/health and fitness" style={{textDecoration:"none"}}>
            Health & Fitness
        </Link>
        ),
    },
    {
        key: '9',
        label: (
        <Link rel="noopener noreferrer" to="/categories/photography and video" style={{textDecoration:"none"}}>
            Photography & Video
        </Link>
        ),
    },
    {
        key: '10',
        label: (
        <Link rel="noopener noreferrer" to="/categories/music" style={{textDecoration:"none"}}>
            Music
        </Link>
        ),
    },
    
    ];

    const handleInput =async (value) => {
        setInp(value);
        if(value.trim().length>0){
            const res = await fetch('http://localhost:8080/courses/all');
            const data = await res.json();
            const opt = data.map(course => ({
                label: course.title,
                value: course.title,
                key: course.id
            }));
            setOptions(opt);
        }
        else{
            setOptions([]);
        }
      };
    
      const handleSelect = (value) => {
        setInp(value); 
      };
    
      const handleSubmit = async () => {
        const query=inp;
        // setInp("");
        if(query.length>0)
           return navigate(`/search/${query}`);
      };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid" style={{width:"95%"}}>
            <NavLink className="navbar-brand" to="/" style={{fontWeight:"bold"}}><Span>C</Span>ourse<Span>N</Span>est</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Dropdown menu={{items,}} className="nav-link active" overlayStyle={{width:250}}>
                        <NavLink onClick={(e) => e.preventDefault()}>
                        <Space style={{cursor:"pointer"}}>
                            All Categories
                        </Space>
                        </NavLink>
                    </Dropdown>
                </li>
            </ul>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li>
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}> {/* Prevent default form submission */}
                    <AutoComplete
                    style={{ width: 300 }}
                    options={options} // Use options based on input value
                    onSearch={handleInput} // Update input value on search
                    onSelect={handleSelect} // Update input value on selection
                    filterOption={true} 
                    value={inp}
                    placeholder="Search Any Product"
                    />
                    &nbsp;&nbsp;
                    <Button type="submit" onClick={handleSubmit}>Search</Button>
                    </form>
                </li>
            </ul><br />
            {userId?
            <ul className="navbar-nav me-end mb-2 mb-lg-0">
                {localStorage.getItem('role')=="ADMIN"?
                    <>
                    <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to={`/allusers`}>All Users</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to={`/course/add`}>Add Course</NavLink>
                    </li></>:<></>
                }
                <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to={`/users/courses_enrolled/${userId}`}>My Courses</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to={`/users/wishlist/${userId}`}><HeartOutlined  style={{fontSize:"1.5rem"}}/></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to={`/users/cart/${userId}`}><ShoppingCartOutlined style={{fontSize:"1.5rem"}} /></NavLink>
                </li>&nbsp;
                <li className="nav-item">
                    <NavLink className="nav-link active profcir" aria-current="page" to={`/profile/${userId}`}>{fs.charAt(0)}{ls.charAt(0)}</NavLink>
                </li>
            </ul>
            :
            <ul className="navbar-nav me-end mb-2 mb-lg-0">
                <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to={`/login`} style={{backgroundColor:'#ff4040',color:'#000',fontWeight:'600',width:'80px',textAlign:'center',borderRadius:'20px',padding:'5px'}}>Sign In</NavLink>
                </li>
            </ul>}
            </div>
        </div>
    </nav>
  )
}
