import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    faculties(cursor: String, limit: Int): FacultyConnection!
    faculty(id: ID!): Faculty!
  }

  extend type Mutation {
    incrementCounter(facultyId: ID!): Boolean!
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
    counter: Int!
    createdAt: Date!
    departments: [Department!]!
  }
`
