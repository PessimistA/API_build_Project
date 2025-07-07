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
    default: Date.now
  }
},{ collection: 'sensor' } );

module.exports = mongoose.model('TemperatureData', temperatureSchema);