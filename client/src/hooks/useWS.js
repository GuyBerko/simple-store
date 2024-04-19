import { useEffect } from 'react';

const PORT = 8080;

export const useWS = (userId, onMessage) => {
  useEffect(() => {
    if (!userId) return;

    const ws = new WebSocket(`ws://localhost:${PORT}?userId=${userId}`);

    ws.onopen = () => {
      console.log(`Opened a new WebSocket connection!`);
    };

    ws.onmessage = onMessage;
  }, [onMessage, userId]);
};
