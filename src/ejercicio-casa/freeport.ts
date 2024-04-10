import net from 'net'

export const getFreePort = (desiredPort: number, callback: (err: string | undefined, port: number | undefined) => void ) => {
  const server = net.createServer();
  
  server.listen(desiredPort, () => {
    callback(undefined, desiredPort);
  });

  server.on('error', (err) => {
    if (err.name === 'EADDRINUSE') {
      callback (undefined, 0);
    } else {
      callback(err.message, undefined);
    }
  });
}