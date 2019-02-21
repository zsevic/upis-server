import { GraphQLDateTime } from 'graphql-iso-date'

import userResolvers from './user'
import facultyResolvers from './faculty'
import departmentResolvers from './department'

const customScalarResolver = {
  Date: GraphQLDateTime
}

export default [
  customScalarResolver,
  userResolvers,
  facultyResolvers,
  departmentResolvers
]
