const mongoose = require('mongoose');/**@brief sadece 1 tane yeterli Database' e bağlanma burada*/

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {/**@brief .env de verilen database'e bağlanır */
      useNewUrlParser: true,/**@param useNewUrlParser  MongoDB bağlantı URI'sini ayrıştırmak için yeni URL parser kullanılmasını sağlar.*/
      useUnifiedTopology: true,/**@param useNewUrlParser  MongoDB sürücüsünde kullanılan yeni “topoloji motorunu” etkinleştirir.*/
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;