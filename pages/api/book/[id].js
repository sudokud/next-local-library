export default async function handler(req, res) {
   const {
      query,
      method,
    } = req
   const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/books/${query.id}`)
   const book = await data.json()
   res.status(200).json(book)
 }