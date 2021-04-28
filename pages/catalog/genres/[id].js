import { useState } from 'react'
import Link from 'next/link'
import { Divider, Button, Modal, Note, Spacer } from '@geist-ui/react'
const Genre = ({genre}) => {
  const [state, setState] = useState(false)
   // const [error, setError] = useState(false)
   const handler = () => setState(true)
   const closeHandler = (event) => {
      setState(false)
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
    console.log(res.status)
    // const data = await res.json();
    setState(false)
    // router.push(`/catalog/genres`)
 }
  return (
    <section className="main-section">
      <div>
        <h2>Name:</h2>
        <p>{genre.name}</p>
      </div>
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

      <Modal open={state} onClose={closeHandler}>
        {genre.books.length > 0 ?
        <>
          <Modal.Title>
            <Note type="warning">Delete the following books before deleting this genre</Note>
          </Modal.Title>
          <Modal.Content>
          <ul>
            {genre.books.map((book) => {
              return <li key={book.id}>{book.title}</li>
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
        <Modal.Action passive onClick={() => setState(false)}>Cancel</Modal.Action>
        <Modal.Action disabled={genre.books.length > 0} onClick={DeleteGenre}>Confirm</Modal.Action>
      </Modal>
    </section>
  )
}

export default Genre

export async function getStaticPaths() {
   // Call an external API endpoint to get genres
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/genres`)
   const genres = await res.json()
 
   // Get the paths we want to pre-render based on genres
   const paths = genres.map((genre) => ({
     params: { id: genre.id.toString() },
   }))
 
   // We'll pre-render only these paths at build time.
   // { fallback: false } means other routes should 404.
   return { paths, fallback: false }
 }

export async function getStaticProps({ params }) {
   // Call an external API endpoint to get genres.
   // You can use any data fetching library
   // params contains the genre `id`.
  // If the route is like /genre/1, then params.id is 1
   const ID = params.id
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/genres/${ID}`)
   const genre = await res.json()
 
   // By returning { props: { genres } }, the genre component
   // will receive `genre` as a prop at build time
   return {
     props: {
       genre,
     },
   }
 }