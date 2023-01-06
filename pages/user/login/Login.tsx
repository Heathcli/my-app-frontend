import { Button } from 'antd';
import React from 'react'
import http from '../../../lib/http';

export default function Login() {
  const onFinish = (values: any) => {
    http.post('/user/login',values).then((res)=>{
        console.log(document.cookie);

    })
  };

  return (
    <div>
      <Button type="primary">Primary Button</Button>
    </div>
  )
}
