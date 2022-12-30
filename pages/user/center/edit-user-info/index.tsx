import dynamic from 'next/dynamic'
const Index = dynamic(
    import('./EditUserInfo'),
  )
  
  export default () => <Index />