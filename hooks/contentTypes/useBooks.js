import useSWR from 'swr'
import Fetcher from '../../utils/Fetcher'

function useBooks() {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/books`, Fetcher)

  return {
    books: data,
    isLoading: !error && !data,
    isError: error
  }
}
export default useBooks