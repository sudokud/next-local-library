import { useEffect } from 'react'
import Head from 'next/head'
import { Button, Input, Spacer } from '@geist-ui/react'
import { withRouter } from 'next/router'
import { useForm } from "react-hook-form"

function UpdateGenre({ router }) {
  let id = router.query.id
  const { register, handleSubmit, reset } = useForm({mode: "onChange"});

  useEffect(async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/genres/${id}`);
    if (!res.ok) {
      const message = `An error has occured: ${res.status}`;
      throw new Error(message);
    }
    const genre = await res.json()
    // reset
    console.log(genre)
    reset({
      genre: genre.name,
    });
  }, [reset])

  // function called when we submit our data
  async function updateGenre(data){
     console.log(data)
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/genres/${id}`,
        {
          body: JSON.stringify({
          name: data.genre,
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'PUT'
        }
    )
    const result = await res.json()
    router.push(`/catalog/genres/${id}`)
  }
  return (
    <div>
      <Head>
        <title>Update Genre</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="main-section">
        <h1>
         Update Genre
        </h1>
        <form id="author-form" onSubmit={handleSubmit(updateGenre)}>
          <div>
            {/* <label htmlFor="genre">Name</label> */}
            {/* <input type="text" name="genre" id="genre" {...register("genre")}/> */}
            <Input type="text" name="genre" id="genre" {...register("genre")}>genre</Input>
          </div>
          <Spacer y={1} />
          <Button auto type="success" ghost htmlType="submit"> Submit </Button>
        </form>
      </section>
    </div>
  )
}


export default withRouter(UpdateGenre)