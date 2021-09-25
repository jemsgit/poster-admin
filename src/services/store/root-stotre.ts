import { types, Instance } from 'mobx-state-tree';
import { ChannelStore } from './channel-store';
import { ChannelDetailsStore } from './channel-files-store';
import { UserStore } from './user-store';

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
  });

export interface IRootStore extends Instance<typeof RootStore> {}
