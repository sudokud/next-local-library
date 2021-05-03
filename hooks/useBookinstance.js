import useSWR from 'swr'
import Fetcher from '../utils/Fetcher'

function useBookinstance ({id, initialData}) {
   const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookinstances/${id}`, Fetcher, {initialData: initialData})

   return {
     bookinstance: data,
     isLoading: !error && !data,
     isError: error
   }
 }
 export default useBookinstance