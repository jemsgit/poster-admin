declare let config: Config;
declare let useMocks: boolean;
declare const version: string;
declare const tag: string;

type Config = {
  endpoints: {
    [key: string]: {
      [key: string]: string
    }
  }
};
