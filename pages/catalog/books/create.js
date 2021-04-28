import Head from 'next/head'
import {useRouter} from 'next/router'
import useSWR from 'swr'
import {Button} from '@geist-ui/react'


export default function CreateBook() {
   const router = useRouter()
   const fetcher = (...args) => fetch(...args).then(res => res.json())
   const { data: authors, error: author_error } = useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/authors`, fetcher)
   const { data: initialGenres, error: genre_error } = useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/genres/`, fetcher)
   let checkedGenres = []
   let handleCheckbox = (event) => {
      if(event.target.checked){
         checkedGenres.push({id: event.target.id, value: event.target.value})
      }else{
         checkedGenres.pop({id: event.target.id, value: event.target.value})
      }
   }
   async function createBook(event){
      event.preventDefault()
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_API_ENDPOINT}/books`,
         {
           body: JSON.stringify({
            title: event.target.title.value,
            author: event.target.author.value,
            summary: event.target.summary.value,
            genres: checkedGenres,
            ISBN: event.target.ISBN.value,
           }),
           headers: {
             'Content-Type': 'application/json'
           },
           method: 'POST'
         }
      )
      const result = await res.json()
      event.target.reset()
      router.push(`/catalog/books/${result.id}`)
   
   }
  return (
    <div>
      <Head>
        <title>Create new Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="main-section">
        <h1>
         New Book
        </h1>
        {
         author_error || genre_error ? "An error has occurred."
         : !authors || !initialGenres ? "Loading..."
         :
        <form id="Book-form" onSubmit={createBook}>
           <div>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" required/>
           </div>
           <div>
            <label htmlFor="author">Author</label>
            <select type="text" name="author" id="author" required>
            {authors.map((author) => {
               return(
                  <option key={author.id} value={author.id}>
                     {author.first_name + " " + author.family_name}
                  </option>
               )
            })}
            </select>
           </div>
           <div>
            <label htmlFor="summary">Summary</label>
            <textarea name="summary" id="summary" required/>
           </div>
           <div>
           {initialGenres.map((genre) => {
               return(
                  <div key={genre.id}>
                     <input type='checkbox' name="genre" value={genre.name} id={genre.id} onChange={handleCheckbox}/>
                     <label htmlFor={genre.id}>{genre.name}</label>
                  </div>
               )
            })}
           </div>
           <div>
            <label htmlFor="ISBN">ISBN</label>
            <input type="text" name="ISBN" id="ISBN" required/>
           </div>
           <Button htmlType="submit" type="success" ghost>Submit</Button>
        </form>
      }
      </section>
    </div>
  )
}
