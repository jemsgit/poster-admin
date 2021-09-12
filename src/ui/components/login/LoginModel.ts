export type LoginInterface = {
  login: string;
  password: string;
  isSubmitEnable: () => boolean;
}

export default class Login implements LoginInterface {
  login;
  password;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }

  isSubmitEnable() {
    return Boolean(this.login) && Boolean(this.password);
  }
}