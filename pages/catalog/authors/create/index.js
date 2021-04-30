
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button, Spacer } from '@geist-ui/react'
export default function CreateAuthors() {
   const router = useRouter()
   async function createAuthor(event){
    event.preventDefault()
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/authors`,
        {
          body: JSON.stringify({
          first_name: event.target.first_name.value,
          family_name: event.target.family_name.value,
          date_of_birth: event.target.date_of_birth.value,
          date_of_death: event.target.date_of_death.value
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }
    )
    // const result = await res.json()
    event.target.reset()
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
        <form id="author-form" onSubmit={createAuthor}>
           <div>
            <label htmlFor="first_name">First name</label>
            <input type="text" name="first_name" id="first_name" required/>
           </div>
           <Spacer y={1}/>
           <div>
            <label htmlFor="family_name">family name</label>
            <input type="text" name="family_name" id="family_name" required/>
           </div>
           <Spacer y={1}/>
           <div>
            <label htmlFor="date_of_birth">Date of birth</label>
            <input type="date" name="date_of_birth" id="date_of_birth" />
           </div>
           <Spacer y={1}/>
           <div>
            <label htmlFor="date_of_death">Date of death</label>
            <input type="date" name="date_of_death" id="date_of_death" />
           </div>
           <Spacer y={2}/>
           <Button type="success" htmlType="submit"> Submit </Button>
        </form>
      </section>
    </div>
  )
}