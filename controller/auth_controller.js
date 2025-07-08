const mongoose = require('mongoose');
const User = require('../models/mongouser');
const bcrypt = require('bcryptjs');

/**
 * @brief finduserbyEmail email ile user'ın bulunmasını sağlar.
 * @param email email değeri alınır
 * @return kullanıcı nesnesi ya da null döner
 */
async function findUserByEmail(email) {
    return await User.findOne({ email });
}
/**
 * @brief comparePasswords hash ile kaydedilmiş şifre ile login sırasındaki şifreyi hashleyip karşılar.
 * @param plain login sırasında alınan
 * @param hash mongo da kayıtlı olan
 * @return kullanıcı nesnesi ya da null döner
 */
async function comparePasswords(plain, hash) {
    return await bcrypt.compare(plain, hash);
}
/**
 * @brief hashPassword ile hashleme yapılır
 * @param password girilen şifreyi 10 salt round ile hashler
 * @return kullanıcı nesnesi ya da null döner
 */
async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}
/**
 * @brief createUser yeni bir user ın özelliklerinin modelde belirtildiği gibi oluşturulmasını onu da mongoya kaydetmesini sağlar
 * @param email email kaydedilir
 * @param name isim kaydedilir
 * @param hashedPassword şifre hashlenerek kaydedilir
 * @return kullanıcı nesnesi ya da null döner
 */
async function createUser(email, name, hashedPassword) {
    const newUser = new User({ email, name, password: hashedPassword });
    return await newUser.save();
}
/**
 * @brief eleteUserByEmail email ile user'ın silinmesi sağlanır bulunmasını sağlar.
 * @param email email değeri alınır
 * @return kullanıcı nesnesi ya da null döner
 */
async function deleteUserByEmail(email) {
    return await User.deleteOne({ email });
}
/**
 * @brief addSensorToUser userdaki sensors array kısmına yeni sensorId eklenmesini sağlar
 * @param email email değeri alınır
 * @return kullanıcı nesnesi ya da null döner
 */
async function addSensorToUser(userId, sensorId) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.sensors.push(new mongoose.Types.ObjectId(sensorId));
  await user.save();
}



module.exports = {
    findUserByEmail,
    comparePasswords,
    hashPassword,
    createUser,
    deleteUserByEmail,
    addSensorToUser
};
