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

// Send new room details to everyone in the room
const updateRoom = (roomID) => {
    for (const [key, value] of Object.entries(rooms[roomID].friends)) {
        let ws = clients[key].socket;
        ws.send(JSON.stringify({
            operation: "update-room",
            data: {
                roomID: roomID,
                friends: rooms[roomID].friends
            }
        }));
    }
}

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
        let roomID = Math.floor(Math.random() * 10000);
        while (roomID in rooms) {
            roomID = Math.floor(Math.random() * 10000);
        }
        
        rooms[roomID] = {
            friends: {
                [clientID]: {
                    ready: false
                }
            }
        };
        res.send({
            joined: true,
            id: roomID,
            friends: {
                [clientID]: {
                    ready: false
                }
            }
        });
    } else if (requestRoomID in rooms) {
        rooms[requestRoomID].friends[clientID] = {
            ready: false
        }
        // Send message to everybody that room was updated with new player
        updateRoom(requestRoomID);
        // If requested room exists, send player to that room
        res.send({
            joined: true,
            id: requestRoomID,
            friends: rooms[requestRoomID].friends
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
        if (message.operation === "initiate") {
            // When client first joins, initiate the user and store info
            let clientID = message.data.id;
            clients[clientID] = {
                socket: ws
            }
            console.log("Client " + clientID + " joined");
        } else if (message.operation === "leave-room") {
            let clientID = message.data.clientID;
            let roomID = message.data.roomID;
            // Remove user from their room
            delete rooms[roomID].friends[clientID];
            // Update room for users still in the room
            updateRoom(roomID);
            // Delete room if empty
            if (Object.keys(rooms[roomID].friends).length === 0) {
                console.log("delete room " + roomID);
                delete rooms[roomID];
            }
        } else if (message.operation === "update-ready") {
            // Ready/unready in the pre-race stages
            let clientID = message.data.clientID;
            let newReady = message.data.ready;
            let roomID = message.data.roomID;
            rooms[roomID].friends[clientID].ready = newReady;
            updateRoom(roomID);
        }
    });
})