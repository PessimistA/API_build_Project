const { validateSensorData } = require('../validetors/sensorValidator');
const { saveSensorService ,getAllSensorData} = require('../controller/sensor_controller');
const { searchSensorByRange } = require('../controller/sensor_controller');
const { deleteSensorById } = require('../controller/sensor_controller');
const { findUserByEmail,comparePasswords,hashPassword,createUser,deleteUserByEmail,addSensorToUser,deletesensorfromUser } = require('../controller/auth_controller');
const { get } = require('mongoose');


/**
 * @brief saveSensorData sensörden gelen bilgileri giriş yapmış kişinin id numrası ile kaydeder
 * @param req json formatında aldığı request
 * @param res json formatında karşıya verilen respond
 */

const saveSensorData = async (req, res) => {
  try {
    validateSensorData(req.body); /**< önce data eksik mi diye kontrol edilir*/
    const payload = {/**< payload oluşturulur ve data ile ilgili bilgiler buraya yazılır*/
      userId: req.user.userId,
      temperature: req.body.temperature
    };
      const savedSensor = await saveSensorService(payload);/**< Controllerdaki kaydetme servisi kullanılır*/
    const sensorId = savedSensor._id;

    await addSensorToUser(req.user.userId, sensorId);/**<Userda oluşturulmuş array kısmına eklenen bu bilginin id'si eklenir */
    res.status(201).json({ message: "Data added successfully.", id: sensorId });
  } catch (error) {
    if (error.message === 'Missing value sent') {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: 'Internal error' });
  }
};

/**
 * @brief getAllData sensörden gelen tüm bilgileri çağırmak için kullanılır login yapan kişinin id'si ile çağrılır
 * @param req json formatında aldığı request
 * @param res json formatında karşıya verilen respond
 */
const getAllData = async (req, res) => {/**Get ile kullanılan fonksiyon */
  try {
    const data = await getAllSensorData(req.user.userId);/**controllerda bulunan fonksiyonu kullanır */
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal error' });
  }
};
/**
 * @brief deleteSensorData sensörün silindiği fonksiyondur sensör id'si ile silinir
 * @param req json formatında aldığı request
 * @param res json formatında karşıya verilen respond
 */
const deleteSensorData = async (req, res) => {
  try {
    const sensorId = req.params.id;
    const userId = req.user.userId;

    const deleted = await deleteSensorById(sensorId, userId);
    if (!deleted) {
      return res.status(404).json({ message: 'Kayıt bulunamadı veya yetkiniz yok.' });
    }

    await deletesensorfromUser(userId,sensorId);
    res.status(200).json({ message: 'Kayıt silindi.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

/**
 * @brief searchSensorData belirli bir aralık verildiği ve sonra bu aralıktaki değerlerin arandığı fonksiyondur
 * @param req json formatında aldığı request
 * @param res json formatında karşıya verilen respond
 */
const searchSensorData = async (req, res) => {
  try {
    const min = parseFloat(req.query.min);/**@param min aldığım requestteki min ile belirttiğim değer  */
    const max = parseFloat(req.query.max);/**@param max aldığım requestteki max ile belirttiğim değer  */
    const userId = req.user.userId;

    const results = await searchSensorByRange(min, max, userId);/**Aralıktaki tüm değerleri Get ettiğim fonskiyondur */
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
  searchSensorData
};
