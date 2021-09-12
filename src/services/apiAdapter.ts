import axios from 'axios';
import { ApiService, ApiMethod } from "application/ports";

if(useMocks) {
  import('../mock/mock')
    .then((module) => {
      module.mockApi();
    });
}

const apiService: ApiService = {
  getChanngels: async () => {
    return [];
  },
  authUser: async (login: string, password: string) => {
    console.log(config)
    const result = await callApi('post', config.endpoints.auth.post, {
      login,
      password,
    });
    console.log(result);
    return true;
  }
}

function callApi(method: ApiMethod, url: string, params: Record<string, string>, headers: Record<string, string> = {}): Promise<any> {
  return axios[method](url, params);
}

export default apiService;