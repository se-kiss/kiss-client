import { AppProps } from 'next/app'
import { FC } from 'react'
import 'tailwindcss/tailwind.css'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default App
