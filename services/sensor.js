const { validateSensorData } = require('../validetors/sensorValidator');
const { saveSensorService ,getAllSensorData} = require('../controller/sensor_controller');
const { get } = require('mongoose');

const saveSensorData = async (req, res) => {
  try {
    validateSensorData(req.body); 
    await saveSensorService(req.body);

    res.status(201).json({ message: 'Data added successfully.' });
  } catch (error) {
    if (error.message === 'Missing value sent') {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: 'Internal error' });
  }
};
const getAllData = async (req, res) => {
  try {
    const data = await getAllSensorData(); // req.body gerekmez burada
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal error' });
  }
};

module.exports = {
  saveSensorData,
  getAllData
};
