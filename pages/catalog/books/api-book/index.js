//this page is not part of the tutorial, it's just a test for api routes

import useSwr from 'swr'
import { Spinner } from '@geist-ui/react'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Index() {
  const { data, error } = useSwr('/api/books', fetcher)

  if (error) return <div>Failed to load books</div>
  if (!data) return <div style={{paddingTop:"15vh"}}><Spinner/></div>

  return (
    <ul style={{paddingTop:"15vh"}}>
      {data.map((book) => (
        <li key={book.id}>
          <h5>Book title:</h5>
          <p>{book.title}</p>
        </li>
      ))}
    </ul>
  )
}