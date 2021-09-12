import apiService from '../services/apiAdapter';

async function authUser(login: string, password: string) {
  const result = await apiService.authUser(login, password);
  console.log(result);
}

export { authUser };