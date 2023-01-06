import dynamic from 'next/dynamic'
const PublishContent = dynamic(
    import('./PublishContent'),
    {
      ssr: false   //这个要加上,禁止使用 SSR
    }
  )
import React from 'react'
import withLayout from '../../../../../components/Layout'

function Index(props:any) {
  return (
    <div>
      <PublishContent {...props}/>
    </div>
  )
}
export default (props:any) => withLayout(<Index {...props}/>)