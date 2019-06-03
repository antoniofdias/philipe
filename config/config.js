const config = {
    env: process.env.NODE_ENV,
    database: {
        connection: {
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            host: process.env.DB_HOST || "localhost",
            port: process.env.DB_PORT,
            name: process.env.DB_NAME
        }
    }
};

const { user, password, host, port, name } = config.database.connection;

const credential = "";

if (user && password) {
    credential = `${user}:${password}@`;
}

if (port) {
    port = `:${port}`;
}

config.database.uri = `mongodb://${credential}${host}/${name}`;

module.exports = config;
