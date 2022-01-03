import { useState } from 'react'
import { Divider, Button, Modal, Loading } from '@geist-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { DateTime } from 'luxon'
import useBookinstance from '@/hooks/contentTypes/useBookinstance'

const BookInstance = ({ data }) => {
   const router = useRouter()
   const { id } = router.query
   const { bookinstance, isLoading, isError } = useBookinstance({ id, initialData: data })
   const [toggleModal, setToggleModal] = useState(false)
   const handler = () => setToggleModal(true)
   const closeHandler = () => {
      setToggleModal(false)
   }
   async function DeleteInstance() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookinstances/${id}`,
         {
            method: "DELETE",
            headers: {
               'Content-Type': 'application/json'
            },
            body: null
         })
      setToggleModal(false)
      router.push(`/catalog/bookinstances`)
   }

   return (
      <div>
         <Head>
            <title>Book instance</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <section className="main-section">
            {isError ? <div>an error occured</div> : isLoading ? <Loading /> :
               <>
                  <h2 > #{bookinstance.id} </h2>
                  <h2> Title </h2>
                  <Link href={`/catalog/books/${bookinstance.book.id}`}><a>{bookinstance.book.title}</a></Link>
                  <h2> imprint </h2> <p> {bookinstance.imprint} </p>
                  <h2> status </h2> <p className={bookinstance.status}> {bookinstance.status} </p>
                  {bookinstance.due_back &&
                     <><h2> due back </h2> <p> {DateTime.fromISO(bookinstance.due_back).toLocaleString(DateTime.DATETIME_MED)} </p></>
                  }
                  <Divider />
                  <Button style={{ marginRight: "1.5vw" }} auto onClick={handler} type="error" ghost>Delete instance</Button>
                  <Link href={`/catalog/bookinstances/update/${bookinstance.id}`}>
                     <a>
                        <Button auto type="default">Update instance</Button>
                     </a>
                  </Link>
                  <Modal open={toggleModal} onClose={closeHandler}>
                     <Modal.Title>CONFIRM DELETE INSTANCE ?</Modal.Title>
                     <Modal.Subtitle>This action is ireversible</Modal.Subtitle>
                     <Modal.Action passive onClick={() => setToggleModal(false)}>Cancel</Modal.Action>
                     <Modal.Action onClick={DeleteInstance}>Confirm</Modal.Action>
                  </Modal>
               </>
            }
         </section>
      </div>
   )
}
export default BookInstance





export async function getStaticPaths() {
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookinstances`)
   const bookinstances = await res.json()

   const paths = bookinstances.map((bookinstance) => ({
      params: { id: bookinstance.id.toString() },
   }))
   return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookinstances/${params.id}`)
   const data = await res.json()
   return {
      props: {
         data,
      },
   }
}