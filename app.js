require('dotenv').config();

const express = require('express');
const socketIo = require('socket.io');
const cors = require('cors');
const http = require('http');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const statuses = require('statuses');
const logger = require("morgan");

const app = express();
const port = process.env.PORT || '5000';

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES
app.get('/', (req, res) => {
  res.send('webrtc server running');
});

const webServer = http.Server(app).listen(port, function () {
  console.log(`Web server start. http://${webServer.address().port}/`);
});

const socketMain = require('./socket/index');

const io = socketIo(webServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

socketMain(io);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    code: res.status,
    message: statuses[res.status],
  });
});
