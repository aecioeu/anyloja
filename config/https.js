module.exports = function(app) {

    app.use(function(req, res, next) {
        if ((req.get('X-Forwarded-Proto') !== 'https')) {
            if (req.get('Host') == "localhost:3000") {
                next();
            } else {
                res.redirect('https://' + req.get('Host') + req.url);
            }

        } else
            next();
    });
}