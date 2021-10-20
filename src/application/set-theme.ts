import {
  setAppTheme,
} from '../services/storeAdapter';
import {
  getAppTheme,
  setAppTheme as setAppThemeLocalStorage,
} from '../services/localStorageAdapter';

import { Theme } from '../domain/theme';

const defaultTheme = 'light';

async function loadTheme() {
  const theme = getAppTheme() || defaultTheme;
  setAppTheme(theme);
}

async function setTheme(theme: Theme) {
  setAppThemeLocalStorage(theme);
  setAppTheme(theme);
}

export { loadTheme, setTheme };
