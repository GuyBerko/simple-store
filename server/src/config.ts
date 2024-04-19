import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = `${process.env.MONGO_URL}/store`;
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const config = {
    mongo: {
        url: MONGO_URL,
    },
    server: {
        port: SERVER_PORT,
    },
};

export default config;