const winston = require('winston')

module.exports = function () {
  const myLogTransports = []

  switch (process.env.NODE_ENV) {
    case 'production':
      myLogTransports.push(new (winston.transports.Console)({ level: 'info' }))
      break
    case 'test':
      myLogTransports.push(new (winston.transports.Console)({ level: 'debug' }))
      break
    default:
      // Dev environments, usually
      myLogTransports.push(new (winston.transports.Console)({ level: 'debug' }))
      break
  }

  let logger = winston.createLogger({
    transports: myLogTransports
  })

  return logger
}
