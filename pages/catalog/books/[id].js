import { Button, Divider, Modal, Note } from '@geist-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Book = ({ book }) => {
   const router = useRouter()
   const { id } = router.query
   const [state, setState] = useState(false)
   // const [error, setError] = useState(false)
   const handler = () => setState(true)
   const closeHandler = (event) => {
      setState(false)
   }
   async function DeleteBook() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/books/${id}`,
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
      router.push(`/catalog/books`)
   }
  return (
    <section className="main-section">
      <div>
         <div>
            <h2>Title:</h2><p>{book.title}</p>
         </div>
         <div>
            <h2>ISBN:</h2><p>{book.ISBN}</p>
         </div>
         <div>
            <h2>Author:</h2> <p>{book.author.family_name} {book.author.first_name}</p>
         </div>
         <div>
            <h2>Summary:</h2><p>{book.summary}</p>
         </div>
         <div>
            <h2>Genre:</h2>
            <div>
               {
               book.genres.length > 0 ? book.genres.map(({name, id}) => {
                  return(
                     <div key={id}>
                        <p>{name}</p>
                     </div>
                  )
               })
               : 
               'this book dont belong to any genre'
               }
            </div>
         </div>
         <div>
            <h2>Copies:</h2>
            <ul>
               {
               book.bookinstances.length > 0 ? book.bookinstances.map(({imprint, status, id}) => {
                  return(
                     <li key={id}>
                        <span> {imprint} </span>
                        <span className={status}> [ {status}  ]</span>
                     </li>
                  )
               })
               : 
               'there are no copies of this book in the library'
               }
            </ul>
         </div>
         <Divider />
         {/* show delete button only if book don't have instance(s) */}
         <Button style={{marginRight:"1.5vw"}} auto onClick={handler} type="error">Delete book</Button>
         <Link href={`/catalog/books/update/${book.id}`}>
            <a>
               <Button auto type="default">Update book</Button>
            </a>
         </Link>
         <Modal open={state} onClose={closeHandler}>
            {book.bookinstances.length > 0 ?
            <>
            <Modal.Title>
               <Note type="warning">delete the following copies before deleting this book</Note>
            </Modal.Title>
            <Modal.Content>
               <ul>
                  {book.bookinstances.map((copie) => {
                     return(
                        <li key={copie.id}>{copie.imprint}, #{copie.id}</li>
                     )
                  })
                  }
               </ul>
            </Modal.Content>
            </>
            :<>
            <Modal.Title>CONFIRM DELETE BOOK ?</Modal.Title>
            <Modal.Subtitle>This action is ireversible</Modal.Subtitle>
            </>
            }
            <Modal.Action passive onClick={() => setState(false)}>Cancel</Modal.Action>
            <Modal.Action disabled={book.bookinstances.length > 0} onClick={DeleteBook}>Confirm</Modal.Action>
         </Modal>
      </div>
    </section>
  )
}

export default Book

export async function getStaticPaths() {
   // Call an external API endpoint to get books
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/books`)
   const books = await res.json()
 
   // Get the paths we want to pre-render based on books
   const paths = books.map((book) => ({
     params: { id: book.id.toString() },
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
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/books/${ID}`)
   const book = await res.json()
 
   // By returning { props: { books } }, the Book component
   // will receive `book` as a prop at build time
   return {
     props: {
       book,
     },
   }
 }