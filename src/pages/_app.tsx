import {AppProps} from 'next/app'
import {FC} from 'react'
import {createGlobalStyle} from 'styled-components'
import 'tailwindcss/tailwind.css'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Helvetica Neue", Helvetica, san-serif;
  }
`

const App: FC<AppProps> = ({Component, pageProps}) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default App
