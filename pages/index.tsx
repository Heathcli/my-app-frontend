import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import http from '../lib/http'
import Link from 'next/link'

const Home: NextPage = () => {

  return (
    <div>
      <Link href={'/user/register'}>
        <a>注册</a>
      </Link>
      <Link href={'/user/login'}>
        <a>登录</a>
      </Link>
    </div>
  )
}

export default Home
