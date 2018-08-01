const { isEmpty } = require('lodash')
const logger = require('../lib/logger')()
const { RedisClient } = require('../lib/redis')

const redis = RedisClient()
const listKey = 'tweets'

exports.addTweet = async function (tweet) {
  let tweetId
  try {
    tweetId = await redis.incr('tweet_id')
  } catch (err) {
    logger.error(`Error incrementing tweet in redis`)
    logger.error(err)
    return err
  }
  const hashKey = `tweet:${tweetId}`
  return redis.multi().hmset(hashKey, tweet).rpush(listKey, hashKey).exec()
}

exports.getTweet = async function (key) {
  return redis.hgetall(key)
}

exports.getTweetKeys = async function (start, stop) {
  return redis.lrange(listKey, start, stop)
}

const getTweets = async function (start, stop) {
  const tweets = []
  const tweetKeys = await redis.lrange(listKey, start, stop)
  if (tweetKeys.length >= 1) {
    for (let i = 0; i < tweetKeys.length; i++) {
      const key = tweetKeys[i]
      const tweet = await redis.hgetall(key)

      if (isEmpty(tweet) === false) {
        tweets.push(tweet)
      }
    }
    return tweets
  }
  return tweets
}

exports.get = async function (req, res) {
  const page = parseInt(req.query.page)

  function getRange (page) {
    const from = page * 10
    const to = (page + 1) * 10
    return [from, to]
  }

  const [from, to] = getRange(page)

  try {
    const tweets = await getTweets(from, to)
    if (tweets) {
      res.status(200).send(tweets)
      return
    }
    return res.status(204).send()
  } catch (err) {
    console.error(`Error occur from getting tweets in range (${from}-${to}`)
    console.error(err)
    res.status(400)
  }
}
