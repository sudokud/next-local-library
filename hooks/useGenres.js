import useSWR from 'swr'
import Fetcher from '../utils/Fetcher'

function useGenres () {
   const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/genres`, Fetcher)
 
   return {
     genres: data,
     isLoading: !error && !data,
     isError: error
   }
 }
 export default useGenres