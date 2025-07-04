const SensorData = require('../models/sensor_model');

const saveSensorService = async ({ temperature }) => {
  const newRecord = new SensorData({
    temperature
  });

  await newRecord.save();
};

module.exports = {
  saveSensorService
};
