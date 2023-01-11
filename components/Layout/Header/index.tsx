import React, { useEffect, useState } from 'react'

type NavList = {
    name: string,
    link: string
}

export default function Header() {

    const [navList, setNavList] = useState<NavList[]>([
        {
            name: '首页',
            link: '/'
        },
        {
            name: '动态',
            link: '/moment'
        },
        {
            name: '相册',
            link: '/album'
        },
        {
            name: '我的',
            link: '/user/center/edit-user-info'
        }
    ])

    useEffect(() => {
        
    }, [])

    const renderNav = (navList: NavList[]) => {
        return <div className='header-nav-container'>
            {navList.map(item => <a
                className='header-nav-item'
                key={item.link}
                href={item.link}
                >
                {item.name}
            </a>
            )}
        </div>
    }

    return (
        <div className='mt-header'>
            <h1 className='header-blog-name'>凌恒的博客</h1>
            {renderNav(navList)}
        </div>
    )
}
