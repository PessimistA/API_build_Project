require('dotenv').config();
const express = require('express');//express kütüphanesi kullanılır
const mongoose = require('mongoose');
const authRoutes = require('./routes/user'); //routers fonksiyonları kullanılır
const sensorRoutes = require('./routes/sensors');
const cors = require('cors');

const globalLimit = require('./middleware/globalLimit');


const app = express();

app.use(cors({
  origin: '-',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // eğer cookie/auth kullanıyorsan
}));

app.set('trust proxy', 1);
app.use(express.json());//requestleri json olarak parse eder

// Global limit
app.use(globalLimit);

app.use('/api/sensor', sensorRoutes);//yol belirtir yani 
app.use('/api/auth', authRoutes);

console.log("API is ready");

const connectDB = require('./loaders/mongodb');//mongo db nin komutu alınır

connectDB();//mongo db başlatılır
const port = process.env.PORT || 8080;
const server =app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
process.on('SIGINT', async () => {
  console.log('\nSIGINT sinyali alındı. Sunucu kapatılıyor...');
  await mongoose.disconnect();
  console.log('MongoDB bağlantısı kapatıldı.');
  server.close(() => {
    console.log('Sunucu kapandı.');
    process.exit(0);
  });
});
module.exports = app;//test' te kullanmak için export et