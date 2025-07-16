const mongoose = require('mongoose'); /**@brief sadece 1 tane yeterli Database' e bağlanma burada*/

const connectDB = async () => {
  try {
    const mongoURI = process.env.IS_DOCKER === 'true'
      ? process.env.MONGO_URI_DOCKER
      : process.env.MONGO_URI;

    await mongoose.connect(mongoURI, { /**@brief .env de verilen database'e bağlanır */
      useNewUrlParser: true, /**@param useNewUrlParser  MongoDB bağlantı URI'sini ayrıştırmak için yeni URL parser kullanılmasını sağlar.*/
      useUnifiedTopology: true, /**@param useUnifiedTopology  MongoDB sürücüsünde kullanılan yeni “topoloji motorunu” etkinleştirir.*/
    });

    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
