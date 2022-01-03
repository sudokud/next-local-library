import { Card, Grid, Divider, Loading } from '@geist-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import useAuthors from '@/hooks/contentTypes/useAuthors'

export default function Authors({ data }) {
	const { authors, isLoading, isError } = useAuthors({ initialData: data })

	return (
		<div>
			<Head>
				<title>Authors</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<section className="main-section">
				<h1>
					Authors
				</h1>
				<Grid.Container gap={2}>{
					isError ? <div>an error occured</div> : isLoading ? <Loading /> :
						authors.map((author) => {
							return (
								<Grid key={author.id}>
									<Card>
										<Link href={`/catalog/authors/details/${author.id}`}>
											<a>
												<h3>{author.family_name} {author.first_name}</h3>
											</a>
										</Link>
										<Divider y={0} />
										<h4>Books</h4>
										<ul>
											{author.books.map(({ title, id }) => {
												return (
													<li key={id}>
														<Link href={`/catalog/books/details/${id}`}>
															<a>{title}</a>
														</Link>
													</li>
												)
											})}
										</ul>
									</Card>
								</Grid>
							)
						})
				}</Grid.Container>
			</section>
		</div>
	)
}

export async function getStaticProps(context) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/authors`)
	const data = await res.json()
	return {
		props: {
			data,
		},
		revalidate: 1
	}
}