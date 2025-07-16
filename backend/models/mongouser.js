const mongoose = require('mongoose');


/**
 * @brief User şeması oluşturulur tutulacak verilerin tipleri belirlenir
 */
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },/**@param email kullanıcının emaili burada string olarak tutulur */
  name: { type: String, required: true },/**@param name kullanıcının ismidir */
  password: { type: String, required: true },/**@param password kullanıcının şifresi servis katmanında hashlenerek buraya gönderilir*/
  sensors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TemperatureData' }]/**@param sensors kullanıcının girdiği verilerin id'si burada dizi olarak tutulur */
}, { collection: 'user' });/**@brief hangi collection a ekleneceği belirtilir*/


const User = mongoose.model('User', userSchema);/**eklenirken nereye ekleneceği bilinsin diye export edilir */

module.exports = User;