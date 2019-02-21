const department = (sequelize, DataTypes) => {
  const Department = sequelize.define('department', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'A department has to have a name.'
        }
      }
    },

    total: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'A total has to be a valid integer.'
        }
      }
    },

    budget: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'A budget has to be a valid integer.'
        }
      }
    },

    selfFinancing: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'A selfFinancing has to be a valid integer.'
        }
      }
    }
  })

  Department.associate = models => {
    Department.belongsTo(models.Faculty)
  }

  return Department
}

export default department
