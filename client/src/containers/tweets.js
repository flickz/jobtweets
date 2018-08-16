import React from 'react'
import { fetchTweets } from '../util/fetch'
import Preloader from '../components/Preloader'
import EmbededTweet from '../components/Tweet'

export default class Tweets extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fetching: true,
      tweets: [],
      page: 0
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScrollEvent)
    this.fetchNextTweets()
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScrollEvent)
  }

  updateTweetsList (newTweets) {
    const { tweets } = this.state
    this.setState({
      tweets: [...tweets, ...newTweets]
    })
  }

  setFetchingState (fetching) {
    this.setState({
      fetching
    })
  }

  updateTweetsPage (page) {
    this.setState({
      page
    })
  }

  async fetchNextTweets () {
    this.setFetchingState(true)
    const tweets = await fetchTweets(this.state.page)
    if (tweets) {
      this.updateTweetsList(tweets)
      this.setFetchingState(false)      
      this.setState((prevState, props) => ({
        page: prevState.page + 1
      }))
    }
  }

  handleScrollEvent = (event) => {
    const { fetching } = this.state
    const windowHeight = window.innerHeight
    const scrollVerticalPos = window.scrollY
    const contentHeight = document.body.offsetHeight
    if ((windowHeight + scrollVerticalPos) >= (contentHeight)) {
      if (!fetching) {
        this.fetchNextTweets()
          .catch(error => {
            throw error
          })
      }
    }
  }

  render () {
    const { tweets, fetching } = this.state

    return (
      <div className="content">
        <EmbededTweet tweets={tweets} fetching={fetching} />
      </div>
    )
  }
}
