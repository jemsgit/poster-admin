import axios from 'axios';
import { ApiService, ApiMethod } from 'application/ports';
import { setUserIsAuth } from './localStorageAdapter';
import { setUserAuth } from './storeAdapter';

if (0) {
  // cant use sync import with conditions
  import('../mock/mock')
    .then((module) => {
      module.mockApi();
    });
}

async function callApi(
  method: ApiMethod,
  url: string,
  params: Record<string, string>,
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
    console.log(result);
    return result;
  },
  getChannelDetails: async (id: ChannelId) => {
    console.log(config);
    const result = await callApi('get', config.endpoints.channels.getDetails.replace('{channelId}', id), {});
    console.log(result);
    return result;
  },
  saveChannelFileData: async (id: ChannelId, name: string, content: string) => {
    const result = await callApi('patch', config.endpoints.channels.saveContent.replace('{channelId}', id), { name, content });
    console.log(result);
    return result;
  },
  authUser: async (login: string, password: string) => {
    console.log(config);
    const result = await callApi('post', config.endpoints.auth.post, {
      login,
      password,
    });
    console.log(result);
    return result;
  },
};

export default apiService;
