import { addMiddleware } from 'mobx-state-tree';
import { mstLog } from 'mst-log';
import { RootStore } from './store/root-stotre';
import { Channel as ChannelStoreModel, IChannel } from './store/channel-store';
import { checkUserIsAuth } from './localStorageAdapter';

import { Channel } from '../domain/channel';
import { ChannelDetails } from '../domain/channel-details';

export const store = RootStore.create({
  user: {
    isAuth: checkUserIsAuth(),
  },
});

addMiddleware(store, mstLog());

export function setUserAuth(isAuth:boolean) {
  store.user.setUserAuth(isAuth);
}

export function setUserInfo(name: string) {
  store.user.setUserInfo(name);
}

export function setChannels(channels: Channel[]) {
  const newChannels: IChannel[] = channels.map(
    (channel: Channel) => ChannelStoreModel.create(channel),
  );
  store.channelStore.setChannels(newChannels);
}

export function setChannelsLoading(isLoading: boolean) {
  store.channelStore.setIsLoading(isLoading);
}

export function setFilesLoading(isLoading: boolean) {
  store.channelDetailsStore.setIsLoading(isLoading);
}

export function setChannelDetails(data: ChannelDetails) {
  store.channelDetailsStore.setData(data);
}

export function setChannelFileSavingState(state: boolean) {
  store.channelDetailsStore.setIsSaving(state);
}

export function setChannelFileData(fileName: string, data: string) {
  store.channelDetailsStore.setFileData(fileName, data);
}

export function setAppTheme(theme: Theme) {
  store.app.setTheme(theme);
}
