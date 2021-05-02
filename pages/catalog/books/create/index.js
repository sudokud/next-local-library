import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button, Loading, Spacer } from '@geist-ui/react'
import useAuthors from '@/hooks/useAuthors'
import useGenres from '@/hooks/useGenres'
import { useForm } from "react-hook-form"

export default function CreateBook() {
   const router = useRouter()
   const { authors, isError: isAuthorError, isLoading: authorsIsLoading } = useAuthors({initialData: null})
   const { genres, isError: isGenreError, isLoading: genresIsLoading } = useGenres()
   const { register, handleSubmit, reset } = useForm({mode: "onChange"});

   async function createBook(data){
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_API_ENDPOINT}/books`,
         {
           body: JSON.stringify({
            title: data.title,
            author: data.author.id,
            summary: data.summary,
            genres: data.genre,
            ISBN: data.ISBN,
           }),
           headers: {
             'Content-Type': 'application/json'
           },
           method: 'POST'
         }
      )
      // const result = await res.json()
      router.push(`/catalog/books/details/${router.query.id}`)
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
         isAuthorError || isGenreError ? "An error has occurred."
         : authorsIsLoading || genresIsLoading ? <Loading />
         :
        <form id="Book-form" onSubmit={handleSubmit(createBook)}>
           <div>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" {...register('title')}/>
           </div>
           <Spacer y={1}/>
           <div>
            <label htmlFor="author">Author</label>
            <select type="text" name="author" id="author" {...register('author')}>
            {authors.map((author) => {
               return(
                  <option key={author.id} value={author.id}>
                     {author.first_name + " " + author.family_name}
                  </option>
               )
            })}
            </select>
           </div>
           <Spacer y={1}/>
           <div>
            <label htmlFor="summary">Summary</label>
            <textarea name="summary" id="summary" {...register('summary')}/>
           </div>
           <Spacer y={1}/>
           <div>
             {genres.length > 0 ?
               genres.map((genre) => {
                 return(
                   <div key={genre.id}>
                      <input
                        type="checkbox"
                        value={genre.id}
                        id={genre.id}
                        {...register("genre")}
                      />
                    <label htmlFor={genre.id}>{genre.name}</label>
                  </div>
                 )
               })
              : null
             }
           </div>
           <Spacer y={1}/>
           <div>
            <label htmlFor="ISBN">ISBN</label>
            <input type="text" name="ISBN" id="ISBN" {...register('ISBN')}/>
           </div>
           <Spacer y={2}/>
           <Button htmlType="submit" type="success" ghost>Submit</Button>
        </form>
      }
      </section>
    </div>
  )
}
