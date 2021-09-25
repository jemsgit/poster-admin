import apiService from '../services/apiAdapter';
import { setUserIsAuth } from '../services/localStorageAdapter';
import { store, setUserAuth } from '../services/storeAdapter';

async function authUser(login: string, password: string) {
  const result = await apiService.authUser(login, password);
  setUserAuth(result);
  setUserIsAuth();
}

function useAuthenticate() {
  async function authenticate(login: string, password: string): Promise<void> {
    await authUser(login, password);
  }

  return {
    isAuth: store.user.isAuth,
    authenticate,
  };
}

// eslint-disable-next-line import/prefer-default-export
export { useAuthenticate };
