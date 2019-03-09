import { ForbiddenError, UserInputError } from 'apollo-server'
import { combineResolvers, skip } from 'graphql-resolvers'

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.')

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === 'ADMIN' ? skip : new ForbiddenError('Not authorized as admin.')
)

export const isFacultyOwner = async (parent, { facultyId }, { models, me }) => {
  const faculty = await models.Faculty.findByPk(facultyId, {
    raw: true
  })

  if (!faculty) {
    throw new UserInputError('Faculty is not found')
  }

  if (faculty.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.')
  }

  return skip
}
