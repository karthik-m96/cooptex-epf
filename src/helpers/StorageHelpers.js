const userNames = JSON.parse(process.env.REACT_APP_USERS) || [];

export const setUserSession = (data) => {
  sessionStorage.setItem(`user-data`, JSON.stringify(data));
};

export const getUserFromSession = () => {
  const userData = JSON.parse(sessionStorage.getItem(`user-data`));
  return userData;
};

export const checkIfValidUserSession = () => {
  const user = getUserFromSession();
  return !!user;
};

export const checkIfValidUser = (username, password) => {
  if (!userNames || userNames?.length === 0) return false;
  const [user] = userNames?.filter(
    (user) => user.name === username && user.password === password
  );
  if (!user) return false;
  const isValidSession = getUserFromSession();
  if (isValidSession) return true;
  setUserSession(user);
  return checkIfValidUserSession();
};
