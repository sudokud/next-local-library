import { Button, Divider, Loading, Modal, Note } from '@geist-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useBook from '@/hooks/contentTypes/useBook'
import qs from 'qs'

export const queryAll = qs.stringify({
	populate: '*'
}, {
	encodeValuesOnly: true,
})

const Book = () => {
	const router = useRouter()
	const [toggleModal, setToggleModal] = useState(false)
	// constructing the query, we want all relations to be populated
	const { book, isError, isLoading } = useBook({ id: router.query.id, query: queryAll })

	const closeHandler = (event) => {
		setToggleModal(false)
	}
	async function DeleteBook() {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/books/${router.query.id}`,
			{
				method: "DELETE",
				headers: {
					'Content-Type': 'application/json'
				},
				body: null
			})
		setToggleModal(false)
		router.push(`/catalog/books`)
	}
	return (
		<section className="main-section">
			{
				isError ? "an error occured !" : isLoading ? <Loading /> :
					<div>
						<div>
							<h2>Title:</h2><p>{book.data.attributes.title}</p>
						</div>
						<div>
							<h2>ISBN{book.data.attributes.ISBN.length > 10 ? ' 13' : ' 10'}:</h2><p>{book.data.attributes.ISBN}</p>
						</div>
						<div>
							<h2>Author:</h2>
							<p>
								{book.data.attributes.author.data.attributes.family_name}&nbsp;
								{book.data.attributes.author.data.attributes.first_name}
							</p>
						</div>
						<div>
							<h2>Summary:</h2><p>{book.data.attributes.summary}</p>
						</div>
						<div>
							<h2>Genre:</h2>
							<div>
								{
									book.data.attributes.genres.data.length > 0 ?
										book.data.attributes.genres.data.map(({ attributes }, id) => {
											return (
												<div key={id}>
													<p>{attributes.name}</p>
												</div>
											)
										})
										:
										'this book dont belong to any genre'
								}
							</div>
						</div>
						<div>
							<h2>Copies:</h2>
							<ul>
								{
									book.data.attributes.book_instances.data.length > 0 ?
										book.data.attributes.book_instances.data.map(({ attributes }, id) => {
											return (
												<li key={id}>
													<span> {attributes.imprint} </span>
													<span className={attributes.status}> [ {attributes.status}  ]</span>
												</li>
											)
										})
										:
										'there are no copies of this book in the library'
								}
							</ul>
						</div>
						<Divider />
						<Button
							style={{ marginRight: "1.5vw" }}
							auto
							onClick={() => setToggleModal(true)}
							type="error"
						>
							Delete book
						</Button>
						<Link href={`/catalog/books/update/${book.data.id}`}>
							<a>
								<Button auto type="default">Update book</Button>
							</a>
						</Link>
						<Modal visible={toggleModal} onClose={closeHandler}>
							{book.data.attributes.book_instances.data.length > 0 ?
								<>
									<Modal.Title>
										<Note type="warning">delete the following copies before deleting this book</Note>
									</Modal.Title>
									<Modal.Content>
										<ul>
											{book.data.attributes.book_instances.data.map((copie) => {
												return (
													<li key={copie.id}>{copie.attributes.imprint}, #{copie.id}</li>
												)
											})
											}
										</ul>
									</Modal.Content>
								</>
								: <>
									<Modal.Title>CONFIRM DELETE BOOK ?</Modal.Title>
									<Modal.Subtitle>This action is irreversible</Modal.Subtitle>
								</>
							}
							<Modal.Action passive onClick={() => setToggleModal(false)}>Cancel</Modal.Action>
							<Modal.Action disabled={book.data.attributes.book_instances.data.length > 0} onClick={DeleteBook}>Confirm</Modal.Action>
						</Modal>
					</div>
			}
		</section>
	)
}

export default Book

// work around this issue 
// https://coderedirect.com/questions/472190/is-there-a-way-to-keep-router-query-on-page-refresh-in-nextjs
export async function getServerSideProps(context) {
	return {
		props: {}, // will be passed to the page component as props
	};
}