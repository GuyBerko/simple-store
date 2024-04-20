import { useEffect } from 'react';
import { SOCKET_BASE_URL } from '../config';

export const useWS = (userId, onMessage) => {
  useEffect(() => {
    if (!userId) return;

    const ws = new WebSocket(`${SOCKET_BASE_URL}?userId=${userId}`);

    ws.onopen = () => {
      console.log(`Opened a new WebSocket connection!`);
    };

    ws.onmessage = onMessage;
  }, [onMessage, userId]);
};
