import { Button, Divider, Modal, Note } from '@geist-ui/react'
import { useState } from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import { DateTime } from "luxon";

const Author = ({author}) => {
  const router = useRouter()
  const { id } = router.query
  const [state, setState] = useState(false)
 
  const handler = () => setState(true)
  const closeHandler = (event) => {
    setState(false)
  }
  const lifeSpan = (() => {
    let lifetime_string = '';
    if (author.date_of_birth) {
      lifetime_string = DateTime.fromISO(author.date_of_birth).toLocaleString(DateTime.DATE_MED);
    }
    lifetime_string += ' - ';
    if (author.date_of_death) {
      lifetime_string += DateTime.fromISO(author.date_of_death).toLocaleString(DateTime.DATE_MED)
    }
    return lifetime_string;
  })()
  async function DeleteAuthor() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/authors/${id}`,
     {
        method:"DELETE",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: null
     })
     const data = await res.json();
     setState(false)
     router.push('/catalog/authors')
  }
  return (
    <section className="main-section">
      <h2>Name</h2> <p>{author.first_name} {author.family_name}</p>
      <p>{lifeSpan}</p>
      <h2>Books</h2> 
      <ul>
         {author.books.map(({title, id}) => {
            return(
               <li key={id}>{title}</li>
            )
         })}
      </ul>
      <Divider />
      <Button style={{marginRight:"1.5vw"}}  auto onClick={handler} type="error">Delete author</Button>
      <Link href='/catalog/authors/update/[id]' as={`/catalog/authors/update/${author.id}`}>
        <a>
          <Button auto type="default">Update author</Button>
        </a>
      </Link>

      <Modal open={state} onClose={closeHandler}>
        {
          author.books.length > 0 ?
          <>
          <Modal.Title>
            <Note type="error"> delete the following books before delelting this author</Note>
          </Modal.Title>
          <Modal.Content>
            <ul>
              {author.books.map(({title, id})=>{
                return(
                  <li key={id}>{title}</li>
                )
              })}
            </ul>
          </Modal.Content>
          </>
          :
          <>
            <Modal.Title>CONFIRM DELETE AUTHOR ?</Modal.Title>
            <Modal.Subtitle>This action is ireversible</Modal.Subtitle>
          </>
        }
        <Modal.Action passive onClick={() => setState(false)}>Cancel</Modal.Action>
        <Modal.Action disabled={author.books.length > 0} onClick={DeleteAuthor}>Confirm</Modal.Action>
      </Modal>
    </section>
  )
}

export default Author

export async function getStaticPaths() {
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/authors`)
   const authors = await res.json()
   const paths = authors.map((author) => ({
     params: { id: author.id.toString() },
   }))
   return { paths, fallback: false }
 }

export async function getStaticProps({ params }) {
   const ID = params.id
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/authors/${ID}`)
   const author = await res.json()
   return {
     props: {
       author,
     },
     // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
   }
 }