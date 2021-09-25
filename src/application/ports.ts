import { Channel } from '../domain/channel';
import { ChannelDetails } from '../domain/channel-details';

export interface ApiService {
  getChanngels(): Promise<Channel[]>;
  getChannelDetails(id: ChannelId): Promise<ChannelDetails>;
  saveChannelFileData(id: ChannelId, name: string, content: string): Promise<boolean>;
  authUser(login: string, password: string): Promise<boolean>;
}

export interface StateService {
  saveChannels(channels: Channel[]): boolean;
}

export type ApiMethod = 'get' | 'post' | 'put' | 'delete';
