import Head from 'next/head'
import {useRouter} from 'next/router'
import {Button, Loading, Spacer} from '@geist-ui/react'
import { useForm } from 'react-hook-form'
import useBooks from '@/hooks/useBooks'
const BookInstanceStatus = [
   "Available",
   "Maintenance",
   "Loaned",
   "Reserved"
]
export default function CreateBookInstance() {
   const { books, isError, isLoading } = useBooks()
   const { handleSubmit, register, reset } = useForm()

   const router = useRouter()
   async function createBookinstance(data){
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookinstances`,
         {
           body: JSON.stringify({
            status: data.status,
            imprint: data.imprint,
            due_back: data.due_back,
            book: data.book,
           }),
           headers: {
             'Content-Type': 'application/json'
           },
           method: 'POST'
         }
      )
      const result = await res.json()
      router.push(`/catalog/bookinstances/details/${result.id}`)
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
         isError ? <div>An error has occurred.</div>
         : isLoading ? <Loading />
         :
        <form id="bookinstance-form" onSubmit={handleSubmit(createBookinstance)}>
           <div>
            <label htmlFor="book">Book</label>
            <select type="text" name="book" id="book" {...register('book')}>
               {books.map((book) => {
                  return(
                     <option key={book.id} value={book.id}>
                        {book.title}
                     </option>
                  )
               })}
            </select>
           </div>
           <Spacer y={1} />
           <div>
            <label htmlFor="status">Status</label>
            <select type="text" name="status" id="status" {...register('status')}>
               {BookInstanceStatus.map((status, id) => {
                  return(
                     <option key={id} value={status}>
                        {status}
                     </option>
                  )
               })}
            </select>
           </div>
           <Spacer y={1}/>
           <div>
            <label htmlFor="imprint">Imprint</label>
            <input type="text" name="imprint" id="imprint" {...register('imprint')}/>
           </div>
           <Spacer y={1}/>
           <div>
            <label htmlFor="due_back">Due back</label>
            <input type="date" name="due_back" id="due_back" {...register('due_back')}/>
           </div>
           <Spacer y={2}/>
           <Button htmlType="submit" type="success" ghost>Submit</Button>
        </form>
      }
      </section>
    </div>
  )
}
