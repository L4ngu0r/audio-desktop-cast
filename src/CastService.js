var chromecasts = require('chromecasts')();

/**
 * CastService
 * Abstract layer for chromecast module
 * @param io
 * @returns {{havePlayer: havePlayer, getCurrentPlayer: getCurrentPlayer, play: play, stop: stop, resume: resume, pause: pause, getStatus: getStatus}}
 * @constructor
 */
function CastService(io) {

    // When a cast device is found !
    chromecasts.on('update', (player) => {
        console.info("Google Cast update event !");
        if (player) {
            console.info("Player is here and ready !!");
            self.currentPlayer = player;
            self.currentPlayer.on('status', (status) => {
                console.log("[Event] : status");

                var params = {
                    contentId : status.media ? status.media.contentId : null,
                    contentType : status.media ? status.media.contentType : null,
                    playerState : status.playerState,
                    volumeLevel : status.volume.level,
                    repeatMode : status.repeatMode,
                    idleReason : status.idleReason,
                    status : status
                };
                console.log("params",params);
                
                io.sockets.emit('updateStatus', params);
            });
        }
    });

    // scanning for Google Cast devices
    chromecasts.update();

    var self = this;

    return {
        havePlayer: function () {
            return self.currentPlayer ? true : false;
        },

        getCurrentPlayer: function () {
            return self.currentPlayer;
        },

        play: function (url, options, cb) {
            self.currentPlayer.play(url, options, cb);
        },

        stop: function (cb) {
            self.currentPlayer.stop(cb);
        },

        resume: function (cb) {
            self.currentPlayer.resume(cb);
        },

        pause: function (cb) {
            self.currentPlayer.pause(cb);
        },

        getStatus: function (cb) {
            if(self.currentPlayer) {
                self.currentPlayer.status(cb);
            }
        }
    };

}

module.exports = CastService;