const Sequelize = require('sequelize');
const sequelize = require('../db');

const Users = sequelize.define('users', {
  username: {
    type: Sequelize.STRING,
    primaryKey: true,
    uniq: true,
  },
  password: {
    type: Sequelize.STRING,
  },
});

module.exports = Users;
