import Head from 'next/head'
import Link from 'next/link'
export default function Home() {
  
  return (
    <div>
      <Head>
        <title>Local library</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="main-section">
        <h1>
          Home
        </h1>
        <Link href="/catalog">
          <a>catalog</a>
        </Link>
      </section>
    </div>
  )
}
