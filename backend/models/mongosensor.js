const mongoose = require('mongoose');
/**
 * @brief data şeması oluşturulur tutulacak verilerin tipleri belirlenir
 */
const temperatureSchema = new mongoose.Schema({
  userId: {/**@param userid alınan sıcaklık verisinde aktif kullanıcının id'si de kaydedilier */
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',/**referans olarak mongouser daki User şemasını alır */
    required: true
  },
  temperature: {/**@param temperature kullanıcının sıcaklık verisi sayı olarak tutulur int de olur float da */
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,/**@param date Zaman şu an alınır ama default olarak UTC kullanıldığından 3 saat eklenir*/
    default: () => {
    const now = new Date();
    now.setHours(now.getHours() + 3); 
    return now;
    }
  }
},{ collection: 'sensor' } );/**sensor koleksiyonunda bu veriler tutulur */

module.exports = mongoose.model('TemperatureData', temperatureSchema);