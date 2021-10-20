import { types, Instance } from 'mobx-state-tree';
import { ChannelStore } from './channel-store';
import { ChannelDetailsStore } from './channel-files-store';
import { UserStore } from './user-store';
import { AppStore } from './app-store';
import { getAppTheme } from '../localStorageAdapter';

export const RootStore = types
  .model('RootStore', {
    channelStore: types.optional(ChannelStore, {
      isLoading: false,
      channels: [],
    }),
    channelDetailsStore: types.optional(ChannelDetailsStore, {
      isLoading: false,
      isSaving: false,
      channelId: undefined,
      files: [],
      times: [],
    }),
    user: types.optional(UserStore, {
      isAuth: false,
      name: '',
    }),
    app: types.optional(AppStore, {
      theme: getAppTheme() || 'light',
    }),
  });

export interface IRootStore extends Instance<typeof RootStore> {}
