import dynamic from 'next/dynamic'
const Index = dynamic(
    import('./Center'),
)

export default () => <Index />