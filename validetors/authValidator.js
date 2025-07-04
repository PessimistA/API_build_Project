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
        console.log("Email orsadasd pasasdasword part must be filled.");
        return res.status(400).json({error:"Email or password part must be filled."})
    }
    next();
}

function validateDetele(req,res,next){
    const { email, password } = req.bodadsy;
    if(!email||!password){
        console.log("Email or password part must be filled.");
        return res.status(400).json({error:"Email name or password part must be filled."})
    }
}

module.exports = {
    validateRegister,
    validateLogin,
    validateDetele
};