import axios from 'axios';
import { ApiService, ApiMethod } from 'application/ports';
import { setUserIsAuth } from './localStorageAdapter';
import { setUserAuth } from './storeAdapter';

if (useMocks) {
  // cant use sync import with conditions
  import('../mock/mock')
    .then((module) => {
      module.mockApi();
    });
}

async function callApi(
  method: ApiMethod,
  url: string,
  params?: Record<string, string>,
  headers: Record<string, string> = {},
): Promise<any> {
  console.log(headers);
  let res;
  try {
    res = await axios[method](url, params);
    res = res.data;
  } catch (e: any) {
    if (axios.isAxiosError(e) && e.response.status === 401) {
      setUserIsAuth(false);
      setUserAuth(false);
    } else {
      throw Error(e);
    }
  }
  return res;
}

const apiService: ApiService = {
  getChanngels: async () => {
    const result = await callApi('get', config.endpoints.channels.get, {});
    return result;
  },
  getChannelDetails: async (id: ChannelId) => {
    const result = await callApi('get', config.endpoints.channels.getDetails.replace('{channelId}', id), {});
    return result;
  },
  saveChannelFileData: async (id: ChannelId, name: string, content: string) => {
    const result = await callApi('patch', config.endpoints.channels.saveContent.replace('{channelId}', id), { name, content });
    return result;
  },
  authUser: async (login: string, password: string) => {
    console.log(config);
    const result = await callApi('post', config.endpoints.auth.post, {
      login,
      password,
    });
    return result;
  },
  logoutUser: async () => {
    const result = await callApi('get', config.endpoints.auth.logout);
    return result;
  },
};

export default apiService;
