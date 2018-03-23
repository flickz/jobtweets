require('dotenv').config()
const express = require('express')
const Twitter = require('twitter')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const cors = require('cors')
const {BayesClassifier} = require('natural')

server.listen(process.env.PORT || 8080, () => { console.log('Server listening...') })

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(cors())
  app.use(express.static('client/build'))
}

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

  stream.on('data', function (data) {
    let tweet = {}
    if (data.lang === 'en') {
      classifyTweet(data.text).then((classifications) => {
        tweet['id'] = data.id_str
        tweet['classifications'] = classifications
        tweet['text'] = data.text
        socket.emit('tweet', tweet)
      }).catch(err => console.error(err))
    }
  })
})

stream.on('data', function (data) {
  let tweet = {}
  if (data.lang === 'en') {
    classifyTweet(data.text).then((classifications) => {
      tweet['id'] = data.id_str
      tweet['classifications'] = classifications
      tweet['text'] = data.text
      console.log(tweet)
      // socket.emit('tweet', tweet);
    }).catch(err => console.error(err))
  }
})

function classifyTweet (text) {
  return new Promise((resolve, reject) => {
    BayesClassifier.load('classifier.json', null, (err, classifier) => {
      if (err)reject(err)
      text = removeHash(text)
      let classifications = []
      let result = classifier.getClassifications(text)
      classifications.push(result[0].label); classifications.push(result[1].label)
      resolve(classifications)
    })
  })
}

const removeHash = (word) => {
  return word.replace(/#|RT|rt/g, '')
}
