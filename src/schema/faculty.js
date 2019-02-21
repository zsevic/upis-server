import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    faculties(cursor: String, limit: Int): FacultyConnection!
    faculty(id: ID!): Faculty!
  }

  #  extend type Mutation {
  #    createMessage(text: String!): Message!
  #    deleteMessage(id: ID!): Boolean!
  #  }

  #  extend type Subscription {
  #    messageCreated: MessageCreated!
  #  }

  type FacultyConnection {
    edges: [Faculty!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type Faculty {
    id: ID!
    name: String!
    createdAt: Date!
    departments: [Department!]!
  }

  #  type MessageCreated {
  #    message: Message!
  #  }
`
