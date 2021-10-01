const Users = require('../db/models/users');
const { comparePasswords } = require('./password');

async function findUserWithPassword(username, password) {
  const user = await Users.findOne({
    where: {
      username,
    },
  });
  console.log(user);
  if (user && comparePasswords(user.password, password)) {
    return user;
  } return undefined;
}

async function addUser(username, password) {
  const user = await Users.create({
    username,
    password,
  });
  return user;
}

module.exports = {
  findUserWithPassword,
  addUser,
};
