import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { CirclePicker } from 'react-color';
import { connect } from 'react-redux';


  
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
        userId:'',
        userName: ''
      
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
            userId: this.state.userId,
            userName:this.state.userName
 
            
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
                userId: '',
                userName: ''
                })

                this.props.history.push('/todos');
                
            })
            .catch(err => {
                console.log("Error in CreateTodo!");
            })

       
            
    } 
    
  
    componentDidMount() {
        console.log(this.props.user.data)
      
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
                         <input
                            type='text'
                            name='felhasználó'
                            placeholder='Felhasználó'
                            className='form-control'
                            value={this.state.userName}
                            onChange={this.onChange}
                        />
                        
                        </div>
                        
                        
                        <hr />
                        <input
                            type="submit"
                            value="+"
                            className="btn btn-outline-warning btn-block mt-4"
                        />
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