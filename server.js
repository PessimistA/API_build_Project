require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const sensorRoutes = require('./routes/sensors');
const connectDB = require('./loaders/mongo');

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/sensors', sensorRoutes);
console.log("başarılı");

connectDB(); 

app.listen(process.env.PORT,()=> {
    console.log(`Server running on port ${process.env.PORT}`);
});