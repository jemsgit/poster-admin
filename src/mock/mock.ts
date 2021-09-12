import axios from 'axios'
const mocks: Record<string, any> = {
  '/api/login': {
    data: {mock: 'dogs'}
  }
}

const getMockError = (config: any) => {
  const mockError: any = new Error()
  mockError.mockData = mocks[config.url]
  mockError.config = config
  return Promise.reject(mockError)
}

const isMockError = (error: any) => Boolean(error.mockData)

const getMock = (response: any) => {
  const {mockData, config} = response

  // Handle mocked success
  return Promise.resolve(Object.assign({
    data: {},
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
    isMock: true
  }, mockData))
}

function isUrlMocked(url: string) {
  return Boolean(mocks[url]);
}

function requestInterceptor(config: any) {
  if (isUrlMocked(config.url)) {
    console.log('axios mocking ' + config.url)
    return getMockError(config);
  }
  return config;
}

function responseInterceptor(error: any) {
  if (isMockError(error)) {
    return getMock(error)
  }
  return Promise.reject(error)
}

export function mockApi() {
  axios.interceptors.request.use(requestInterceptor, error => Promise.reject(error))
  axios.interceptors.response.use(response => response, responseInterceptor);
}
