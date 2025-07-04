const mongoose = require('mongoose');

const temperatureSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: () => {
      const now = new Date();
      now.setHours(now.getHours() + 3); // UTC+3
      return now;
    }
  }
},{ collection: 'sensor' } );

module.exports = mongoose.model('TemperatureData', temperatureSchema);