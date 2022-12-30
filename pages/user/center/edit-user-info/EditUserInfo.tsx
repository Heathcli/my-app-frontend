import { Button, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import http from '../../../../lib/http';
import Login from '../../login';

export default function Index(props: any) {

  const [form] = Form.useForm()

  useEffect(()=>{
    form.setFieldsValue(props.data.userInit)
  },[])

  const onFinish = (values: any) => {
    http.post('/user/register', values).then(() => {
      message.success('注册成功')
    })
  };
  
  if(props.data.err){
    return <div>404</div>
  }

  return (
    <Form
      name="basic"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="userName"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
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