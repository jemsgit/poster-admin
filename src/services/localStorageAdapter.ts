const localStorageAuthParam = 'jem-admin-is-auth';

export function checkUserIsAuth(): boolean {
  return Boolean(localStorage.getItem(localStorageAuthParam));
}

export function setUserIsAuth(): void {
  localStorage.setItem(localStorageAuthParam, '1');
}
