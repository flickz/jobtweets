const Redis = require('ioredis')

exports.RedisClient = function () {
  return new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST
  })
}
