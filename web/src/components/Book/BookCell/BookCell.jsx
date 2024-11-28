import Book from 'src/components/Book/Book'

export const QUERY = gql`
  query FindBookById($id: Int!) {
    book: book(id: $id) {
      id
      title
      isbn
      bookNotes
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Book not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ book }) => {
  return <Book book={book} />
}
