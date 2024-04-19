import * as ws from 'ws';

const PORT = 8080;

export const usersMap = new Map<string, ws.WebSocket[]>();

export const sendMessage = (userId: string, message: string) => {
  if (!usersMap.has(userId)) {
    console.error('[sendMessage] - user does not exist in socket map');
    return;
  }
  usersMap.get(userId)?.forEach((ws) => {
    ws.send(message);
  });
};

const startWsServer = () => {
  const server = new ws.WebSocketServer({ port: PORT }, () => {
    console.log(`[socket] - Socket server started on port ${PORT}`);
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

    if (usersMap.has(userId)) {
      usersMap.get(userId)?.push(userSocket);
    } else {
      usersMap.set(userId, [userSocket]);
    }

    userSocket.on('close', function (code, _reason) {
      usersMap.delete(userId);
      console.log(`[socket][connection] - ${userId} closed the connection: exit code ${code}`);
    });
  });
};

export default startWsServer;
