/* eslint-disable no-undef */
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack.dev.config.js'
import { getConsoleOutput } from '@jest/console';

const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html'),
            compiler = webpack(config);

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/src'));

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler))
app.get('*', (req, res, next) => {
  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
  if (err) {
    return next(err)
  }
  res.set('content-type', 'text/html')
  res.send(result)
  res.end()
  })
})

http.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})

io.sockets.on('connection', function (socket) {
    let time = (new Date).toLocaleTimeString();
    let username = socket.id.substr(0, 5);
    console.log(username + " connected (" + time + ')');
    socket.broadcast.emit('newUser', username);
    socket.emit('userName', username);

    socket.on('message', function(msg){
      console.log('User: ' + username + ' | Message: ' + msg);
      io.sockets.emit('messageToClients', msg, username);
    });

    socket.on('disconnect', function() {
        let time = (new Date).toLocaleTimeString();
        console.log(username + " disconnected (" + time + ')');
        socket.broadcast.emit('dissconectUser', username);
      });
});