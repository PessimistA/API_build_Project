const redisClient = require('../loaders/redisClient');

async function cacheUserData(req, res, next) {
  if (req.user && req.headers['authorization']) {
    const token = req.headers['authorization'].split(' ')[1];
    const userData = JSON.stringify({
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      
      lastSeen: new Date().toISOString(),
    });

    try {
      await redisClient.set(`user_token_${token}`, userData, 'EX', 1800);
    } catch (err) {
      console.error('Redis set hatası:', err);
      // Redis hatası uygulamayı durdurmasın, devam etsin
    }
  }
  next();
}

module.exports = cacheUserData;
