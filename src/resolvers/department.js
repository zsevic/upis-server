export default {
  Query: {
    department: async (parent, { id }, { models }) => {
      return models.Department.findByPk(id)
    }
  },

  Mutation: {
    upPlace: async (parent, { id, attribute }, { models }) => {
      const updatedDepartment = await models.Department.increment(attribute, {
        where: { id }
      })
      return updatedDepartment[0][0][0]
    },
    downPlace: async (parent, { id, attribute }, { models }) => {
      const updatedDepartment = await models.Department.decrement(attribute, {
        where: { id }
      })
      return updatedDepartment[0][0][0]
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
