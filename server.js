require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/user'); 
const sensorRoutes = require('./routes/sensors');

const app = express();
app.use(express.json());

app.use('/api/sensor', sensorRoutes);
app.use('/api/auth', authRoutes);

console.log("API is ready");

const connectDB = require('./loaders/mongodb');

connectDB();

app.listen(process.env.PORT,()=> {
    console.log(`Server running on port ${process.env.PORT}`);
});