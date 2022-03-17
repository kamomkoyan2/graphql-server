'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, 
  {
    sequelize,
    modelName: 'User',
    defaultScope: {
      rawAttributes:{exclude: ['password']}
    }
  });
  User.beforeCreate(async (user) => {
    user.password = await user.generatePasswordHash();
  });
  User.prototype.generatePasswordHash = function () {
    if (this.password) {
      return bcrypt.hash(this.password, 10);
    }
  };
  
  return User;
};