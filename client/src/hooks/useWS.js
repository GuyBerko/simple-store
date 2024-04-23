import { useEffect } from 'react';
import { SOCKET_BASE_URL } from '../config';

export const useWS = (userId, onMessage) => {
  useEffect(() => {
    if (!userId) return;
    try{
      const ws = new WebSocket(`${SOCKET_BASE_URL}?userId=${userId}`);

      ws.onopen = () => {
        console.log(`Opened a new WebSocket connection!`);
      };
  
      ws.onmessage = onMessage;
    }
    catch(err) {
      console.error('Error connecting to ws', err);
    }
  }, [onMessage, userId]);
};
