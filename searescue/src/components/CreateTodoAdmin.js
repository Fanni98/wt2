import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { CirclePicker } from 'react-color';
import { connect } from 'react-redux';

import SelectCustom from './SelectCustom';
import {SetDefaultUserData} from '../adapters/user/actions'

  
class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        task: '',
        date: '',
        expirationDate: '',
        todos: [],
        todo:{},
        user:{},
        background:'',
        order:'',
        selectedUser: {},
        users: []
      
    };
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


  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };
  
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

    onSubmit = e => {
        e.preventDefault();

        const data = {
            title: this.state.title,
            task: this.state.task,
            date: this.state.date,
            expirationDate: this.state.expirationDate,
            background: this.state.background,
            order: this.state.order,
            userId: this.state.selectedUser._id,
            userName:this.state.selectedUser.name
 
            
        };
        

        axios
            .post('http://localhost:8082/api/todos',  data)
            .then(res => {
                this.setState({
                title:'',
                task:'',
                date:'',
                expirationDate: '',
                background:'',
                order:'',
                selectedUser: {},
                })

                this.props.history.push('/todos');
                
            })
            .catch(err => {
                console.log("Error in CreateTodo!");
            })
            
    } 
    
  
    componentDidMount() {
        console.log(this.props.user.data)
        axios
            .get('http://localhost:8082/api/users')
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
            .catch(err =>{
                console.log('Error from ShowUserList');
             })
    }

 
    render() {
        const users = this.state.users;
       

        return (
            
        
        <div className="App-header">
            
            <div className="container">
                <div className="row">
                    
                    <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Feladat hozzáadás</h1>
                    <br />

                    <form noValidate onSubmit={this.onSubmit}>
                
                        <div className='form-group'>
                        <input
                            type='text'
                            name='title'
                            placeholder='Cím'
                            className='form-control'
                            value={this.state.title}
                            onChange={this.onChange}
                        />
                        <hr />
                        <input
                            type='text'
                            name='task'
                            placeholder='Feladat'
                            className='form-control'
                            value={this.state.task}
                            onChange={this.onChange}
                        />
                        <hr />
                        <label>Létrehozási dátum:</label>
                        <input
                            type='date'
                            name='date'
                            className='form-control'
                            value={this.state.date}
                            onChange={this.onChange}
                        />
                        <hr />
                        <label>Lejárati dátum:</label>
                        <input
                            type='date'
                            name='expirationDate'
                            className='form-control'
                            value={this.state.expirationDate}
                            onChange={this.onChange}
                        />
                        <hr />
                        <CirclePicker
                            color={ this.state.background }
                            onChange={ this.handleChangeComplete }
                            name= 'background'
                            
                        />
                       <hr />
                       <SelectCustom list={users}
                            value={this.state.selectedUser}
                            onChange={this.onChange}/>
                        </div>
 
                        <hr />
                        <input
                            type="submit"
                            value="+"
                            className="btn btn-outline-warning btn-block btn-lg"
                        />
                        <Link to="/auth" className="btn btn-primary btn-block btn-lg">
                            Mégse
                        </Link>
                    </form>
                </div>
            </div>
            <br />
            </div>
 
            
        </div>
        
        );
    }
}
export default connect(store => ({
    user: store.user
  }))(CreateTodo)
