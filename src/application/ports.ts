import { Channel } from '../domain/channel';

export interface ApiService {
  getChanngels(): Promise<Channel[]>;
  authUser(login: string, password: string): Promise<boolean>;
}

export interface StateService {
  saveChannels(channels: Channel[]): boolean;
}

export type ApiMethod = 'get' | 'post' | 'patch' | 'delete';