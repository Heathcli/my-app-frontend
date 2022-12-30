import dynamic from 'next/dynamic'
const Index = dynamic(
    import('./Login'),
)

export default () => <Index />