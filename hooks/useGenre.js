import useSWR from 'swr'
import Fetcher from '../utils/Fetcher'

function useGenre (id, initialData) {
   const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/genres/${id}`, Fetcher, {initialData: initialData})
   return {
     genre: data,
     isLoading: !error && !data,
     isError: error
   }
}

export default useGenre