import { Link, routes } from '@redwoodjs/router'

import Books from 'src/components/Book/Books'

export const QUERY = gql`
  query FindBooks {
    books {
      id
      title
      isbn
      bookNotes
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No books yet.{' '}
      <Link to={routes.newBook()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ books }) => {
  return <Books books={books} />
}
