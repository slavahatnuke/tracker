module.exports = function (app, passport, nodemailer) {

    var User = require('../../models/user');
    var form = require("express-form"),
        field = form.field;

    var UserForm = form(
        field("local.firstName").trim(),
        field("local.lastName").trim(),
        field("local.email").trim().required().isEmail()
    );

    var jwt = require('jsonwebtoken');

    var issueToken = function (payload) {
        var token = jwt.sign(payload, process.env.TOKEN_SECRET || "tracker");
        return token;
    };

    var verifyToken = function (token, verified) {
        return jwt.verify(token, process.env.TOKEN_SECRET || "tracker", {}, verified);
    };

    var emailSender = 'mailtotesthere@gmail.com';

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailSender,
            pass: 'xxx666up'
        }
    });

    app.post('/api/users/resetPassword', function (req, res, next) {

        verifyToken(req.query.token, function () {

            var decoded = jwt.decode(req.query.token, {complete: true});
            User.findById(decoded.payload, '-local.passwordHashed -local.passwordSalt', function (err, user) {
                if (err) return next(err);

                user.local.password = req.query.password;

                user.save(function (err, user) {
                    if (err) return next(err);
                    res.json(user);
                });
            });

        });

    });

    app.post('/api/login',
        passport.authenticate('local', {successRedirect: '/api/users/me'})
    );

    app.post('/api/logout', function (req, res) {
        req.logout();
        res.sendStatus(200);
    });

    app.post('/api/resetPassword', function (req, res, next) {

        User.findOne({'local.email': req.body.email}, function (err, user) {

            if (err) return next(err);

            if (!user) {
                res.sendStatus(400);
            }

            if (user && user.local.username == req.body.username) {

                var preToken = user._id;

                var token = issueToken(preToken);

                transporter.sendMail({
                    from: emailSender,
                    to: user.local.email,
                    subject: 'Password reset',
                    text: 'http://192.168.10.21:3000/#/public/change-password/' + token
                });

                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        });

    });

    app.post('/api/register', function (req, res, next) {

        User.findOne({'local.username': req.body.username}, function (err, user) {
            if (err) return next(err);

            var o = false;

            if (user) {
                o = true;
            }

            if (!o) {
                var user = new User({
                    local: {
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password
                    }
                });

                user.save(function (err) {
                    req.login(user, function (err) {
                        if (err) return next(err);
                        res.redirect('/api/users/me');
                    });
                });
            } else {
                res.sendStatus(403);
            }
        });
    });

    app.use('/api', function (req, res, next) {
        if (!req.user) return res.sendStatus(401);
        next();
    });

    app.get('/api/users/me', function (req, res) {
        User.findOne({_id: req.user._id}, '-local.passwordHashed -local.passwordSalt', function (err, user) {
            res.json(user);
        });
    });

    app.get('/api/users', function (req, res) {
        User.find({}, '-local.passwordHashed -local.passwordSalt', function (err, users) {
            res.json(users);
        });

    });

    app.put('/api/users/me', UserForm, function (req, res, next) {

        if (req.form.isValid) {

            User.findById(req.body._id, '-local.passwordHashed -local.passwordSalt', function (err, user) {
                if (err) return next(err);

                user.local.firstName = req.form.local.firstName;
                user.local.lastName = req.form.local.lastName;
                user.local.email = req.form.local.email;

                user.save(function (err, user) {
                    if (err) return next(err);
                    res.json(user);
                });
            });
        }
        else {
            res.status(400).json(req.form.errors);
        }

    });


    app.post('/api/users/changePassword', function (req, res, next) {

        User.findById(req.body._id, '-local.passwordHashed -local.passwordSalt', function (err, user) {

            if (err) return next(err);

            var verify = function () {
                if (user.validPassword(req.body.oldPassword)) {
                    return true;
                }
            }();

            if (verify) {

                user.setPassword(req.body.newPassword);

                user.save(function (err, user) {
                    if (err) return next(err);
                    res.json(user);
                });

            } else {
                res.sendStatus(403);
            }

        });

    });


};