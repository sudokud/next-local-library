import useSWR from 'swr'
import Fetcher from '../utils/Fetcher'

function useBook (id, initialBook) {
   const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/books/${id}`, Fetcher, { initialData: initialBook })

   return {
     book: data,
     isLoading: !error && !data,
     isError: error
   }
 }
 export default useBook