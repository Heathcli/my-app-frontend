import dynamic from 'next/dynamic'
import React from 'react'
const DynamicComponent= dynamic(
  () => import('./Login')
)

function Index(props:any) {
  return (
    <>
      <DynamicComponent {...props}/>
    </>
  )
}

export default () => <Index/>