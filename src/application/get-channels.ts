import { StateService } from './ports';
import apiService from '../services/apiAdapter';

const stateService: StateService = { saveChannels: (channels) => true};

async function getChanngels() {
  const channels = await apiService.getChanngels();
  stateService.saveChannels(channels);
}

export { getChanngels };