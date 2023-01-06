import dynamic from 'next/dynamic'
import http from '../../../../lib/http'
import React, { useEffect } from 'react'
import withLayout from '../../../../components/Layout'
const DynamicComponent= dynamic(
  () => import('./EditUserInfo'),
  { ssr:false }
)

function Index(props:any) {
  return (
    <>
      <DynamicComponent {...props}/>
    </>
  )
}

export default (props:any) => withLayout(<Index {...props}/>)