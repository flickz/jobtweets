import io from 'socket.io-client/lib'
import { STREAM_SOCKET_URL, API_BASE_URL } from './config'

export const stream = io(STREAM_SOCKET_URL)

stream.on('error', (error) => {
  console.log('Error occoured..', error)
})

function receiveTweetsData (data) {
  console.log(data)
}

function handleFetchError (error) {
  console.log(error)
}

export const fetchTweets = (page) => {
  const url = `${API_BASE_URL}/tweets?page=${page}`
  return window.fetch(url)
    .then((response) => {
      if(!response.ok) {
        throw response
      }
      return response.json()
    })
    .catch(handleFetchError)
}
