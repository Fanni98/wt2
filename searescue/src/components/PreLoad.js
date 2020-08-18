import React, { Component } from 'react';
import { connect } from 'react-redux';
import {LoginUser} from '../adapters/user/actions'
import axios from 'axios';

class PreLoad extends Component {
  constructor() {
    super();

  }

  componentDidMount() {
        console.log('before',this.props)
    const data = {
        token: localStorage.token
    }
    axios
        .post('http://localhost:8082/api/users/token', data)
        .then(res => {
            this.props.dispatch(LoginUser(res.data))

            setTimeout(() => {
                this.props.parentClass.setState({isLoggedIn: true})
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