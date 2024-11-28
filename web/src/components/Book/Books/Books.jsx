import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Book/BooksCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_BOOK_MUTATION = gql`
  mutation DeleteBookMutation($id: Int!) {
    deleteBook(id: $id) {
      id
    }
  }
`

const BooksList = ({ books }) => {
  const [deleteBook] = useMutation(DELETE_BOOK_MUTATION, {
    onCompleted: () => {
      toast.success('Book deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete book ' + id + '?')) {
      deleteBook({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Isbn</th>
            <th>Book notes</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{truncate(book.id)}</td>
              <td>{truncate(book.title)}</td>
              <td>{truncate(book.isbn)}</td>
              <td>{truncate(book.bookNotes)}</td>
              <td>{timeTag(book.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.book({ id: book.id })}
                    title={'Show book ' + book.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editBook({ id: book.id })}
                    title={'Edit book ' + book.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete book ' + book.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(book.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BooksList
