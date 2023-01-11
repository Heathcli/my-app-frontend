import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../components/index.less'
import { ConfigProvider } from 'antd'

function MyApp({ Component, pageProps }: AppProps) {
  return <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#b5826d',
      },
    }}
    autoInsertSpaceInButton={false}
  >
    <Component {...pageProps} />
  </ConfigProvider>

}

export default MyApp
