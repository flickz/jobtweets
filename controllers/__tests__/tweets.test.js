const { addTweet, getTweet, getTweetKeys, getTweets } = require('../tweets')
jest.mock('../../lib/redis')

const dummyTweet = {
  id: '1212',
  first_class: 'SD',
  second_class: 'DO'
}

describe('#addTweet()', () => {
  it('should add tweet to redis', async () => {
    const result = await addTweet(dummyTweet)
    expect(result).toHaveLength(2)
  })
})

describe('#getTweet()', () => {
  it('should return tweet with the key', async () => {
    const result = await getTweet('tweet:1')
    expect(result.id).toEqual(dummyTweet.id)
  })
})

describe('#getTweetKeys()', () => {
  it('should return list of keys within specified range', async () => {
    const results = await getTweetKeys(-1, 0)
    expect(results).toHaveLength(1)
  })
})

describe('#getTweets()', () => {
  it('should return list of tweets within specified range', async () => {
    const results = await getTweets(-1, 0)
    expect(results).toHaveLength(1)
  })
})
