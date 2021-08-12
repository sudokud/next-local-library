export default async function handler(req, res) {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/books`)
    const books = await data.json()
    res.status(200).json(books)
}