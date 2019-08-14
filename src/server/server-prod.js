/* eslint-disable no-undef */
import path from 'path'
import express from 'express'

const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html');

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;


app.use(express.static(DIST_DIR));

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
});

http.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
});


io.sockets.on('connection', function (socket) {
    console.log("New user connected");
    let time = (new Date).toLocaleTimeString();
    socket.json.send({'event': 'connected', 'time': time});
	socket.broadcast.json.send({'event': 'userJoined', 'time': time});
    
    socket.on('message', function (msg) {
        console.log("Some user wrote: " + msg);
        let time = (new Date).toLocaleTimeString();
        socket.json.send({'event': 'messageSent', 'text': msg, 'time': time});
		socket.broadcast.json.send({'event': 'messageReceived', 'text': msg, 'time': time})
    });
    
	socket.on('disconnect', function() {
        console.log("User disconnected");
        let time = (new Date).toLocaleTimeString();
		io.sockets.json.send({'event': 'userSplit', 'time': time});
	});
});