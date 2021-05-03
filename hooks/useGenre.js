import useSWR from 'swr'
import Fetcher from '../utils/Fetcher'

function useGenre (id) {
   const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/genres/${id}`, Fetcher)
   return {
     genre: data,
     isLoading: !error && !data,
     isError: error
   }
}

export default useGenre