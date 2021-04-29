import { useEffect } from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'

export default function Home() {
  const router = useRouter()
  // pushing to catalog "extra redirect"
  useEffect(() => {
    router.push('/catalog')
  },[])
  return (
    <div>
      <Head>
        <title>Local library</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="main-section">
        <h1>
          redirecting to catalog...
        </h1>
      </section>
    </div>
  )
}
