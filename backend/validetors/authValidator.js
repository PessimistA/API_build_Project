const express = require('express');
const app = express();
app.set('trust proxy', 1);
app.use(express.json()); 
/**
 * @brief kayıt olunurken eksik bilgi olup olmadığını kontrol eder
 * @param req json formatında aldığı request
 * @param res json formatında karşıya verilen respond
 * @param next sonraki adım
 */
function validateRegister(req,res,next) {/**< register ekranındaki */
    const { email,name, password } = req.body;
     if(!email||!name||!password){
        console.log("Email name or password part must be filled.");
        return res.status(400).json({error:"Email name or password part must be filled."})
     }
     next();
}
/**
 * @brief giriş yapılırken eksik bilgi olup olmadığını kontrol eder
 * @param req json formatında aldığı request
 * @param res json formatında karşıya verilen respond
 * @param next sonraki adım
 */
function validateLogin(req,res,next) {/**< login ekranındaki */
     const { email, password } = req.body;
    if(!email||!password){
        console.log("Email or password part must be filled.");
        return res.status(400).json({error:"Email or password part must be filled."})
    }
    next();
}
/**
 * @brief silinirken eksik bilgi olup olmadığını kontrol eder
 * @param req json formatında aldığı request
 * @param res json formatında karşıya verilen respond
 * @param next sonraki adım
 */
function validateDetele(req,res,next){/**< delete ekranındaki */
    const { email, password } = req.body;
    if(!email||!password){
        console.log("Email or password part must be filled.");
        return res.status(400).json({error:"Email name or password part must be filled."})
    }
    next();
}

module.exports = {
    validateRegister,
    validateLogin,
    validateDetele
};