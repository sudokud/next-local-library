import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button, Spacer } from '@geist-ui/react'

export default function CreateGenre() {
   const router = useRouter()
   async function createGenre(event){
      event.preventDefault()
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_API_ENDPOINT}/genres`,
         {
           body: JSON.stringify({
            name: event.target.name.value,
           }),
           headers: {
             'Content-Type': 'application/json'
           },
           method: 'POST'
         }
      )
      // const result = await res.json()
      event.target.reset()
      router.push('/catalog/genres')
   
   }
  return (
    <div>
      <Head>
        <title>Create new Genre</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="main-section">
        <h1>
         New Genre
        </h1>
        <form id="genre-form" onSubmit={createGenre}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" required/>
          </div>
          <Spacer y={2}/>
          <Button type="success" htmlType="submit">Submit</Button>
        </form>
      </section>
    </div>
  )
}