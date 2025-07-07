const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  sensors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TemperatureData' }]
}, { collection: 'user' });


const User = mongoose.model('User', userSchema);

module.exports = User;