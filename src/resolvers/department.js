export default {
  Query: {
    department: async (parent, { id }, { models }) => {
      return models.Department.findByPk(id)
    }
  },

  Department: {
    faculty: async (parent, { id }, { models }) => {
      return models.Faculty.findByPk(id)
    }
  }
}
