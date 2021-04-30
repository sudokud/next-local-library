import {useEffect} from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {Button, Loading, Spacer} from '@geist-ui/react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'

export default function UpdateBookInstance({bookinstance}) {
  const BookInstanceStatus = [
    "Available",
    "Maintenance",
    "Loaned",
    "Reserved"
 ]
  const router = useRouter()
  const { id } = router.query
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data: books, error: book_error } = useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/books`, fetcher)
  const { register, handleSubmit, reset } = useForm({mode: "onChange"});

  useEffect(async () => {
    // reset
    reset({
      status: bookinstance.status,
      imprint: bookinstance.imprint,
      due_back: bookinstance.due_back,
      book: bookinstance.book.id,
    });
  }, [reset])

  async function update(data){
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookinstances/${id}`,
      {
        body: JSON.stringify({
        status: data.status,
        imprint: data.value,
        due_back: data.due_back,
        book: data.book,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      }
    )
    router.push(`/catalog/bookinstances/${id}`)
  }
  return (
    <div>
      <Head>
        <title>Update book instance (copie)</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="main-section">
        <h1>
         Update book instance
        </h1>
        <form id="bookinstance-form" onSubmit={handleSubmit(update)}>
          {book_error ? <div>an error occured</div> : !books && !book_error ? <Loading/> : 
           <div>
            <label htmlFor="book">Book Instance</label>
            <select type="text"  id="book" {...register("book")}>
              {books.map((book) => {
                return(
                    <option key={book.id} value={book.id}>
                      {book.title}
                    </option>
                )
              })}
            </select>
           </div>
           }
           <Spacer y={1}/>
           <div>
           <label htmlFor="status">Status</label>
            <select type="text" id="status" {...register("status")}>
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
            <input type="text" id="imprint" {...register("imprint")}/>
           </div>
           <Spacer y={1}/>
           <div>
            <label htmlFor="due_back">Due back</label>
            <input type="date"  id="due_back" {...register("due_back")}/>
           </div>
           <Spacer y={2}/>
           <Button htmlType="submit" type="success" ghost> Submit </Button>
        </form>
      </section>
    </div>
  )
}



export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookinstances`)
  const bookinstances = await res.json()
  const paths = bookinstances.map((bookinstance) => ({
    params: { id: bookinstance.id.toString() },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const ID = params.id
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookinstances/${ID}`)
  const bookinstance = await res.json()
  return {
    props: {
      bookinstance,
    },
  }
}