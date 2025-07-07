// routes/sensors.js
const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/authenticate');
const { saveSensorData, getAllData, deleteSensorData ,searchSensorData} = require('../services/sensor');
// POST /api/sensor
router.post('/', authenticateToken, saveSensorData);

// GET /api/sensor
router.get('/', authenticateToken, getAllData);

router.delete('/:id', authenticateToken, deleteSensorData);


router.get('/search', authenticateToken, searchSensorData);
module.exports = router;

