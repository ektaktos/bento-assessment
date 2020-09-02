const models = require('../models/model');
const bcrypt = require('bcrypt');
const key = require('./key');
const jwt = require('jsonwebtoken');
var User = models.userModel;

exports.test = function(req, res) {
    generateId().then(data => {
        console.log("Promised data is " + data);
        res.json({ id: data });
    });
};

exports.register = function(req, res) {
    var mail = req.body.email;
    var password = req.body.password;
    User.findOne({ email: mail }, async function(err, user) {
        if (err) {
            return res.json({ status: 'error', message: err });
        }
        if (user) {
            return res.json({ status: 'error', message: 'User Email has been Used already' });
        } else {
            const salt = await bcrypt.genSalt(10);
            var hashedPassword = bcrypt.hashSync(password, salt);
            let user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            });
            user.save(function(err, user) {
                if (err) { res.json({ status: 'error', message: err }); }
                var token = jwt.sign({ email: user.email }, key.secret, { expiresIn: '1d' })
                res.json({ status: 'success', message: "User created Successfully", token: token });
            });
        }
    });
}

exports.login = function(req, res) {
    var email = req.body.email
    var password = req.body.password

    User.findOne({ email: email }, function(err, user) {
        if (!err && user) {
            bcrypt.compare(password, user.password).then(match => {
                if (match) {
                    const payload = { email: email };
                    const options = { expiresIn: '1d' };
                    const secret = key.secret;
                    const token = jwt.sign(payload, secret, options);
                    res.status(200).json({ status: 'success', result: user, token: token });
                } else {
                    res.status(401).json({ status: 'error', error: 'Invalid email or password' })
                }
            }).catch(err => {
                res.json({ status: 'error', error: err });
            });
        } else {
            res.status(404).json({ status: 'error', error: err, message: 'Invalid email or password' })
        }
    });
}

exports.getUser = function(req, res) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { res.json({ status: 'error', message: err }); }

        res.json({ status: 'error', data: user });

    });
}

exports.updateUser = function(req, res) {
    var id = req.params.id;
    User.findByIdAndUpdate(id, { $set: req.body }, (err, user) => {
        if (err) { res.json({ status: 'error', message: err }); }
        res.status(200).json({ status: 'success', message: 'User Updated' });
    });
}

exports.deleteUser = function(req, res) {
    var id = req.params.id;
    User.findByIdAndRemove(id, (err, user) => {
        if (err) { res.json({ status: 'error', message: err }); }
        res.status(200).json({ status: 'success', message: 'User deleted' });
    });
}