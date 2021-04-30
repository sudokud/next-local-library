import { Card, Grid, Divider } from '@geist-ui/react'
import Head from 'next/head'
import Link from 'next/link'

export default function Authors({ data }) {
  return (
    <div>
      <Head>
        <title>Authors</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="main-section">
        <h1>
         Authors
        </h1>
        <Grid.Container gap={2}>{
            data.map((author) => {
               return(
                  <Grid key={author.id}>
                     <Card>
                     <Link href={`/catalog/authors/${author.id}`}>
                        <a>
                           <h3>{author.family_name} {author.first_name}</h3>
                        </a>
                     </Link>
                     <Divider y={0} />
                     <h4>Books</h4>
                     <ul>
                        {author.books.map(({title, id})=>{
                           return(
                              <li key={id}>
                                 <Link href={`/catalog/books/${id}`}>
                                    <a>{title}</a>
                                 </Link>
                              </li>
                           )
                        })}
                     </ul>
                     </Card>
                  </Grid>
               )
            })
         }</Grid.Container>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/authors`)
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