let globalRequestCount = 0;
const GLOBAL_MAX = 1000;//arttırılabilir bu kadar az olması önerilmez

const globalLimiter = (req, res, next) => {
  if (globalRequestCount >= GLOBAL_MAX) {
    return res.status(429).json({ message: 'Sunucu çok yoğun, lütfen bekleyin.' });
  }
  globalRequestCount++;
  setTimeout(() => globalRequestCount--, 60 * 1000);
  next();
};
module.exports = globalLimiter;