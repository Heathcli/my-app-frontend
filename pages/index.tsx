import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import styles from  './Home.module.less'
import http from '../lib/http'
import Link from 'next/link'
import withLayout from '../components/Layout'
import { useEffect } from 'react'

const Home: NextPage = (props:any) => {
  useEffect(()=>{
    console.log(props);
    
  },[])

  return (
    <div className={styles.a}>
      <Link href={'/user/register'}>
        <a>注册</a>
      </Link>
      <Link href={'/user/login'}>
        <a>登录</a>
      </Link>
    </div>
  )
}
export const getServerSideProps = async (context:any) => {
  let a = {}
  
  // 调用外部 API 获取博文列表
  http.post('/article/list',{}).then((res:any)=>{
   a = res
  }).catch(()=>{
    a = 1
  })
  // const posts = await res.json()
  
  return {
    props: {
      a:'asasas'
    }
  }

  // 通过返回 { props: { posts } } 对象，Blog 组件
  // 在构建时将接收到 `posts` 参数

}

export default (props:any) => withLayout(<Home {...props}/>)
