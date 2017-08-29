import stream from '../fetch';
export const GET_TWEET_STREAM = 'GET_TWEET_STREAM';

export function getTweetStream(tweets){
  return {
    type: GET_TWEET_STREAM,
    payload: tweets
  }
}

export function loadTweetStream(){
  return (dispatch)=>{ 
    stream.on('tweet', (data)=>{
      dispatch(getTweetStream(data.id_str));
    });
  }
}
