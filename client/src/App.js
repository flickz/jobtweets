import React, { Component } from 'react';
import Tweets from './containers/tweets';
import Header from './components/header'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header/> 
        <Tweets/>      
      </div>
    );
  }
}

export default App;
