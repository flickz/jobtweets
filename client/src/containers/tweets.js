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
      page: {
        currentPage: 0,
        nextPage: 0,
        totalPages: 0
      }
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
    const { currentPage, nextPage } = this.state.page
    this.setFetchingState(true)
    const tweets = await fetchTweets(nextPage)
    if (tweets) {
      this.updateTweetsList(tweets)
      this.setFetchingState(false)      
      this.updateTweetsPage({
        currentPage: nextPage,
        nextPage: currentPage + 1,
        totalPages: currentPage + 1
      })
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
      <React.Fragment>
        <EmbededTweet tweets={tweets} fetching={fetching} />
      </React.Fragment>
    )
  }
}
