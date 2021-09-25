import axios from 'axios';
import { ApiService, ApiMethod } from 'application/ports';

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
  params: Record<string, string>,
  headers: Record<string, string> = {},
): Promise<any> {
  console.log(headers);
  const res = await axios[method](url, params);
  return res.data;
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
    const result = await callApi('put', config.endpoints.channels.saveContent, { id, name, content });
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
    return true;
  },
};

export default apiService;
