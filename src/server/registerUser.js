require('./db/models/index');

const { hashPassword } = require('./services/password');
const { addUser, findUserWithPassword } = require('./services/users');

const login = process.argv[2];
const password = process.argv[3];

async function register() {
  const hashed = await hashPassword(password);
  await addUser(login, hashed);
}

async function checkUserRegistered() {
  const hashed = await hashPassword(password);
  const user = await findUserWithPassword(login, hashed);
  console.log(Boolean(user));
}

register().then(async () => {
  checkUserRegistered();
});
