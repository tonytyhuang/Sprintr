const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const server = app.listen(port, () => {
    console.log("Listening at port " + port);
});

// Initialize websocket
const wss = new SocketServer({ server })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Global variables
var rooms = {};

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
        let message = JSON.parse(msg).text;
        console.log(message);

        // Joining game
        if (message === "Joining game...") {
            // Creat room ID and send details back
            let roomID = Math.floor(Math.random() * 100);
            rooms[roomID] = {
                friends: [1]
            };
            ws.send(JSON.stringify({
                operation: "update-room",
                data: {
                    roomID: roomID
                }
            }));
        }
    });
})