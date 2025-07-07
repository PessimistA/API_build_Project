const mongoose = require('mongoose');

const temperatureSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  temperature: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: () => {
    const now = new Date();
    now.setHours(now.getHours() + 3); // UTC+3 saat ekle
    return now;
    }
  }
},{ collection: 'sensor' } );

module.exports = mongoose.model('TemperatureData', temperatureSchema);