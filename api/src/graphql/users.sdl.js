export const schema = gql`
  type User {
    id: Int!
    name: String
    email: String!
  }
  input CreateUserInput {
    name: String
    email: String!
  }
  input UpdateUserInput {
    name: String
    email: String!
  }
  type userTokenResponse {
    message: String!
  }
  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
    generateToken(email: String!): userTokenResponse! @skipAuth
  }`
