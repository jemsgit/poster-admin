/* eslint-disable import/prefer-default-export */
import apiService from '../services/apiAdapter';
import {
  setChannelFileSavingState,
  setChannelFileData,
} from '../services/storeAdapter';

async function saveChannelFileContent(channelId: ChannelId, fileName: string, data: string) {
  setChannelFileSavingState(true);
  try {
    await apiService.saveChannelFileData(channelId, fileName, data);
  } catch (e) {
    console.log(e);
  } finally {
    setChannelFileSavingState(false);
  }
  setChannelFileData(fileName, data);
}

export { saveChannelFileContent };
