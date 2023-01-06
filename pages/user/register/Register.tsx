import React from 'react'
import http from '../../../lib/http';

export default function Register() {
  const onFinish = (values: any) => {
    http.post('/user/register',values).then(()=>{
      
    })
  };

  return (
    <div>zhuce</div>
  )
}
