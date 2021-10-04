import apiService from '../services/apiAdapter';
import { setUserIsAuth } from '../services/localStorageAdapter';
import { store, setUserAuth, setUserInfo } from '../services/storeAdapter';

async function authUser(login: string, password: string) {
  const result = await apiService.authUser(login, password);
  setUserAuth(result);
  setUserInfo(login);
  setUserIsAuth();
}

async function logoutUser() {
  const result = await apiService.logoutUser();
  if (!result) {
    return;
  }
  setUserAuth(false);
  setUserInfo('');
  setUserIsAuth(false);
  // eslint-disable-next-line no-restricted-globals
  document.location = '/login';
}

function useLogout() {
  async function logout(): Promise<void> {
    await logoutUser();
  }

  return {
    isAuth: store.user.isAuth,
    logout,
  };
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
export { useAuthenticate, useLogout };
