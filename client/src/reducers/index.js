import {combineReducers} from 'redux';
import {GET_TWEET_STREAM} from '../actions';

function tweetStream(state=[], action){
  switch(action.type){
    case GET_TWEET_STREAM:
      return [action.payload, ...state];
  }
  return state;
}

export default combineReducers({
  tweets: tweetStream
}); 