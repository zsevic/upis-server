const faculty = (sequelize, DataTypes) => {
  const Faculty = sequelize.define('faculty', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'A faculty has to have a name.'
        }
      }
    },
    counter: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'A faculty has to have a counter.'
        }
      }
    }
  })

  Faculty.associate = models => {
    Faculty.belongsTo(models.User)
    Faculty.hasMany(models.Department, {
      as: 'departments'
    })
  }

  return Faculty
}

export default faculty
