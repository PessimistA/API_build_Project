app.set('trust proxy', 1);

const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 dakika
  max: 10, 
  message: 'Çok fazla istek, lütfen biraz bekleyin.'
});