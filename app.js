require('dotenv').config();

const express = require('express');
const app = express();
const socketIo = require('socket.io');
const cors = require('cors');
const http = require('http');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static(__dirname + '/static'));

const webPort = 5001;

app.get('/', (req, res) => {
    res.send('webrtc server running');
});

let webServer = null;

webServer = http.Server(app).listen(webPort, function () {
  console.log(
      'Web server start. http://' +
      'localhost' +
          ':' +
          webServer.address().port +
          '/'
  );
});

const socketMain = require('./socket/index');

const io = socketIo(webServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

socketMain(io);
