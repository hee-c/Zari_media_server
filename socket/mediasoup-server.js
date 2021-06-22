const conference = require('./video-conference');

function socketMain(io) {
    conference(io);
}

module.exports = socketMain;
