const jwt = require('jsonwebtoken');
const User = require('../models/mongouser')
const SECRET_KEY = "SUPER_SECRET_KEY";



function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided.' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token.' });
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
