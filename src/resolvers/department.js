import { combineResolvers } from 'graphql-resolvers';
import pubsub, { EVENTS } from '../subscription';
import { isAuthenticated, isFacultyOwner } from './authorization';

export default {
  Query: {
    department: async (parent, { id }, { models }) => models.Department.findByPk(id),
  },

  Mutation: {
    /*     upPlace: combineResolvers(
      isAuthenticated,
      isFacultyOwner,
      async (parent, { id, attribute, facultyId }, { models }) => {
        const updatedDepartment = await models.Department.increment(
          [attribute, "total"],
          {
            where: { id }
          }
        );

        return updatedDepartment[0][0][0];
      }
    ), */

    downPlace: combineResolvers(
      isAuthenticated,
      isFacultyOwner,
      async (parent, { id, attribute, facultyId }, { models }) => {
        const updatedDepartment = await models.Department.decrement(
          [attribute, 'total'],
          {
            where: { id },
          },
        );

        const updatedFaculty = await models.Faculty.increment(['counter'], {
          where: { id: facultyId },
        });

        console.log(updatedFaculty);

        pubsub.publish(EVENTS.FACULTY.UPDATED, {
          facultyUpdated: {
            faculty: updatedFaculty[0][0][0],
          },
        });

        return updatedDepartment[0][0][0];
      },
    ),
  },

  Department: {
    faculty: async (department, _, { models }) => models.Faculty.findOne({
      where: { id: department.facultyId },
    }),
  },
};
