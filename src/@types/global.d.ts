declare let config: Config;
declare let useMocks: boolean;

type Config = {
  endpoints: {
    [key: string]: {
      [key: string]: string
    }
  }
};
