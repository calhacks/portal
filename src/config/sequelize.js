
export default {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWD,
        database: process.env.DB_NAME,
        host: '127.0.0.1',
        dialect: 'mysql'
    }
};
