import useSWR from 'swr'
import Fetcher from '../../utils/Fetcher'

function useAuthors({ initialData }) {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/authors`,
    Fetcher,
    { initialData: initialData })

  return {
    authors: data,
    isLoading: !error && !data,
    isError: error
  }
}
export default useAuthors