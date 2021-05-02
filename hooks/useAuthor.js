import useSWR from 'swr'
import Fetcher from '../utils/Fetcher'

function useAuthor (id, initialAuthor) {
   const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/authors/${id}`, Fetcher, { initialData: initialAuthor })

   return {
     author: data,
     isLoading: !error && !data,
     isError: error
   }
 }
 export default useAuthor