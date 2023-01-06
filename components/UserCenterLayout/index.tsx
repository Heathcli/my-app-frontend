import React, { useEffect, useState } from 'react'
import http from '../../lib/http'
import withLayout from '../../components/Layout'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import styles from './center.module.less'
import { GetServerSideProps } from 'next/types'
import { Breadcrumb, Layout, Menu, MenuProps } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import Link from 'next/link';


function Center(props: any) {

  const [navList, setNavList] = useState<MenuProps['items']>([
    {
      key: '/user/center/edit-user-info',
      icon: React.createElement(UserOutlined),
      label: <Link href={'/user/center/edit-user-info'}><a href='/user/center/edit-user-info'>个人信息</a></Link>,
      style: {
        height: '50px'
      }
    },
    {
      key: '/user/center/article-manage',
      icon: React.createElement(LaptopOutlined),
      label: <Link href={'/user/center/article-manage'}><a href='/user/center/article-manage'>文章管理</a></Link>,
      style: {
        height: '50px'
      }
    },
  ])
  const [selectedKey, setSelectedKey] = useState<string[]>([window.location.pathname])

  const colorBgContainer = '#fff'

  return (
    <div className='mt-user-center'>
      <Layout hasSider={true} style={{ minHeight: '800px' }}>
        <Layout hasSider={true}>
          <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={selectedKey}
              style={{ height: '100%', borderRight: 0, paddingTop: '6px' }}
              items={navList}
            />
          </Sider>
          <Layout style={{ padding: '0 0 0 24px' }}>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              {props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}



export default Center