import cryptojs from "crypto-js";

const SECRET = cryptojs.enc.Utf8.parse("shhhhhhhhhhhh!!!!!");
const TOKEN_KEY = "@philipe-Token";

export const isAuthenticated = () => {
  const token = sessionStorage.getItem(TOKEN_KEY);

  return token !== null;
};

export const getToken = () => {
  const hash = sessionStorage.getItem(TOKEN_KEY);
  const stringify = cryptojs.AES.decrypt(hash, SECRET);
  return JSON.parse(stringify);
};

export const login = (token, callback) => {
  const stringify = JSON.stringify(token);
  const hash = cryptojs.AES.encrypt(stringify, SECRET);
  sessionStorage.setItem(TOKEN_KEY, hash);
  callback();
};

export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};
