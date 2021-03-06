/* eslint-disable no-param-reassign */
import { types, Instance } from 'mobx-state-tree';

export const UserStore = types
  .model('UserStore', {
    name: types.optional(types.string, ''),
    isAuth: false,
  })
  .actions((self) => ({
    setUserAuth(isAuth: boolean) {
      self.isAuth = isAuth;
    },
    setUserInfo(name: string) {
      self.name = name;
    },
  }));

export interface IUserStore extends Instance<typeof UserStore> {}
