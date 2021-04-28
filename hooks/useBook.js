import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function useBook (id) {
   const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/books/${id}`, fetcher)
 
   return {
     book: data,
     isLoading: !error && !data,
     isError: error
   }
 }
 export default useBook