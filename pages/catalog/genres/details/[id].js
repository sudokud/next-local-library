import { useState } from 'react'
import Link from 'next/link'
import { Divider, Button, Modal, Note, Spacer } from '@geist-ui/react'
const Genre = ({genre}) => {
  const [toggleModal, setToggleModal] = useState(false)
  const handler = () => setToggleModal(true)
  const closeHandler = () => {
  setToggleModal(false)
  }
  async function DeleteGenre() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/genres/${id}`,
    {
       method:"DELETE",
       headers: {
          'Content-Type' : 'application/json'
       },
       body: null
    })
    // const data = await res.json();
    setToggleModal(false)
    router.push(`/catalog/genres`)
 }
  return (
    <section className="main-section">
      <div>
        <h2>Name:</h2>
        <p>{genre.name}</p>
      </div>
      <Spacer y={1} />
      <div>
        <h2>Books:</h2>
        <ul>
          {
          genre.books.map(({title, id}) => {
              return(
                <li key={id}>
                  <p>{title}</p>
                </li>
              )
          })
          }
        </ul>
      </div>
      <Divider />
      <Button style={{marginRight:"1.5vw"}} auto onClick={handler} type="error" ghost>Delete genre</Button>
      <Link href={`/catalog/genres/update/${genre.id}`}>
        <a>
          <Button auto type="default">Update genre</Button>
        </a>
      </Link>

      <Modal open={toggleModal} onClose={closeHandler}>
        {genre.books.length > 0 ?
        <>
          <Modal.Title>
            <Note type="warning">Delete the following books before deleting this genre</Note>
          </Modal.Title>
          <Modal.Content>
          <ul>
            {genre.books.map((book) => {
              return <li key={book.id}>{book.title}</li> // you can add a link to each book if you want
            })}
          </ul>
          </Modal.Content>
        </>
        :
        <>
          <Modal.Title>CONFIRM DELETE GENRE ?</Modal.Title>
          <Modal.Content>
            <p>this is an irreversible acction</p>
          </Modal.Content>
        </>
        }
        <Modal.Action passive onClick={() => setToggleModal(false)}>Cancel</Modal.Action>
        <Modal.Action disabled={genre.books.length > 0} onClick={DeleteGenre}>Confirm</Modal.Action>
      </Modal>
    </section>
  )
}

export default Genre

export async function getStaticPaths() {
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/genres`)
   const genres = await res.json()
    const paths = genres.map((genre) => ({
     params: { id: genre.id.toString() },
   }))
   return { paths, fallback: false }
 }

export async function getStaticProps({ params }) {
   const ID = params.id
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/genres/${ID}`)
   const genre = await res.json()
   return {
     props: {
       genre,
     },
   }
 }