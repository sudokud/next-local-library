// visit https://swr.vercel.app/docs/with-nextjs to know more about SWR and the Fetcher function
export default async function Fetcher(...args) {
  const res = await fetch(...args);
  return res.json();
}