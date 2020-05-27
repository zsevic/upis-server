import Sequelize, { Op } from 'sequelize';

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
  })
  : new Sequelize(
    process.env.TEST_DB || process.env.DB,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      dialect: 'postgres',
      operatorsAliases: Op,
    },
  );

const models = {
  User: sequelize.import('./user'),
  Faculty: sequelize.import('./faculty'),
  Department: sequelize.import('./department'),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize, Op };

export default models;
