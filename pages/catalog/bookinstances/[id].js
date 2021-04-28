import { useState } from 'react'
import { Divider, Button, Modal } from '@geist-ui/react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

const BookInstance = ({bookinstance}) => {
   const router = useRouter()
   const { id } = router.query
   const [state, setState] = useState(false)
   const handler = () => setState(true)
   const closeHandler = () => {
      setState(false)
   }
   async function DeleteInstance() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookinstances/${id}`,
      {
         method:"DELETE",
         headers: {
            'Content-Type' : 'application/json'
         },
         body: null
      })
      // setError(!res.ok)
      // const data = await res.json();
      setState(false)
      router.push(`/catalog/bookinstances`)
   }

   return(
      <div>
         <Head>
            <title>Book instance</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <section className="main-section">
            <h2 > #{bookinstance.id} </h2> 
            <h2> Title </h2>
            <Link href={`/catalog/books/${bookinstance.book.id}`}><a>{bookinstance.book.title}</a></Link>
            <h2> imprint </h2> <p> {bookinstance.imprint} </p>
            <h2> status </h2> <p className={bookinstance.status}> {bookinstance.status} </p>
            <h2> due back </h2> <p> {bookinstance.due_back} </p>
            <Divider />
            <Button auto onClick={handler} type="error">Delete instance</Button>
            <Link href={`/catalog/bookinstances/update/${bookinstance.id}`}>
               <a>
                  <Button auto type="default">Update instance</Button>
               </a>
            </Link>
            <Modal open={state} onClose={closeHandler}>
               <Modal.Title>CONFIRM DELETE INSTANCE ?</Modal.Title>
               <Modal.Subtitle>This action is ireversible</Modal.Subtitle>
               <Modal.Action passive onClick={() => setState(false)}>Cancel</Modal.Action>
               <Modal.Action onClick={DeleteInstance}>Confirm</Modal.Action>
            </Modal>
         </section>
      </div>
   )
}
export default BookInstance





export async function getStaticPaths() {
   // Call an external API endpoint to get books
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookinstances`)
   const bookinstances = await res.json()
 
   // Get the paths we want to pre-render based on books
   const paths = bookinstances.map((bookinstance) => ({
     params: { id: bookinstance.id.toString() },
   }))
 
   // We'll pre-render only these paths at build time.
   // { fallback: false } means other routes should 404.
   return { paths, fallback: false }
 }

export async function getStaticProps({ params }) {
   // Call an external API endpoint to get books.
   // You can use any data fetching library
   // params contains the book `id`.
  // If the route is like /book/1, then params.id is 1
   const ID = params.id
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookinstances/${ID}`)
   const bookinstance = await res.json()
 
   // By returning { props: { books } }, the Book component
   // will receive `book` as a prop at build time
   return {
     props: {
       bookinstance,
     },
   }
 }