import * as ws from 'ws';
import config from './config';

const usersMap = new Map<
  string,
  {
    [wsKey: string]: ws.WebSocket;
  }
>();

export const sendMessage = (userId: string, message: string) => {
  const userSockets = usersMap.get(userId);
  if (!userSockets) {
    console.error('[sendMessage] - user does not exist in socket map');
    return;
  }
  const wsClients = Object.values(userSockets);
  wsClients.forEach((userSocket) => {
    userSocket.send(message);
  });
};

const startWsServer = () => {
  const server = new ws.WebSocketServer({ port: config.socket.port }, () => {
    console.log(`[socket] - Socket server started on port ${config.socket.port}`);
  });

  server.on('connection', function (userSocket, _incomingMessage) {
    if (!_incomingMessage.url) {
      console.error('[socket][connection] - url undefined');
      return;
    }
    
    const userId = new URLSearchParams(_incomingMessage.url.replace('/', '')).get('userId');
    if (!userId) {
      console.error('[socket][connection] - userId undefined', _incomingMessage.url);
      return;
    }

    const wsKey = Math.random().toString(36);
    const userSockets = usersMap.get(userId);

    if (!userSockets) {
      usersMap.set(userId, { wsKey: userSocket });
    } else {
      userSockets[wsKey] = userSocket;
    }

    userSocket.on('close', function (code, _reason) {
      const wsClients = usersMap.get(userId);

      if (!wsClients || Object.keys(wsClients).length <= 1) {
        usersMap.delete(userId);
      } else {
        delete wsClients[wsKey];
      }

      console.log(`[socket][connection] - ${userId} closed the connection: exit code ${code}`);
    });
  });
};

export default startWsServer;
