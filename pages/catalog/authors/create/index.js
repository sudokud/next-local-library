
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button, Spacer } from '@geist-ui/react'
import { useForm } from 'react-hook-form'

export default function CreateAuthors() {

  const router = useRouter()
  const { register, handleSubmit, reset } = useForm({mode: "onChange"});

  async function createAuthor(data){
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/authors`,
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
        method: 'POST'
      }
    )
    console.log("create author", res.status)
    router.push('/catalog/authors')
   }
  return (
    <div>
      <Head>
        <title>Create new author</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="main-section">
        <h1>
         New author
        </h1>
        <form id="author-form" onSubmit={handleSubmit(createAuthor)}>
           <div>
            <label htmlFor="first_name">First name</label>
            <input type="text" name="first_name" id="first_name" {...register("first_name")}/>
           </div>
           <Spacer y={1}/>
           <div>
            <label htmlFor="family_name">family name</label>
            <input type="text" name="family_name" id="family_name" {...register("first_name")}/>
           </div>
           <Spacer y={1}/>
           <div>
            <label htmlFor="date_of_birth">Date of birth</label>
            <input type="date" name="date_of_birth" id="date_of_birth" {...register("date_of_birth")}/>
           </div>
           <Spacer y={1}/>
           <div>
            <label htmlFor="date_of_death">Date of death</label>
            <input type="date" name="date_of_death" id="date_of_death" {...register("date_of_death")}/>
           </div>
           <Spacer y={2}/>
           <Button type="success" htmlType="submit" ghost> Submit </Button>
        </form>
      </section>
    </div>
  )
}