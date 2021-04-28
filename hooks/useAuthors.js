import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function useAuthors (id) {
  let suffix = id ? `authors/${id}` : `authors`
   const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${suffix}`, fetcher)
 
   return {
     authors: data,
     isLoading: !error && !data,
     isError: error
   }
 }
 export default useAuthors