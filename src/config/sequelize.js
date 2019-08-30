
export default {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        ssl: true,
        dialectOptions: { ssl: {require:true }}
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        ssl: true,
        dialectOptions: { ssl: {require:true }}
    }
};
