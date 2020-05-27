import { Op } from '../models';

export const batchDepartments = async (keys, models) => {
  const departments = await models.Department.findAll({
    where: {
      id: {
        [Op.in]: keys,
      },
    },
  });

  return keys.map((key) => departments.find((department) => department.id === key));
};
