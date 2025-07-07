// routes/sensors.js
const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/authenticate');
const { saveSensorData, getAllData, deleteSensorData ,searchSensorData,add} = require('../services/sensor');
// POST /api/sensor
router.post('/', authenticateToken, saveSensorData);
router.post('/', authenticateToken, add);
// GET /api/sensor
router.get('/', authenticateToken, getAllData);

router.delete('/:id', authenticateToken, deleteSensorData);


router.get('/search', authenticateToken, searchSensorData);
module.exports = router;

