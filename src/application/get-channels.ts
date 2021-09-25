import apiService from '../services/apiAdapter';
import {
  setChannels,
  setChannelsLoading,
  setChannelDetails,
  setFilesLoading,
} from '../services/storeAdapter';
import { Channel } from '../domain/channel';
import { ChannelDetails } from '../domain/channel-details';

async function getChanngels() {
  setChannelsLoading(true);
  let channels: Channel[] = [];
  try {
    channels = await apiService.getChanngels();
  } catch (e) {
    console.log(e);
  } finally {
    setChannelsLoading(false);
  }
  setChannels(channels);
}

async function getChannelDetails(id:ChannelId) {
  setFilesLoading(true);
  let channel: ChannelDetails;
  try {
    channel = await apiService.getChannelDetails(id);
    setChannelDetails(channel);
  } catch (e) {
    console.log(e);
  } finally {
    setFilesLoading(false);
  }
  console.log(channel);
}

export { getChanngels, getChannelDetails };
