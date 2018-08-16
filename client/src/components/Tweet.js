import React from 'react'
import { Tweet } from 'react-twitter-widgets'
import ContentLoader from './Preloader'
import './styles/tweets.css'

export default ({tweets, fetching}) => {
  if (tweets.length > 0) {
    const embededTweets = tweets.map((tweet) => {
      let id = tweet.id
      return (
        <div key={id}>
          <Tweet tweetId={id} />
        </div>)
    })
  const loader = (fetching)? (<ContentLoader />) : ''
    return (
      <div className="tweets-wrapper">
        { embededTweets }
        { loader }
      </div>
    )
  } else {
    return (
    <div className="tweets-wrapper">
      <ContentLoader />
    </div>)
  }
}
