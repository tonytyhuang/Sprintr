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
var clients = {};

// Join game
app.post('/join-game', (req, res) => {
    console.log("Received request to join room");
    // See if requested room ID exists
    let requestRoomID = req.body.roomID;
    let clientID = req.body.clientID;

    console.log(requestRoomID);
    console.log(clientID);
    if (requestRoomID < 0) {
        // If no request, generate new room
        let roomID = Math.floor(Math.random() * 100);
        rooms[roomID] = {
            friends: [clientID]
        };
        res.send({
            joined: true,
            id: roomID
        });
    } else if (requestRoomID in rooms) {
        rooms[requestRoomID].friends.push(clientID);
        // Send message to everybody that room was updated with new player
        for (let i = 0; i < rooms[requestRoomID].friends.length; i++) {
            let f = rooms[requestRoomID].friends[i];
            console.log(f);
            clients[f].socket.send(JSON.stringify({
                operation: "update-room",
                data: {
                    roomID: requestRoomID,
                    friends: rooms[requestRoomID].friends
                }
            }));
        }
        // If requested room exists, send player to that room
        res.send({
            joined: true,
            id: requestRoomID
        });
    } else {
        // If requested room doesn't exist, send error
        res.send({
            joined: false
        });
    }
})

// websocket functions
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
        let message = JSON.parse(msg);
        console.log(message.text);
        // When client first joins, initiate the user and store info
        if (message.operation === "initiate") {
            let clientID = message.data.id;
            clients[clientID] = {
                socket: ws
            }
            console.log("Client " + clientID + " joined");
        }
    });
})