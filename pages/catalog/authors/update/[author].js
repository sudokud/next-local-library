import { useEffect } from 'react'
import Head from 'next/head'
import { Button } from '@geist-ui/react'
import { withRouter } from 'next/router'
import { useForm } from "react-hook-form"

function UpdateAuthor({ router }) {
  let id = router.query.author
  const { register, handleSubmit, reset } = useForm({mode: "onChange"});

  useEffect(async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/authors/${id}`);
    if (!res.ok) {
      const message = `An error has occured: ${res.status}`;
      throw new Error(message);
    }
    const author = await res.json()
    // reset
    // we map the author genres to a new array that contain onlly the id of the genres
    // the we pass the new vreated array to reset
    // const authorGenres = author.genres.map((genre) => {
    //   let ID = genre.id.toString()
    //   return ID
    // })

    reset({
      first_name: author.first_name,
      family_name: author.family_name,
      date_of_birth: author.date_of_birth && author.date_of_birth.substr(0, 10),
      date_of_death: author.date_of_death && author.date_of_death.substr(0, 10)
    });
  }, [reset])

  // function called when we submit our data
  async function updateAuthor(data){
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/authors/${id}`,
        {
          body: JSON.stringify({
          first_name: data.first_name,
          family_name: data.family_name,
          date_of_birth: data.date_of_birth,
          date_of_death: data.date_of_death
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'PUT'
        }
    )
    // const result = await res.json()
    router.push(`/catalog/authors/${id}`)
  }
  return (
    <div>
      <Head>
        <title>Update Author</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="main-section">
        <h1>
         Update Author 
        </h1>
        <form id="author-form" onSubmit={handleSubmit(updateAuthor)}>
           <div>
              <label htmlFor="first_name">First name</label>
              <input type="text" name="first_name" id="first_name" {...register("first_name")}/>
           </div>
           <div>
            <label htmlFor="family_name">family name</label>
            <input type="text" name="family_name" id="family_name" {...register("family_name")}/>
           </div>
           <div>
            <label htmlFor="date_of_birth">Date of birth</label>
            <input type="date"  id="date_of_birth" {...register("date_of_birth")}/>
           </div>
           <div>
            <label htmlFor="date_of_death">Date of death</label>
            <input type="date" id="date_of_death" {...register("date_of_death")}/>
           </div>
           <Button type="success" htmlType="submit"> Submit </Button>
        </form>
      </section>
    </div>
  )
}


export default withRouter(UpdateAuthor)