import React  from 'react'
import Tweets from '../containers/tweets'
import Header from './Header'
// import Categories from './containers/categories'
import './styles/App.css'

export default class App extends React.PureComponent {
  render () {
    return (
      <React.Fragment>
        <Header />
        <Tweets />
      </React.Fragment>  
    )
  }
}

