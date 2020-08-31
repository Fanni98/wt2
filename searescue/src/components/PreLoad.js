import React, { Component } from 'react';
import { connect } from 'react-redux';
import {LoginUser} from '../adapters/user/actions'
import axios from 'axios';
import {SetDefaultUserData} from '../adapters/user/actions'

class PreLoad extends Component {
  constructor() {
    super();
    this.events = [
        "load",
        "mousemove",
        "mousedown",
        "click",
        "scroll",
        "keypress"
      ];

      this.warn = this.warn.bind(this);
      this.logout = this.logout.bind(this);
      this.resetTimeout = this.resetTimeout.bind(this);
  
      for (var i in this.events) {
        window.addEventListener(this.events[i], this.resetTimeout);
      }
  
      this.setTimeout();

  }

  clearTimeout() {
    if (this.warnTimeout) clearTimeout(this.warnTimeout);

    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  }

  setTimeout() {
    this.warnTimeout = setTimeout(this.warn, 10 * 1000);

    this.logoutTimeout = setTimeout(this.logout, 30 * 1000);
  }

  resetTimeout() {
    this.clearTimeout();
    this.setTimeout();
  }

  warn() {
    alert("You will be logged out automatically in 1 minute.");
  }

  logout() {
    // Send a logout request to the API
    console.log("Sending a logout request to the API...");
    localStorage.removeItem('token')
    this.props.parentClass.setState({isLoggedIn: false})
    this.props.dispatch(SetDefaultUserData())
    this.props.history.push('/');
    // this.destroy(); // Cleanup
  }

  destroy() {
    this.clearTimeout();

    for (var i in this.events) {
      window.removeEventListener(this.events[i], this.resetTimeout);
    }
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