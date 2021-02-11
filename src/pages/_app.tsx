import {AppProps} from 'next/app'
import Head from 'next/head'
import {FC} from 'react'
import {MockProvider} from '../mock/MockContext'
import {createGlobalStyle} from 'styled-components'
import 'tailwindcss/tailwind.css'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Helvetica Neue", Helvetica, san-serif;
    background: #f6fcff;
  }
`

const App: FC<AppProps> = ({Component, pageProps}) => {
  return (
    <>
      <Head>
        <title>KiSS</title>
      </Head>
      <GlobalStyle />
      <MockProvider>
        <Component {...pageProps} />
      </MockProvider>
    </>
  )
}

export default App
