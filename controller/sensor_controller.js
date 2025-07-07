const SensorData = require('../models/mongosensor');

const saveSensorService = async ({ temperature ,userId}) => {
  const newRecord = new SensorData({
    temperature,
    userId
  });

  const saved = await newRecord.save();
  return saved; 
};

const getAllSensorData = async (userId) => {
  return await SensorData.find({ userId }).sort({ timestamp: -1 });
};


const deleteSensorById = async (sensorId, userId) => {
  const result = await SensorData.deleteOne({ _id: sensorId, userId });
  return result.deletedCount > 0;
};


const searchSensorByRange = async (min, max, userId) => {
  const query = {
    userId,
    temperature: { $gte: min, $lte: max }
  };

  return await SensorData.find(query).sort({ timestamp: -1 });
};
module.exports = {
  saveSensorService,
  getAllSensorData,
  deleteSensorById,
  searchSensorByRange
};
