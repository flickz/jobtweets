import React from 'react';
import {union} from 'lodash';
import {Tweet} from 'react-twitter-widgets';

export default ({tweets})=>{
  const unionTweetsId = union(tweets);  
  const embededTweets = unionTweetsId.map((id)=>{
    return(
      <div key={id}>
        <Tweet tweetId={id} />
      </div>);
  });

  return(
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
        <p>"All tweets are real time"</p>
            {embededTweets}
        </div>
      </div>
    </div>
  );
}