import {AppProps} from 'next/app'
import Head from 'next/head'
import {FC} from 'react'
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
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <GlobalStyle />
      <ApolloProvider client={client}>
          <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

export default App
