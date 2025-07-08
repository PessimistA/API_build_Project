const express = require('express');
const app = express();


/**
 * @brief sensor değerinin doğrulandığı kısım.
 * @param temperature kullanıcının post ettiği sıcaklık değeri
 */
app.use(express.json()); 

const validateSensorData = ({ temperature }) => {/**< girilen temperature datasını eksik olup olmadığını kontrol eder*/
  if (temperature == null ) {
    throw new Error('Missing value sent');
  }
};
module.exports = {
  validateSensorData/**< bu fonksiyonu kullanılabilir şekilde tanımlar*/
};
