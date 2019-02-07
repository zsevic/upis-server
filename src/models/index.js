import Sequelize, { Op } from 'sequelize'

const sequelize = new Sequelize(
  process.env.TEST_DB || process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    operatorsAliases: Op
  }
)

const models = {
  User: sequelize.import('./user'),
  Message: sequelize.import('./message')
}

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

export { sequelize, Op }

export default models
