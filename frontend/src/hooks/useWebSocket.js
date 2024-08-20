import { useEffect, useState } from 'react';

const useWebSocket = (url, onMessage) => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socket.onmessage = (event) => {
      if (onMessage) onMessage(event.data);
    };
    setWs(socket);

    return () => {
      socket.close();
    };
  }, [url, onMessage]);

  return ws;
};

export default useWebSocket;
