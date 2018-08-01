require('dotenv').config()
const util = require('util')
const express = require('express')
const logger = require('morgan')
const Twitter = require('twitter')
const cors = require('cors')
const socket = require('socket.io')
const { Server } = require('http')
const controllers = require('./controllers')
const { classifyTweetWithBayes } = require('./lib/classifier')

const classifyTweet = util.promisify(classifyTweetWithBayes)
const app = express()
const server = Server(app)
const io = socket(server)

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

app.use(cors())
app.use(logger('dev'))
app.get('/api/v1/tweets', controllers.tweets.get)

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

const searchOptions = {
  track: 'we are hiring, looking for interns, vacancy, we have job available',
  filter_level: 'low'
}

const stream = client.stream('statuses/filter', searchOptions)

stream.on('error', (error) => {
  console.error('Twitter error occoured..', error)
})

io.on('connection', (socket) => {
  socket.on('error', (error) => {
    console.error('New socket Error', error)
  })
})

// stream.on('data', async (data) => {
//   const tweet = {}
//   if (data.lang === 'en') {
//     try {
//       const classifications = await classifyTweet(data.text)
//       tweet['id'] = data.id_str
//       tweet['first_class'] = classifications[0]
//       tweet['second_class'] = classifications[1]
//       const result = await controllers.addTweet(tweet)
//     } catch (err) {
//       logger.error(err)
//     }
//   }
// })

server.listen(process.env.PORT || 8080, () => console.log('Server listening...'))
