import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
const Spinner = () => (
  
    <div style={{width:"100%",height:"100vh",display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Spin indicator={<LoadingOutlined style={{fontSize: 64,color:'#ff4040'}}spin/>}/>
    </div>
  
);
export default Spinner;