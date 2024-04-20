import dotenv from 'dotenv';

dotenv.config();

const SERVER_DEFAULT_PORT = 4000;
const SOCKET_DEFAULT_PORT = 8080;
const MONGO_URL = `${process.env.MONGO_URL}/store`;
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : SERVER_DEFAULT_PORT;
const SOCKET_PORT = process.env.SOCKET_PORT ? Number(process.env.SOCKET_PORT) : SOCKET_DEFAULT_PORT;

const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
  socket: {
    port: SOCKET_PORT,
  },
};

export default config;
