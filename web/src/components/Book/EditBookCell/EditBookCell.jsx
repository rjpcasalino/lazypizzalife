import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BookForm from 'src/components/Book/BookForm'

export const QUERY = gql`
  query EditBookById($id: Int!) {
    book: book(id: $id) {
      id
      title
      isbn
      bookNotes
      createdAt
    }
  }
`

const UPDATE_BOOK_MUTATION = gql`
  mutation UpdateBookMutation($id: Int!, $input: UpdateBookInput!) {
    updateBook(id: $id, input: $input) {
      id
      title
      isbn
      bookNotes
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ book }) => {
  const [updateBook, { loading, error }] = useMutation(UPDATE_BOOK_MUTATION, {
    onCompleted: () => {
      toast.success('Book updated')
      navigate(routes.books())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateBook({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Book {book?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <BookForm book={book} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
