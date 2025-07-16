const jwt = require('jsonwebtoken');
const User = require('../models/mongouser')
const SECRET_KEY = process.env.SECRET_KEY || "SUPER_SECRET_KEY";

/**
 * @brief authenticateToken tokenin geçerliliğini doğrular
 * @param req json formatında aldığı request
 * @param res json formatında karşıya verilen respond
 * @param next sonraki aşamaya geçer
 */

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];/**@brief authorization: bearer <token>  kısmında sadece bearer <token> kısmını alır*/
    const token = authHeader && authHeader.split(' ')[1];/**@brief bearer <token>  kısmında boşluğa göre böler ve 1. elemanı sadece <token> kısmını alır*/
    if (!token) return res.status(401).json({ error: 'No token provided.' });

    jwt.verify(token, SECRET_KEY, (err, user) => {/**@brief verify, tokenin doğru olup olmadığını anlama işlemini burada yapar  */
        if (err) return res.status(403).json({ error: 'Invalid token.' });
        req.user = user;/**@brief request için bir user tanımlar ve bize paramatre olarak verilen user bilgisinin atamasını yapar */
        next();
    });
}

module.exports = authenticateToken;
