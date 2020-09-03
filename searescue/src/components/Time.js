import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Time extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            remaingTime: 0,
            isStopped: false
        }

        this.time = null;

        this.events = [
        "load",
        "mousedown",
        "click",
        "scroll",
        "keypress"
        ];
        
        this.resetTimeout = this.resetTimeout.bind(this);
    }

    resetTimeout() {
        localStorage.logoutTime = Date.now() + 300000
    }
 
    timer() {
        this.time = setInterval(() => {
            if(this.state.isStopped == true) {
                return this.stop()
            }
            const logutTime = parseInt(localStorage.logoutTime)
            let remaingTime = logutTime - Date.now()
            if(remaingTime <= 0) {
                this.stop()
                return window.location = '/logout';
            
            }
            remaingTime -= 1000
            
            this.setState({remaingTime})
        }, 1000)
    }

    componentDidMount() {
        this.timer()
        for (var i in this.events) {
            window.addEventListener(this.events[i], this.resetTimeout, true);
        }
    }

    componentWillUnmount() {
        this.stop()
        for (var i in this.events) {
            window.removeEventListener(this.events[i], this.resetTimeout, true);
        }
    }

    stop() {
        clearInterval(this.time)
        this.setState({isStopped: true})
    }
   

    calculateTime() {
        const minutes = Math.floor((this.state.remaingTime % (1000 * 60 * 60)) / (1000 * 60)) // 10000 milis, 10000 * 60
        const seconds = Math.floor((this.state.remaingTime % (1000 * 60)) / 1000)
        return `${minutes.length == 1 ? `0${minutes}` : minutes}:${seconds.length == 1 ? `0${seconds}` : seconds}`
    }
 
    render() {
        if(this.props.isLoggedIn == false) return ''
        return <div className="time">{this.calculateTime()}</div>
        
    }
        
}
export default connect(store => ({
    user: store.user
}))(Time)
  
