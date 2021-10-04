const localStorageAuthParam = 'jem-admin-is-auth';

export function checkUserIsAuth(): boolean {
  return Boolean(parseInt(localStorage.getItem(localStorageAuthParam), 10));
}

export function setUserIsAuth(flag = true): void {
  localStorage.setItem(localStorageAuthParam, flag ? '1' : '0');
}
