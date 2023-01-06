import dynamic from 'next/dynamic'
const ArticleManage = dynamic(
    import('./ArticleManage'),
    {
      ssr: false   //这个要加上,禁止使用 SSR
    }
  )
import React from 'react'
import withLayout from '../../../../components/Layout'

function Index(props:any) {
  return (
    <div>
      <ArticleManage {...props}/>
    </div>
  )
}
export default (props:any) => withLayout(<Index {...props}/>)