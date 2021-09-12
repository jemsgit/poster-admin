type Config = {
  endpoints: {
    [key: string]: {
      [key: string]: string
    }
  }
}

declare var config: Config;
declare var useMocks: boolean;