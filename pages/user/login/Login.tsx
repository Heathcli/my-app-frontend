import { Button } from 'antd';
import React from 'react'
import http from '../../../lib/http';

export default function Login() {
  const onFinish = (values: any) => {
    http.post('/user/login',{
      user_name:'matao',
      password:'pLikejhwLikeyD1'
    }).then((res)=>{
        console.log(document.cookie);

    })
  };

  return (
    <div>
      <Button type="primary" onClick={onFinish}>Primary Button</Button>
    </div>
  )
}
