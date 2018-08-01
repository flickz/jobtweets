const Redis = require('ioredis-mock')

exports.RedisClient = function () {
  return new Redis()
}
