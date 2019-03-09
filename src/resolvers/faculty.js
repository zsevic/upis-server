import { Op } from 'sequelize'

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
