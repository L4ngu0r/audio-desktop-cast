module.exports = function (app, CastService) {

    /**********************
     *
     * GET METHODS
     *
     ***********************/

    /**
     * Index
     */
    app.get('/', (req, res) => {
        res.render('index', {message: ""});
    });

    /**
     * Stop
     */
    app.get('/stop', (req, res) => {
        CastService.stop((err,status) => {
            console.info("Stopping casting...");
            var prettyStatus = JSON.stringify(status, null, 2);
            res.render('index', {message: prettyStatus});
        });
    });

    /**
     * Pause
     */
    app.get('/pause', (req, res) => {
        CastService.pause((err,status) => {
            console.info("Pausing stream...");
            var prettyStatus = JSON.stringify(status, null, 2);
            res.render('index', {message: prettyStatus});
        });
    });

    /**
     * Resume
     */
    app.get('/resume', (req, res) => {
        CastService.resume((err,status) => {
            console.info("Resuming stream...");
            var prettyStatus = JSON.stringify(status, null, 2);
            res.render('index', {message: prettyStatus});
        });
    });

    /**********************
     *
     * POST METHODS
     *
     ***********************/

    /**
     * Play
     */
    app.post('/play', (req, res) => {
        if (req && req.body) {
            if (req.body.inputUrl && req.body.typeSelect && req.body.title) {
                var options = {
                    title: req.body.title,
                    type: req.body.typeSelec
                };

                var callbackPlay = (err,status) => {
                    console.info("Launching play !");
                    var prettyStatus = JSON.stringify(status, null, 2);
                    res.render('index', {message: prettyStatus});
                };

                if (CastService.havePlayer()) {
                    CastService.getCurrentPlayer().play(req.body.inputUrl, options, callbackPlay);
                } else {
                    res.render('index', {message:"No player on service !"});
                }
            }
        } else {
            console.error("Request body empty");
        }
    });

};