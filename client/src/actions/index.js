import stream from '../fetch'

export const GET_TWEET_STREAM = 'GET_TWEET_STREAM'
export const ADD_FILTER = 'ADD_FILTER'
export const REMOVE_FILTER = 'REMOVE_FILTER'

export function getTweetStream (tweets) {
  return {
    type: GET_TWEET_STREAM,
    payload: tweets
  }
}

export function addFilter (category) {
  return {
    type: ADD_FILTER,
    payload: category
  }
}

export function removeFilter (category) {
  return {
    type: REMOVE_FILTER,
    payload: category
  }
}

export function loadTweetStream () {
  return (dispatch) => {
    stream.on('tweet', (data) => {
      dispatch(getTweetStream(data))
    })
  }
}
