import React from 'react';
import {Tweet} from 'react-twitter-widgets';
import {union} from 'lodash';

export default ({tweets, filters})=>{
  if(filters.length > 0){
    tweets = tweets.filter((tweet)=>{
     return (filters.indexOf(tweet.classifications[0]) !== -1);
    });
  }
  
  if(tweets.length > 0){
    const embededTweets = tweets.map((tweet)=>{
      let id = tweet.id;
      return( 
        <div key={id}>
          <Tweet tweetId={id} />
        </div>);
    }); 
    return(
        <div className="col-sm-6 col-xs-12 col-md-6 offset-md-1">
          <p>"All tweets are real time"</p>
              {embededTweets}
        </div>
    );
  }
  return(
    <div className="col-sm-6 col-xs-12 col-md-6 offset-md-1">
      <h6>No Tweets Available at this time</h6>
    </div>
  );
}