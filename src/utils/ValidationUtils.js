// @flow
export const isEmailValid = (email: string) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

export const isTextValid = (text: string): boolean => text !== '';
