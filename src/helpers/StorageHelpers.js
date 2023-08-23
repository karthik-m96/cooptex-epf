export const USER_TOKEN_KEY = "user";
export const JWT_STORAGE_KEY = "JWT_USER_EPF";

export const getUser = () =>
  JSON.parse(sessionStorage?.getItem(USER_TOKEN_KEY));

export const setUser = (value) => sessionStorage?.setItem(USER_TOKEN_KEY, value);
