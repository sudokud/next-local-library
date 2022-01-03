import Head from 'next/head'
import Link from 'next/link'
import { Card, Grid } from '@geist-ui/react'
export default function Books({ books, notFound }) {
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
            books.data.map((book) => {
              return (
                <Grid key={book.id}>
                  <Card>
                    <Link style={{ width: '100%' }} href="/catalog/books/details/[id]" as={`/catalog/books/details/${book.id}`} >
                      <a>
                        <h4>{book.attributes.title}</h4>
                      </a>
                    </Link>
                    <p style={{ textDecoration: "underline" }}>
                      by &nbsp;
                      {book.attributes.author.data.attributes.first_name}
                      &nbsp;
                      {book.attributes.author.data.attributes.family_name}
                    </p>
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/books?populate[]=author`)
  const books = await res.json()
  if (!books.data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { books }, // will be passed to the page component as props
  }
}