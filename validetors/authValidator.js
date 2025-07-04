const express = require('express');
const app = express();

app.use(express.json()); 
function validateRegister(req,res,next) {
    const { email,name, password } = req.body;
     if(!email||!name||!password){
        console.log("Email name or password part must be filled.");
        return res.status(400).json({error:"Email name or password part must be filled."})
     }
     next();
}

function validateLogin(req,res,next) {
     const { email, password } = req.body;
    if(!email||!password){
        console.log("Email or password part must be filled.");
        return res.status(400).json({error:"Email or password part must be filled."})
    }
    next();
}

function validateDetele(req,res,next){
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