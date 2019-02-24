import pubsub, { EVENTS } from '../subscription'

export default {
  Query: {
    department: async (parent, { id }, { models }) => {
      return models.Department.findByPk(id)
    }
  },

  Mutation: {
    upPlace: async (parent, { id, attribute }, { models }) => {
      const updatedDepartment = await models.Department.increment(
        [attribute, 'total'],
        {
          where: { id }
        }
      )

      pubsub.publish(EVENTS.DEPARTMENT.UPDATED, {
        departmentUpdated: {
          department: updatedDepartment[0][0][0]
        }
      })

      return updatedDepartment[0][0][0]
    },

    downPlace: async (parent, { id, attribute }, { models }) => {
      const updatedDepartment = await models.Department.decrement(
        [attribute, 'total'],
        {
          where: { id }
        }
      )

      pubsub.publish(EVENTS.DEPARTMENT.UPDATED, {
        departmentUpdated: {
          department: updatedDepartment[0][0][0]
        }
      })

      return updatedDepartment[0][0][0]
    }
  },

  Subscription: {
    departmentUpdated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.DEPARTMENT.UPDATED)
    }
  },

  Department: {
    faculty: async (department, { id }, { models }) => {
      return models.Faculty.findOne({
        where: { id: department.facultyId }
      })
    }
  }
}
