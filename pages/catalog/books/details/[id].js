import { Button, Divider, Loading, Modal, Note } from '@geist-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useBook from '@/hooks/useBook'
const Book = () => {
   const router = useRouter()
   const [toggleModal, setToggleModal] = useState(false)

   const { book, isError, isLoading } = useBook(router.query.id)

   const handler = () => setToggleModal(true)
   const closeHandler = (event) => {
      setToggleModal(false)
   }
   async function DeleteBook() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/books/${router.query.id}`,
      {
         method:"DELETE",
         headers: {
            'Content-Type' : 'application/json'
         },
         body: null
      })
      setToggleModal(false)
      router.push(`/catalog/books`)
   }
  return (
    <section className="main-section">
      {
      isError ? "an error occured !" : isLoading ? <Loading /> :
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
         <Button style={{marginRight:"1.5vw"}} auto onClick={handler} type="error">Delete book</Button>
         <Link href={`/catalog/books/update/${book.id}`}>
            <a>
               <Button auto type="default">Update book</Button>
            </a>
         </Link>
         <Modal open={toggleModal} onClose={closeHandler}>
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
            <Modal.Action passive onClick={() => setToggleModal(false)}>Cancel</Modal.Action>
            <Modal.Action disabled={book.bookinstances.length > 0} onClick={DeleteBook}>Confirm</Modal.Action>
         </Modal>
      </div>
      }
    </section>
  )
}

export default Book
