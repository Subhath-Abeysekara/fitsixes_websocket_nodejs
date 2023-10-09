const WebSocketServer = require('ws').Server;
const cron = require('node-cron');
const axios = require('axios');

const wss = new WebSocketServer({ port: 8080 });

const clients = [];

wss.on('connection', (ws) => {
  clients.push(ws);

  ws.on('message', (message) => {
    console.log(`Received message from client: ${message}`);
  });

  ws.on('close', () => {
    clients.splice(clients.indexOf(ws), 1);
  });
});

cron.schedule('*/10 * * * * *', async () => {
  // This code will be executed every 10 seconds
  // console.log("hello")
  const url = 'http://3.108.252.150:5000/v1/getscore';
  await axios.get(url)
  .then((response) => {
    // console.log(response.data); // The response data from the API
    if(response.data.state == true){
      clients.forEach(ws => {
        ws.send(JSON.stringify(response.data.score[1]));
      });
    }
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
  });
});

console.log('Server listening on port 8080');

