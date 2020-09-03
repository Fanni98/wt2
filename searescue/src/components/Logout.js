import React, { Component } from 'react';
import { connect } from 'react-redux';

import {SetDefaultUserData} from '../adapters/user/actions'


class Logout extends Component {
  constructor() {
    super();
    
   
  }

  
  componentDidMount(){
    localStorage.removeItem('token')
    this.props.parentClass.setState({isLoggedIn: false})
    this.props.dispatch(SetDefaultUserData())
    this.props.history.push('/');
  }

  render() {
    return ''
  }
}
export default connect(store => ({
  user: store.user
}))(Logout)

