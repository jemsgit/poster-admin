const authParam = 'jem-admin-is-auth';
const themeParam = 'jem-admin-theme';

export function checkUserIsAuth(): boolean {
  return Boolean(parseInt(localStorage.getItem(authParam), 10));
}

export function setUserIsAuth(flag = true): void {
  localStorage.setItem(authParam, flag ? '1' : '0');
}

export function getAppTheme(): Theme {
  return localStorage.getItem(themeParam) as Theme;
}

export function setAppTheme(theme: Theme) {
  return localStorage.setItem(themeParam, theme);
}
