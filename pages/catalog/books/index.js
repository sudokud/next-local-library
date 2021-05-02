import Head from 'next/head'
import Link from 'next/link'
import { Card, Grid } from '@geist-ui/react'
export default function Books({data, notFound}) {  
  return (
    <div>
      <Head>
        <title>Book list</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="main-section">
        <h1>
         Books
        </h1>
        {notFound ? <div>not found</div> :
        <Grid.Container gap={1}>{
            data.map((book) => {
               return(
                 <Grid key={book.id}>
                  <Card>
                    <Link style={{ width: '100%'}} href="/catalog/books/details/[id]" as={`/catalog/books/details/${book.id}`} >
                      <a>
                          <h4>{book.title}</h4>
                      </a>
                    </Link>
                    <p>author: {book.author.family_name} {book.author.first_name}</p>
                  </Card>
                 </Grid>
               )
            })
         }</Grid.Container>
        }
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/books/?_sort=updated_at:DESC`)
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