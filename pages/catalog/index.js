import Head from 'next/head'
import useSWR from 'swr'
import { Loading } from '@geist-ui/react'
export default function Home() {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data: books, error: book_error } = useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/books/count`, fetcher)
  const { data: authors, error: author_error } = useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/authors/count`, fetcher)
  const { data: genres, error: genre_error } = useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/genres/count`, fetcher)
  const { data: copies, error: copies_error } = useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookinstances/count`, fetcher)
  const { data: copies_available, error: copies_available_error } = useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookinstances/count?status=Available`, fetcher)
  return (
    <div>
      <Head>
        <title>Catalog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="main-section">
        <h1>
          The library has the following record counts:
        </h1>
        {
        book_error || author_error || genre_error || copies_error || copies_available_error ? "An error has occurred."
        : !books || !authors || !genres || !copies || !copies_available ? <Loading/>
        :
         <div>
            <h3>Books: {books}</h3>
            <h3>Authors: {authors}</h3>
            <h3>Genres: {genres}</h3>
            <h3>copies: {copies}</h3>
            <h3>copies available: {copies_available}</h3>
         </div>
        }
      </section>
    </div>
  )
}
