import {combineReducers} from 'redux'
import {GET_TWEET_STREAM, ADD_FILTER, REMOVE_FILTER} from '../actions'

function tweetStream (state = [], action) {
  switch (action.type) {
    case GET_TWEET_STREAM:
      return [action.payload, ...state]
  }
  return state
}

function filtering (state = [], action) {
  switch (action.type) {
    case ADD_FILTER:
      return [action.payload, ...state]
    case REMOVE_FILTER:
      return state.filter(category => {
        action.payload !== category
      })
  }
  return state
}

export default combineReducers({
  tweets: tweetStream,
  filters: filtering
})
