import * as ws from 'ws';
import config from './config';

const usersMap = new Map<string, Map<string, ws.WebSocket>>();

export const sendMessage = (userId: string, message: string) => {
  const userSockets = usersMap.get(userId);
  if (!userSockets) {
    console.error('[sendMessage] - user does not exist in socket map');
    return;
  }
  
  userSockets.forEach((userSocket) => {
    userSocket.send(message);
  });
};

const startWsServer = () => {
  const server = new ws.WebSocketServer({ port: config.socket.port }, () => {
    console.log(`[socket] - Socket server started on port ${config.socket.port}`);
  });

  server.on('connection', (userSocket, _incomingMessage) => {
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
      const wsMap = new Map<string, ws.WebSocket>();
      wsMap.set(wsKey, userSocket);
      usersMap.set(userId, wsMap);
    } else {
      userSockets.set(wsKey, userSocket);
    }

    userSocket.on('close', (code, _reason) => {
      const wsClients = usersMap.get(userId);

      if (!wsClients || wsClients.size <= 1) {
        usersMap.delete(userId);
      } else {
        wsClients?.delete(wsKey);
      }

      console.log(`[socket][connection] - ${userId} closed the connection: exit code ${code}`);
    });
  });
};

export default startWsServer;
