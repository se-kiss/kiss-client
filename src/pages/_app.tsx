import {AppProps} from 'next/app'
import Head from 'next/head'
import {FC} from 'react'
import {createGlobalStyle} from 'styled-components'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import 'tailwindcss/tailwind.css'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Helvetica Neue", Helvetica, san-serif;
    background: #FCFDFE;
  }
`

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
})

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('AUTH_TOKEN')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

export default App
