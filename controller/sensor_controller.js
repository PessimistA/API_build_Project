const SensorData = require('../models/mongosensor');

/**
 * @brief saveSensorService  sensor'e bilgi kayıdının yapıldığı yerdir
 * @param temperature sensörü sıcaklık ve kullanıcı id si ile kaydeder
 * @param userId sensörü kullanıcı id si ile kaydeder
 */

const saveSensorService = async ({ temperature ,userId}) => {
  const newRecord = new SensorData({
    temperature,
    userId
  });

  const saved = await newRecord.save();
  return saved; 
};
/**
 * @brief getAllSensorData get ile tüm bilgileri almamı sağlar
 * @param userId sensörü kullanıcı id si ile kaydeder
 */
const getAllSensorData = async (userId) => {
  return await SensorData.find({ userId }).sort({ timestamp: -1 });
};
/**
 * @brief deleteSensorById  sensor'u id ile silmeyi sağlar
 * @param temperature sensörü sıcaklık ve kullanıcı id si ile kaydeder
 * @param userId sensörü kullanıcı id si ile kaydeder
 */

const deleteSensorById = async (sensorId, userId) => {
  const result = await SensorData.deleteOne({ _id: sensorId, userId });
  return result.deletedCount > 0;
};
/**
 * @brief searchSensorByRange aranan bilgilerin hangi aralıkta olduğunun kararını veririz
 * @param min smin sınırı girere
 * @param max max sınırı girer
 * @param userId sensörü kullanıcı id si ile kaydeder
 */

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
