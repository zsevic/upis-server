import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    department(id: ID!): Department!
  }

  extend type Mutation {
    upPlace(id: ID!, attribute: String!): Department!
    downPlace(id: ID!, attribute: String!): Department!
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
