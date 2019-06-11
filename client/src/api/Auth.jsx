import cryptojs from "crypto-js";

const SECRET = process.env.SECRET;
const TOKEN_KEY = process.env.TOKEN_KEY;

export const isAuthenticated = () => {
    const token = sessionStorage.getItem(TOKEN_KEY);

    return token !== null;
};

export const isAuthenticatedAs = userTypes => {
    let auth = false;

    const token = getToken();

    if (token) {
        if (userTypes) {
            for (let i = 0; i < userTypes.length; i++) {
                const t = userTypes[i];

                if (t === token.type) {
                    auth = true;
                    break;
                }
            }
        } else {
            auth = true;
        }
    }

    return auth;
};

export const getToken = () => {
    const hash = sessionStorage.getItem(TOKEN_KEY);
    // const stringify = cryptojs.AES.decrypt(hash, SECRET);
    return JSON.parse(hash);
};

export const getUsername = () => {
    const item = sessionStorage.getItem(TOKEN_KEY);

    return JSON.parse(item).username;
};

export const login = token => {
    const stringify = JSON.stringify(token);
    // const hash = cryptojs.AES.encrypt(stringify, SECRET);
    sessionStorage.setItem(TOKEN_KEY, stringify);
};

export const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
};
