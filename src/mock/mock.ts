import axios from 'axios';

const mocks: Record<string, any> = {
  '/api/channels': {
    get: {
      data: [{
        id: '@test',
        name: 'Test Channel',
        type: 'links',
        loadImage: 'random',
        times: ['16:30[4]'],
      }, {
        id: '@test1',
        name: 'Test Channel1',
        type: 'photo',
        loadImage: false,
        times: ['16:30[1-4]'],
      }],
    },
  },
  '/api/channels/saveFile/@test': {
    patch: {
      data: true,
    },
  },
  '/api/channels/@test': {
    get: {
      data: {
        id: '@test',
        times: ['16:30[4]'],
        files: [{
          name: 'channels/test/test__channel.txt',
          content: 'This is http://fsdfs.fs file content 123 c <div>\r\nThis is file content 123\r\nThis is file content 123\r\nThis is file content 123',
        }, {
          name: 'test_listResult.txt',
          content: 'This is file with results',
        }, {
          name: 'test_pending.txt',
          content: 'This is file with pending data',
        }],
      },
    },
  },
};

const getMockError = (config: any) => {
  const mockError: any = new Error();
  mockError.mockData = mocks[config.url][config.method];
  mockError.config = config;
  return Promise.reject(mockError);
};

const isMockError = (error: any) => Boolean(error.mockData);

const getMock = (response: any) => {
  const { mockData, config } = response;
  // Handle mocked success
  return new Promise((res) => {
    setTimeout(() => {
      res({
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
        isMock: true,
        ...mockData,
      });
    }, 1000);
  });
};

function isUrlMocked(url: string, method: string) {
  return Boolean(mocks[url] && mocks[url][method]);
}

function requestInterceptor(config: any) {
  if (isUrlMocked(config.url, config.method)) {
    return getMockError(config);
  }
  return config;
}

function responseInterceptor(error: any) {
  if (isMockError(error)) {
    return getMock(error);
  }
  return Promise.reject(error);
}

// eslint-disable-next-line import/prefer-default-export
export function mockApi() {
  axios.interceptors.request.use(requestInterceptor, (error) => Promise.reject(error));
  axios.interceptors.response.use((response) => response, responseInterceptor);
}
