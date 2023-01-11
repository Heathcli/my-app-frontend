import { Button, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import http from '../../../../lib/http';
import Login from '../../login';
import UserCenter from '../../../../components/UserCenterLayout'

export default function Index(props: any) {

  const [form] = Form.useForm()

  useEffect(()=>{
    // form.setFieldsValue(props.data.userInit)
  },[])

  const onFinish = (values: any) => {
    http.post('/user/register', values).then(() => {
      message.success('注册成功')
    })
  };

  return (
    <div>
      <UserCenter>edit</UserCenter>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const data = await http.post(
    '/user/mod-init',
    {},
    { headers: { 'authorization': `Bearer ${context.query.token}` } }
  ).catch(err => {
    return {err}
    
  })
  return {
    props: { data }, // will be passed to the page component as props
  }


}