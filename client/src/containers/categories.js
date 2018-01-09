import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addFilter, removeFilter} from '../actions';
import SideBar from '../components/sidebar';

class Categories extends Component{
  constructor(){
    super();
    this.onCheck = (category)=>{
      let filters = this.props.filters;
      if(filters.indexOf(category) === -1){
        this.props.addFilter(category);
      }else{
        this.props.removeFilter(category);
      }
    } 
  }

  render(){
    return (<SideBar onCheck = {this.onCheck} />);
  }
}

function mapStateToProps(state){
  return {
    filters: state.filters
  };
}

function mapDispatchToProps(dispatch){
  return{
    addFilter: (category)=>{
      dispatch(addFilter(category));
    },
    removeFilter: (category)=>{
      dispatch(removeFilter(category));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Categories);