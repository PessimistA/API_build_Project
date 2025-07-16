const Redis = require('ioredis');
require('dotenv').config();

const isDocker = process.env.IS_DOCKER === 'true';

const redisHost = isDocker ? process.env.REDIS_HOST_DOCKER : process.env.REDIS_HOST_LOCAL;
const redisPort = process.env.REDIS_PORT || 6379;

const redisClient = new Redis({
  host: redisHost,
  port: redisPort,
});

module.exports = redisClient;