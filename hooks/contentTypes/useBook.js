import useSWR from 'swr'
import Fetcher from '../../utils/Fetcher'

function useBook(params) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/books/${params.id}?${params.query}`
  const { data, error } = useSWR(endpoint, Fetcher, { initialData: params.initialBook })
  return {
    book: data,
    isLoading: !error && !data,
    isError: error
  }
}
export default useBook