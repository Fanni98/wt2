import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { CirclePicker } from 'react-color';
import { connect } from 'react-redux';

import SelectCustom from './SelectCustom';
import SelectAnotherCustom from './SelectAnotherCustom';
import {SetDefaultUserData} from '../adapters/user/actions'

  
class CreateTodoAdmin extends Component {
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
        selectedUser2: {},
        users: []
      
    };
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
            userName:this.state.selectedUser.name,
            userId2: this.state.selectedUser2._id,
            userName2: this.state.selectedUser2.name
 
            
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
                selectedUser2: {}
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
                        <hr />
                        <SelectAnotherCustom list={users}
                            value={this.state.selectedUser2}
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
  }))(CreateTodoAdmin)