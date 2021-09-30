const localStorageAuthParam = 'jem-admin-is-auth';

export function checkUserIsAuth(): boolean {
  return Boolean(localStorage.getItem(localStorageAuthParam));
}

export function setUserIsAuth(flag = true): void {
  localStorage.setItem(localStorageAuthParam, flag ? '1' : '0');
}
