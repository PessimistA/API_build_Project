/**routes/sensors.js*/
const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/authenticate');/**Burada token doğrulama katmanım çalışır */
const { saveSensorData, getAllData, deleteSensorData ,searchSensorData,add} = require('../services/sensor');
/**POST /api/sensor */ 
router.post('/', authenticateToken, saveSensorData);/**post ederken token kontrolü yapılır */
/** GET /api/sensor*/
router.get('/', authenticateToken, getAllData);/**get yapılırken token kontrolü yapılır */
/** GET /api/sensor/:id*/
router.delete('/:id', authenticateToken, deleteSensorData);/**delete yapılırken token kontrolü yapılrı */

/** GET /api/sensor/search?min=x&max=y*/
router.get('/search', authenticateToken, searchSensorData);/**search yapılırken min ve max değerleri alınır */
module.exports = router;

