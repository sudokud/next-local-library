import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function useGenres () {
   const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/genres`, fetcher)
 
   return {
     genres: data,
     isLoading: !error && !data,
     isError: error
   }
 }
 export default useGenres