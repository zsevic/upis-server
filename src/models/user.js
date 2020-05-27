import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [7, 42],
      },
    },
    role: {
      type: DataTypes.STRING,
    },
  });

  User.associate = (models) => {
    User.hasOne(models.Faculty, { onDelete: 'CASCADE' });
  };

  User.beforeCreate(async (newUser) => {
    newUser.password = await newUser.generatePasswordHash();
  });

  User.prototype.generatePasswordHash = async function generatePasswordHash() {
    const saltRounds = 10;
    return bcrypt.hash(this.password, saltRounds);
  };

  User.prototype.validatePassword = async function validatePassword(password) {
    return bcrypt.compare(password, this.password);
  };

  User.findByLogin = async (login) => User.findOne({
    where: { [Op.or]: [{ email: login }, { username: login }] },
  });

  return User;
};

export default user;
