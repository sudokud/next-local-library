import Head from 'next/head'
import Link from 'next/link'
import { Grid, Card, Divider} from '@geist-ui/react'
export default function Genres({ data }) { 
  return (
    <div>
      <Head>
        <title>Genres</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="main-section">
        <h1 >
         Genres
        </h1>
        <Grid.Container gap={1}>{
            data.map((genre) => {
               return(
                  <Grid key={genre.id}>
                    <Card>

                    <Link href={`/catalog/genres/details/${genre.id}`}>
                      <a>
                        <h3>{genre.name}</h3>
                      </a>
                    </Link>
                    <Divider />
                    <h4>Genre's books</h4>
                    <ul>
                      { genre.books.length > 0 ?
                        genre.books.map(({title, id}) => {
                          return(
                            <li key={id}>
                              <Link href={`/catalog/books/${id}`}><a>{title}</a></Link>
                            </li>
                          )
                        }) 
                        :
                        "None"
                      }
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/genres`)
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