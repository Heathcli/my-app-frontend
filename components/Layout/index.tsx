import React from 'react'
import Header from './Header'

export function Layout(props: any) {

  return (
    <div className='mt-layout'>
        <div className='header-box'>
            <Header/>
        </div>
        <div className='layout-box'>
        {props.children}
        </div>
    </div>
  )
}

const withLayout = (Ele: JSX.Element)  => {
    return <Layout>
         {Ele}
    </Layout>
}
export default withLayout
