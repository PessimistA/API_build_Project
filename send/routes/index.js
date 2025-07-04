const express = require('express');
const router = express.Router();

const authRoutes = require('./user');
const sensorRoutes = require('./sensor');

router.use('/user', userRoutes);
router.use('/sensor', sensorRoutes);

module.exports = router;