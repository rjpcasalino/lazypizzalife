export const schema = gql`
  type Book {
    id: Int!
    title: String!
    author: String!
    isbn: String!
    bookNotes: String
    createdAt: DateTime!
  }

  type Query {
    books: [Book!]! @requireAuth
    book(id: Int!): Book @requireAuth
  }

  input CreateBookInput {
    title: String!
    author: String!
    isbn: String!
    bookNotes: String
  }

  input UpdateBookInput {
    title: String
    author: String!
    isbn: String!
    bookNotes: String
  }

  type Mutation {
    createBook(input: CreateBookInput!): Book! @requireAuth
    updateBook(id: Int!, input: UpdateBookInput!): Book! @requireAuth
    deleteBook(id: Int!): Book! @requireAuth
  }
`
