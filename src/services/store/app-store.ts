/* eslint-disable no-param-reassign */
import { types, Instance } from 'mobx-state-tree';

export interface IAppStore extends Instance<typeof AppStore> {}
export interface IApp extends Instance<typeof App> {}

export const App = types.model('App', {
  theme: types.string,
});

export const AppStore = types
  .model('AppStore', {
    theme: 'light',
  })
  .actions((self) => ({
    setTheme(theme: Theme) {
      self.theme = theme;
    },
  }));
