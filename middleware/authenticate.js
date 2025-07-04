const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();//express ile alır
app.use(express.json());//aldığını kullanır

const SECRET_KEY = "SUPER_SECRET_KEY";

const users = [];

app.post('/register',async (req,res) => {
     const { email,name, password } = req.body;
     if(!email||!name||!password){
        console.log("Email name or password part must be filled.");
        return res.status(400).json({error:"Email name or password part must be filled."})
     }
    const isexistuser = users.find(u=> u.email===email)
    if (isexistuser) {
        return res.status(409).json({ error: "This user already exist." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);//şifre hashlenir
    const newUser = { id: users.length + 1, email,name ,password: hashedPassword };
    users.push(newUser);
    res.status(201).json({ message: "User added successfully" });
    console.log("User added successfully");
});

app.post('/login',async (req,res) => {
     const { email, password } = req.body;
    if(!email||!password){
        console.log("Email or password part must be filled.");
        return res.status(400).json({error:"Email name or password part must be filled."})
    }
    const user = users.find(u=>u.email===email)
    if (!user) {
        console.log("No such user can be found.");
        return res.status(400).json({error:"No such user can be found."})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log("Password,Email or Name is not correct.");
         return res.status(400).json({error:"Password,Email or Name is not correct."})
    } 
    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });

});