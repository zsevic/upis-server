import { Op } from 'sequelize'
import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated, isFacultyOwner } from './authorization'

const toCursorHash = string => Buffer.from(string).toString('base64')

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii')

export default {
  Query: {
    faculties: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
          where: {
            createdAt: {
              [Op.lt]: fromCursorHash(cursor)
            }
          }
        }
        : {}

      const faculties = await models.Faculty.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        ...cursorOptions
      })

      const hasNextPage = faculties.length > limit
      const edges = hasNextPage ? faculties.slice(0, -1) : faculties

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(edges[edges.length - 1].createdAt.toString())
        }
      }
    },

    faculty: async (parent, { id }, { models }) => {
      return models.Faculty.findByPk(id)
    }
  },

  Mutation: {
    incrementCounter: combineResolvers(
      isAuthenticated,
      isFacultyOwner,
      async (parent, { facultyId }, { models, me }) => {
        const updatedFaculty = await models.Faculty.increment(['counter'], {
          where: { id: facultyId }
        })

        return !!updatedFaculty
      }
    )
  },

  Faculty: {
    departments: async (faculty, args, { models }) => {
      return models.Department.findAll({
        where: {
          facultyId: faculty.id
        }
      })
    }
  }
}
