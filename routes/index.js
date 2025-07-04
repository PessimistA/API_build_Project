const express = require('express');
const router = express.Router();

const userRoutes = require('./user');     // ✔️ doğru isim
const sensorRoutes = require('./sensor');

router.use('/user', userRoutes);          // ✔️ burada da doğru kullanılmalı
router.use('/sensor', sensorRoutes);

module.exports = router;
