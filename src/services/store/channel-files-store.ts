/* eslint-disable no-param-reassign */
import { ChannelDetails } from 'domain/channel-details';
import { cast, types, Instance } from 'mobx-state-tree';

export const ChannelFile = types.model('ChannelFile', {
  name: types.string,
  content: types.string,
});

export interface IChannelDetailsStore extends Instance<typeof ChannelDetailsStore> {}
export interface IChannelFile extends Instance<typeof ChannelFile> {}

export const ChannelDetailsStore = types
  .model('ChannelDetailsStore', {
    isLoading: true,
    isSaving: false,
    channelId: types.optional(types.string, ''),
    files: types.array(ChannelFile),
    times: types.array(types.string),
  })
  .actions((self) => ({
    setChannel(channelId: string) {
      self.channelId = channelId;
    },
    setIsLoading(isLoading: boolean) {
      self.isLoading = isLoading;
    },
    setData(data: ChannelDetails) {
      self.files = cast(data.files);
      self.channelId = data.id;
      self.times = cast(data.times);
    },
    setIsSaving(isSaving: boolean) {
      self.isSaving = isSaving;
    },
    setFileData(name: string, content: string) {
      const file = self.files.find((item) => item.name === name);
      if (file) {
        file.content = content;
      }
    },
    clearChannelData() {
      self.channelId = '';
      self.files = cast([]);
      self.times = cast([]);
    },
  }));
