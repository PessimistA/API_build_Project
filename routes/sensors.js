/**routes/sensors.js*/
const express = require('express');
const router = express.Router();
const cacheUserData = require('../middleware/cacheUserData');
const authenticateToken = require('../middleware/authenticate');/**Burada token doğrulama katmanım çalışır */
const { saveSensorData, getAllData, deleteSensorData ,searchSensorData,add} = require('../services/sensor');
const idempotency = require('../middleware/idempotency');
/**POST /api/sensor */ 
router.post('/',authenticateToken,cacheUserData,idempotency, saveSensorData);/**post ederken token kontrolü yapılır */
/** GET /api/sensor*/
router.get('/', authenticateToken,cacheUserData, getAllData);/**get yapılırken token kontrolü yapılır */
/** GET /api/sensor/:id*/
router.delete('/:id', authenticateToken, cacheUserData,deleteSensorData);/**delete yapılırken token kontrolü yapılrı */

/** GET /api/sensor/search?min=x&max=y*/
router.get('/search', authenticateToken,cacheUserData, searchSensorData);/**search yapılırken min ve max değerleri alınır */
module.exports = router;

