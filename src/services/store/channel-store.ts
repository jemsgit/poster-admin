/* eslint-disable no-param-reassign */
import { cast, types, Instance } from 'mobx-state-tree';

export const Channel = types.model('Channel', {
  id: types.identifier,
  name: types.string,
  type: types.string,
  loadImage: types.union(types.boolean, types.string),
  times: types.array(types.string),
});

export interface IChannelStore extends Instance<typeof ChannelStore> {}
export interface IChannel extends Instance<typeof Channel> {}

export const ChannelStore = types
  .model('ChannelStore', {
    isLoading: true,
    channels: types.array(Channel),
  })
  .views((self) => ({
    activeChannel(id: string) {
      return self.channels.find((t) => t.id === id);
    },
  }))
  .actions((self) => ({
    setChannels(channels: IChannel[]) {
      self.channels = cast(channels);
    },
    setIsLoading(isLoading: boolean) {
      self.isLoading = isLoading;
    },
  }));
