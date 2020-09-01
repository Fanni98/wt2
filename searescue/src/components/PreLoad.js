import React, { Component } from 'react';
import { connect } from 'react-redux';
import {LoginUser} from '../adapters/user/actions'
import axios from 'axios';
import {SetDefaultUserData} from '../adapters/user/actions'

class PreLoad extends Component {
  constructor() {
    super();
    

  }


  componentDidMount() {
        console.log('before',this.props)
    const data = {
        token: localStorage.token
    }
    console.log('aaaaaaaa')
    axios
        .post('http://localhost:8082/api/users/token', data)
        .then(res => {
            this.props.dispatch(LoginUser(res.data))
            console.log("Itt%");
            setTimeout(() => {
                this.props.parentClass.setState({isLoggedIn: true})
                console.log("passed!");
            }, 250);
        })
        .catch(err => {
            console.log("Error in preload!");
            //window.location.href = '/'
        })
  }

  render() {
    return (
        <div className="Create">
            loading...
        </div>
        );
    }
}
export default connect(store => ({
    user: store.user
}))(PreLoad)