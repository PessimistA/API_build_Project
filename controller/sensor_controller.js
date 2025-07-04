const SensorData = require('../models/mongosensor');

const saveSensorService = async ({ temperature }) => {
  const newRecord = new SensorData({
    temperature
  });

  await newRecord.save();
};

const getAllSensorData = async (req, res) => {

    const data = await SensorData.find().sort({ timestamp: -1 });
    console.log("Sensor verileri:", data); 
    return data;
};
module.exports = {
  saveSensorService,
  getAllSensorData
};
