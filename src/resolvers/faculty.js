import { Op } from 'sequelize'
// import { combineResolvers } from 'graphql-resolvers';

// import { isAuthenticated, isFacultyOwner } from './authorization';
// import pubsub, { EVENTS } from '../subscription';

const toCursorHash = string => Buffer.from(string).toString('base64')

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii')

export default {
  Query: {
    faculties: async (
      parent,
      { cursor, limit = 100 },
      { models }
    ) => {
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
          endCursor: toCursorHash(
            edges[edges.length - 1].createdAt.toString()
          )
        }
      }
    },

    faculty: async (parent, { id }, { models }) => {
      return models.Faculty.findByPk(id)
    }
  },

  Mutation: {
    /*    createMessage: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { me, models }) => {
        const message = await models.Message.create({
          text,
          userId: me.id,
        });

        pubsub.publish(EVENTS.MESSAGE.CREATED, {
          messageCreated: { message },
        });

        return message;
      },
    ),
*/
    /*    deleteMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (parent, { id }, { models }) => {
        return models.Message.destroy({ where: { id } });
      },
    ),
    */
  },

  /* Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.CREATED),
    },
  }, */

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
