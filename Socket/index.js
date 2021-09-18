const express = require('express');
const SocketServer = require('ws').Server;

const app = express();
const port = 3000;
const server = app.listen(port, () => {
    console.log("Listening at port " + port);
});

// Initialize websocket
const wss = new SocketServer({ server })

app.get('/', (req, res) => {
    res.send("Hello world");
});

// When client connects
wss.on('connection', (ws) => {
    console.log("[Server] A client connected to the socket.");

    ws.on('close', () => {
        console.log("[Server] A client disconnected");
    });

    ws.on('error', (err) => {
        console.log("[Server] An error occured: ");
        console.log(err);
    });

    ws.on('message', (msg) => {
        console.log("[Server] A message arrived: ");
        console.log(JSON.parse(msg).text);
    });
})