const { validateSensorData } = require('../validators/sensorValidator');
const { saveSensorservice } = require('../controller/sensor_controller');
const saveSensorData = async (req, res) => {
  try {
    validateSensorData(req.body); 
    await saveSensorData(req.body);

    res.status(201).json({ message: 'Veri başarıyla kaydedildi.' });
  } catch (error) {
    if (error.message === 'Missing value sent') {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: 'Internal error' });
  }
};

module.exports = {
  saveSensor
};