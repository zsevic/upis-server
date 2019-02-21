import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    department(id: ID!): Department!
  }

  type Department {
    id: ID!
    name: String!
    total: Int!
    budget: Int!
    selfFinancing: Int!
    faculty: Faculty!
  }
`
