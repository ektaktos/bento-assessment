const jwt = require('jsonwebtoken');
const key = require('./key');

let checkToken = (req,res,next) => {
    let authHeader = req.headers['x-access-token'] || req.headers['authorization'];
    if (authHeader) {
        token = authHeader.split(' ')[1];

        jwt.verify(token, key.secret, (err,decoded) => {
            if (err) { res.status(401).json({error: "Authentication error, invalid token"}); }
            req.decoded = decoded;
            next()
        });
       
    }else{
        res.status(401).json({error: "Authentication error, token required"});
    }
}

module.exports = {
    checkToken: checkToken
}