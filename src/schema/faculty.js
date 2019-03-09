import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    faculties(cursor: String, limit: Int): FacultyConnection!
    faculty(id: ID!): Faculty!
  }

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
`
