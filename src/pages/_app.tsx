import {AppProps} from 'next/app'
import Head from 'next/head'
import {FC} from 'react'
import {MockProvider} from '../mock/MockContext'
import {createGlobalStyle} from 'styled-components'
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import 'tailwindcss/tailwind.css'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Helvetica Neue", Helvetica, san-serif;
    background: #FCFDFE;
  }
`

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
  cache: new InMemoryCache(),
})

const App: FC<AppProps> = ({Component, pageProps}) => {
  return (
    <>
      <Head>
        <title>KiSS</title>
      </Head>
      <GlobalStyle />
      <ApolloProvider client={client}>
        <MockProvider>
          <Component {...pageProps} />
        </MockProvider>
      </ApolloProvider>
    </>
  )
}

export default App
