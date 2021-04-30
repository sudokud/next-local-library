import { useEffect } from 'react'
import Head from 'next/head'
import { Button, Spacer } from '@geist-ui/react'
import { withRouter } from 'next/router'
import { useForm } from "react-hook-form"

function UpdateAuthor({ router, author }) {
  let { id } = router.query
  const { register, handleSubmit, reset } = useForm({mode: "onChange"});

  useEffect(async () => {
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
           <Spacer y={1}/>
           <div>
            <label htmlFor="family_name">family name</label>
            <input type="text" name="family_name" id="family_name" {...register("family_name")}/>
           </div>
           <Spacer y={1}/>
           <div>
            <label htmlFor="date_of_birth">Date of birth</label>
            <input type="date"  id="date_of_birth" {...register("date_of_birth")}/>
           </div>
           <Spacer y={1}/>
           <div>
            <label htmlFor="date_of_death">Date of death</label>
            <input type="date" id="date_of_death" {...register("date_of_death")}/>
           </div>
           <Spacer y={2}/>
           <Button type="success" htmlType="submit"> Submit </Button>
        </form>
      </section>
    </div>
  )
}


export default withRouter(UpdateAuthor)




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
  }
}