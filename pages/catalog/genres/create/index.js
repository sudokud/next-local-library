import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button, Spacer } from '@geist-ui/react'
import { useForm } from 'react-hook-form'

export default function CreateGenre() {
   const router = useRouter()
  const { register, handleSubmit, reset } = useForm({mode: "onChange"});

   async function createGenre(data){
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/genres`,
        {
          body: JSON.stringify({
          name: data.name,
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }
    )
    //do something with the status
    // const status = res.status
    //redirect to all genres
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
        <form id="genre-form" onSubmit={handleSubmit(createGenre)}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" {...register("name", { required: true })}/>
          </div>
          <Spacer y={2}/>
          <Button type="success" htmlType="submit" ghost>Submit</Button>
        </form>
      </section>
    </div>
  )
}