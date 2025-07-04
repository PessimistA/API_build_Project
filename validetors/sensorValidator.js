const express = require('express');
const app = express();

app.use(express.json()); 

const validateSensorData = ({ temperature }) => {
  if (temperature == null ) {
    throw new Error('Missing value sent');
  }
};
module.exports = {
  validateSensorData
};
