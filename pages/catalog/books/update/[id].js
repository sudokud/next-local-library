import { useEffect } from 'react'
import Head from 'next/head'
import { Button, Loading, Spacer } from '@geist-ui/react'
import { withRouter } from 'next/router'
import useGenres from '@/hooks/useGenres'
import useAuthors from '@/hooks/useAuthors'
import useBook from '@/hooks/useBook'
import { useForm } from "react-hook-form"

function UpdateBook({ router, initialBook }) {
  const { id } = router.query
  // fetching book and genres to populate Author field and display all the genres.
  const {genres, isLoading: genresIsLoading, isError: genresIsError} = useGenres()
  const {authors, isLoading: authorsIsLoading, isError: AuthorsIsError} = useAuthors()
  const { book, isError, isLoading } = useBook(router.query.id ? router.query.id : null, initialBook)

  // register form fields 
  const { register, handleSubmit, reset } = useForm({mode: "onChange"});

  useEffect(() => {
    const bookGenres = book.genres.map((genre) => {
      let ID = genre.id.toString()
      return ID
    })
    reset({
      title: book.title,
      author: book.author.id,
      summary: book.summary,
      ISBN: book.ISBN,
      genre: bookGenres
    });
  }, [reset])

  // API Call Update Book
  async function updateBook(data){
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/books/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
          title: data.title,
          author: data.author,
          summary: data.summary,
          genres: data.genre,
          ISBN: data.ISBN,
          })
        }
    )
    router.push(`/catalog/books/details/${id}`)
  }
  return (
    <div>
      <Head>
        <title>Update Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="main-section">
        <h1>
         Update Book
        </h1>
        {
          genresIsError || AuthorsIsError ? "an error occured" : genresIsLoading || authorsIsLoading ? <Loading /> :  
        <form id="Book-update-form" onSubmit={handleSubmit(updateBook)}>
           <div>
            <label htmlFor="title">Title</label>
            <input type="text"  id="title" {...register("title")}/>
           </div>
           <Spacer y={1}/>
           <div>
            <label htmlFor="author">Author</label>
            <select type="text"  id="author" {...register("author")}>
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
            <label htmlFor="summary" >Summary</label>
            <textarea id="summary" {...register("summary")}/>
           </div>
           <Spacer y={1}/>
           <div>
            <label htmlFor="ISBN">ISBN</label>
            <input type="text" id="ISBN" {...register("ISBN")}/>
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
           <Spacer y={2}/>
           <Button auto htmlType="submit" type="success" ghost>Submit</Button>
        </form>
        }
      </section>
    </div>
  )
}

export default withRouter(UpdateBook)



export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/books`)
  const books = await res.json()
  const paths = books.map((book) => ({
    params: { id: book.id.toString() },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/books/${params.id}`)
  const initialBook = await res.json()
  return {
    props: {
      initialBook,
    },
  }
}

