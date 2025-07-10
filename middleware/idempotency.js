// middleware/idempotency.js
const usedKeys = new Set();

module.exports = (req, res, next) => {
  const key = req.headers['idempotency-key'];
  if (!key) return res.status(400).json({ message: 'Idempotency-Key gerekli' });

  if (usedKeys.has(key)) {
    return res.status(409).json({ message: 'Bu işlem zaten yapıldı' });
  }

  usedKeys.add(key);
  next();
};
