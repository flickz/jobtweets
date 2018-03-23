import React, { Component } from 'react'
import Tweets from './containers/tweets'
import Header from './components/header'
import Categories from './containers/categories'
import './App.css'

class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <Categories />
            <Tweets />
          </div>
        </div>
      </div>
    )
  }
}

export default App
