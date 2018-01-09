import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadTweetStream} from '../actions';
import Preloader from '../components/preloader';
import EmbededTweet from '../components/tweet';

class Tweets extends Component{
  componentWillMount(){
    this.props.loadTweetStream();
  }

  render(){
    if(this.props.tweets.length === 0){
      return (<Preloader />); 
    }
    return (<EmbededTweet tweets={this.props.tweets} filters={this.props.filters} />);  
  }
}

function mapStateToProps({tweets, filters}){
  return {tweets, filters};
}

function mapDispatchToProps(dispatch){
  return{
    loadTweetStream: ()=>{
      dispatch(loadTweetStream());
    } 
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tweets);