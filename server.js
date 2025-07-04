require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/user'); // rotayı düzgün yerleştirdiğine emin ol

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

console.log("API is ready");



app.listen(process.env.PORT,()=> {
    console.log(`Server running on port ${process.env.PORT}`);
});