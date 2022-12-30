import dynamic from 'next/dynamic'
const Index = dynamic(
    import('./Register')
)

export default () => <Index />