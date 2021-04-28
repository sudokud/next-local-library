import {GeistProvider, CssBaseline} from '@geist-ui/react'
import '../styles/globals.css'

import AppNav from '../components/AppNav'
function MyApp({ Component, pageProps }) {
  return (
    <GeistProvider>
      <CssBaseline />
      <AppNav />
      <main style={{paddingLeft:"20vw"}}>
        <Component {...pageProps} />
      </main>
    </GeistProvider>
    )
}

export default MyApp
