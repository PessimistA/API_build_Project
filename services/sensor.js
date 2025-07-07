const { validateSensorData } = require('../validetors/sensorValidator');
const { saveSensorService ,getAllSensorData} = require('../controller/sensor_controller');
const { searchSensorByRange } = require('../controller/sensor_controller');
const { deleteSensorById } = require('../controller/sensor_controller');
const { findUserByEmail,comparePasswords,hashPassword,createUser,deleteUserByEmail,addSensorToUser } = require('../controller/auth_controller');
const { get } = require('mongoose');

const add = async (req, res) => {
  try {
    validateSensorData(req.body);

    const payload = {
      userId: req.user.userId,
      temperature: req.body.temperature,
    };

    const savedSensor = await saveSensorService(payload);
    const sensorId = savedSensor._id;

    await addSensorToUser(req.user.userId, sensorId);


    const userAfterUpdate = await User.findById(req.user.userId);
    console.log("Updated user sensors:", userAfterUpdate.sensors);

    res.status(201).json({ message: "Data added successfully.", id: sensorId });
  } catch (error) {
    if (error.message === "Missing value sent") {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal error" });
  }
};

const saveSensorData = async (req, res) => {
  try {
    validateSensorData(req.body); 
    const payload = {
      userId: req.user.userId,
      temperature: req.body.temperature
    };
      const savedSensor = await saveSensorService(payload);
    const sensorId = savedSensor._id;

    await addSensorToUser(req.user.userId, sensorId);
    res.status(201).json({ message: "Data added successfully.", id: sensorId });
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
    const data = await getAllSensorData(req.user.userId);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal error' });
  }
};
const deleteSensorData = async (req, res) => {
  try {
    const sensorId = req.params.id;
    const userId = req.user.userId;

    const deleted = await deleteSensorById(sensorId, userId);
    if (!deleted) {
      return res.status(404).json({ message: 'Kayıt bulunamadı veya yetkiniz yok.' });
    }

    res.status(200).json({ message: 'Kayıt silindi.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};


const searchSensorData = async (req, res) => {
  try {
    const min = parseFloat(req.query.min);
    const max = parseFloat(req.query.max);
    const userId = req.user.userId;

    const results = await searchSensorByRange(min, max, userId);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};
module.exports = {
  saveSensorData,
  getAllData,
  deleteSensorData,
  searchSensorData,
  add
};
