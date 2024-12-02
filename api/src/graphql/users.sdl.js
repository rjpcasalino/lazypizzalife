export const schema = gql`
  type User {
    id: Int!
    audits: [Audit]!
    name: String
    email: String!
    loginToken: String!
    loginTokenExpiresAt: DateTime
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    name: String
    email: String!
    loginToken: String!
    loginTokenExpiresAt: DateTime
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: String
  }

  input UpdateUserInput {
    name: String
    email: String
    loginToken: String
    loginTokenExpiresAt: DateTime
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: String
  }

  type userTokenResponse {
    message: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
    generateToken(email: String!): userTokenResponse! @skipAuth
    emailUser(id: Int!): User! @requireAuth
    emailTokenToUser(id: Int!): User! @skipAuth
  }
`
