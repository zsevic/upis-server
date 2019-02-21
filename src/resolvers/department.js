export default {
  Query: {
    department: async (parent, { id }, { models }) => {
      return models.Department.findByPk(id);
    },
  },

  Department: {
    faculty: async (department, { id }, { models }) => {
      return models.Faculty.findOne({
        where: { id: department.facultyId },
      });
    },
  },
};
