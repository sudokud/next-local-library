/*
* going to fix some strapi issue related to creating a new Entry
* issue related to pg
*/



import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button, Loading, Spacer } from '@geist-ui/react'
import useAuthors from '@/hooks/contentTypes/useAuthors'
import useGenres from '@/hooks/contentTypes/useGenres'
import { useForm } from "react-hook-form"

export default function CreateBook() {
  const router = useRouter()
  const { authors, isError: isAuthorError, isLoading: authorsIsLoading } = useAuthors({ initialData: null })
  const { genres, isError: isGenreError, isLoading: genresIsLoading } = useGenres()
  const { register, handleSubmit } = useForm({ mode: "onChange" });
  const [ISBNError, setISBNError] = useState("")
  async function createBook(data) {
    console.log(data)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/books`,
      {
        body: JSON.stringify({
          "data": {
            "title": data.title,
            "author": data.author,
            "summary": data.summary,
            "genres": data.genre,
            "ISBN": data.ISBN
          }
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )
    const result = await res.json()
    console.log(result)
    if (result.error) {
      setISBNError(result.error.message)
    }
    if (result.data && !result.error) {
      router.push(`/catalog/books/details/${result.id}`)
    }
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
                  <input type="text" name="title" id="title" {...register('title')} />
                </div>
                <Spacer y={1} />
                <div>
                  <label htmlFor="author">Author</label>
                  <select type="text" name="author" id="author" {...register('author')}>
                    {authors.data.map(({ attributes }, id) => {
                      return (
                        <option key={id} value={id}>
                          {attributes.first_name + " " + attributes.family_name}
                        </option>
                      )
                    })}
                  </select>
                </div>
                <Spacer y={1} />
                <div>
                  <label htmlFor="summary">Summary</label>
                  <textarea name="summary" id="summary" {...register('summary')} />
                </div>
                <Spacer y={1} />
                <div>
                  {genres.data.length > 0 ?
                    genres.data.map(({ attributes }, id) => {
                      return (
                        <div key={id}>
                          <input
                            type="checkbox"
                            value={id}
                            id={id}
                            {...register("genre")}
                          />
                          <label htmlFor={id}>{attributes.name}</label>
                        </div>
                      )
                    })
                    : null
                  }
                </div>
                <Spacer y={1} />
                <div>
                  <label htmlFor="ISBN">ISBN</label>
                  <input type="text" name="ISBN" id="ISBN" {...register('ISBN')} />
                  {ISBNError &&
                    <div style={{
                      fontSize: "12px",
                      padding: "8px",
                      color: "crimson"
                    }}>
                      {ISBNError}
                    </div>}
                </div>
                <Spacer y={2} />
                <Button htmlType="submit" type="success" ghost>Submit</Button>
              </form>
        }
      </section>
    </div>
  )
}
