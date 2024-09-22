const express = require('express');
const app = express();
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const port = 8080;

const server = http.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {

    console.log('socket connection successful');

    //whatever user location received from frontend, sent it to all users who connected to the socket
    socket.on("send-location", (coordinates) => {
        //... => spread operator to include all data (latitude and longitude)
        io.emit("receive-location", {id: socket.id, ...coordinates});
    });

    //if an user disconnects, send the user id to the frontend to remove his marker from the map view
    socket.on("disconnect", () => {
        io.emit("user-disconnected", socket.id);
    });
});

app.get('/', (req, res) => {
    res.render('index');
});

server.listen(port);