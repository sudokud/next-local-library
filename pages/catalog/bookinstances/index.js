import { Card, Divider, Grid, Tag } from '@geist-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import {DateTime} from 'luxon'


export default function Bookinstances({data}) {
  return (
    <div>
      <Head>
        <title>Books copies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="main-section">
        <h1 >
          Book instances (Copies)
        </h1>
        <Grid.Container gap={1}>{
            data.map((copie) => {
               return(
                <Grid key={copie.id}>
                  <Card>
                  <h4>
                    <Link as={`/catalog/bookinstances/details/${copie.id}`} href='/catalog/bookinstances/details/[id]'>
                      <a>
                        {copie.book ? copie.book.title : "copie has no book (bug)"}
                      </a>
                    </Link>
                  </h4>
                  <Divider />
                  <p>imprint: {copie.imprint}</p>
                  <p className={`${copie.status}`}>{copie.status}</p>
                  {copie.status !== 'Available' &&
                    <p>due back: {DateTime.fromISO(copie.due_back).toLocaleString(DateTime.DATETIME_MED)}</p>
                  }
                  </Card>
                </Grid>
               )
            })
         }</Grid.Container>
        <div style={{
          position:"fixed",
          right:9,
          bottom:18,
         }}>
          <Tag type="warning" invert>SSR</Tag>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookinstances`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {data}, // will be passed to the page component as props
  }
}