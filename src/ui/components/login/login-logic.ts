/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line arrow-body-style
export const isSubmitEnable = (login: string, password: string, isLoading: boolean) => {
  return !isLoading && Boolean(login) && Boolean(password);
};
