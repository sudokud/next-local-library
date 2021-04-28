import Head from 'next/head'
import {useRouter} from 'next/router'
import useSWR from 'swr'
import {Button} from '@geist-ui/react'

const BookInstanceStatus = [
   "Available",
   "Maintenance",
   "Loaned",
   "Reserved"
]
export default function CreateBookInstance() {
   const fetcher = (...args) => fetch(...args).then(res => res.json())
   const { data: books, error: book_error } = useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/books`, fetcher)

   const router = useRouter()
   async function createBookinstance(event){
      event.preventDefault()
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookinstances`,
         {
           body: JSON.stringify({
            status: event.target.status.value,
            imprint: event.target.imprint.value,
            due_back: event.target.due_back.value,
            book: event.target.book.value,
           }),
           headers: {
             'Content-Type': 'application/json'
           },
           method: 'POST'
         }
      )
      const result = await res.json()
      event.target.reset()
      router.push(`/catalog/bookinstances/${result.id}`)
   
   }
  return (
    <div>
      <Head>
        <title>Create new book instance (copie)</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="main-section">
        <h1>
         New book instance
        </h1>
        {
         book_error ? "An error has occurred."
         : !books ? "Loading..."
         :
        <form id="bookinstance-form" onSubmit={createBookinstance}>
           <div>
            <label htmlFor="book">Book</label>
            <select type="text" name="book" id="book" required>
            {books.map((book) => {
               return(
                  <option key={book.id} value={book.id}>
                     {book.title}
                  </option>
               )
            })}
            </select>
           </div>
           <div>
           <label htmlFor="status">Status</label>
            <select type="text" name="status" id="status" required>
            {BookInstanceStatus.map((status, id) => {
               return(
                  <option key={id} value={status}>
                     {status}
                  </option>
               )
            })}
            </select>
           </div>
           <div>
            <label htmlFor="imprint">Imprint</label>
            <input type="text" name="imprint" id="imprint" />
           </div>
           <div>
            <label htmlFor="due_back">Due back</label>
            <input type="date" name="due_back" id="due_back" />
           </div>
           <Button htmlType="submit" type="success" ghost>Submit</Button>
        </form>
      }
      </section>
    </div>
  )
}
