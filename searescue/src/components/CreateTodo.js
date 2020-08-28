import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import TodoCard from './TodoCard';
import { CirclePicker } from 'react-color';
import { connect } from 'react-redux';
import Admin from './Admin';
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
        userId:'',
        userName: '',
        admin: '',
       
        
        hoverItemId: null,
        grabedItemId: null
      
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
            userId: this.props.user.data._id,
            userName:this.props.user.data.name,
            admin:this.props.user.data.admin
 
            
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
                userName: '',
                admin:''
                })
                this.getTodos()
            })
            .catch(err => {
                console.log("Error in CreateTodo!");
            })

       
            
    } 

    getTodos() {
        let url = 'http://localhost:8082/api/todos/user/'
        if(this.props.user.data != null && this.props.user.data._id != undefined)  {
            url += this.props.user.data._id
        }
        axios
            .get(url)
            .then(res => {
                let todos = res.data.map((todo,todoIndex)=>{
                    return {...todo, order: todoIndex}
                })
                console.log(res.data)
                
                this.setState({
                    todos
                    
                })
            })
            .catch(err =>{
                console.log('Error from ShowTodoList');
            })
    }
    
  
    componentDidMount() {
        this.getTodos()
        console.log(this.props.user.data)
      
    }
    

    onDragStart(event) {
        event
            .dataTransfer
            .setData('text/plain', event.target.id);
        this.setState({
            grabedItemId: event.target.id
        })
        event
            .currentTarget
            .style
            .backgroundColor = 'yellow';
        //console.log('onDragStart',event.target.id)
    }

    onDragOver(event) {
        if(event.target.id == '' || event.target.id == this.state.grabedItemId || this.state.grabedItemId == null ) return false
        this.setState({hoverItemId: event.target.id})
        event.preventDefault();
    }

    onDrop(event) {
        let tmpTodos = []
        this.state.todos.forEach(item=>{
            if(item._id != this.state.grabedItemId) {
                if(item._id == this.state.hoverItemId) {
                    let selectedTodoItem = this.state.todos.find(todo =>{ return todo._id == this.state.grabedItemId}) 
                    tmpTodos.push(selectedTodoItem)
                }
                tmpTodos.push(item)
            }
        })
        this.setState({todos: tmpTodos})
    }

 
    render() {
        const todos = this.state.todos;
        const user = this.state.user;

        const isAdmin= this.props.user.data.admin;
        if (isAdmin == true){
            return <Admin />
        }
        
        let todoList;

        if(todos.length == 0) {
            //todoList = "there is no todo record!";
        } else {
            //todos.sort((a, b) => (a.order > b.order) ? 1 : -1)
            todoList = todos.map((todo, k) =>
            <TodoCard 
                todo={todo}
                key={k}
                onDragStart={this.onDragStart.bind(this)}
                onDragOver={this.onDragOver.bind(this)}
            />
        );
        }

        return (
        
        <div className="Create">
            
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                    <br />
                        <div className="col-md-6">
                            <Link to={`/show-user/${user._id}`} className="btn btn-primary btn-lg btn-block">
                                Profilom
                            </Link>
                            <br />
                            <Link to="/logout" className="btn btn-danger btn-lg btn-block">
                                Kijelentkezés
                            </Link>                         
              
                            <br />
                        </div>
                    </div>
                    <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Feladatok</h1>
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
                        
                        </div>
                        <hr />
                        <input
                            type="submit"
                            value="+"
                            className="btn btn-outline-warning btn-block btn-lg"
                        />
                    </form>
                </div>
            </div>
            <br />
            </div>
            <div className="ShowList">
                <div className="container">
                    <div className="list" onDrop={this.onDrop.bind(this)} >
                        {todoList}
                    </div> 
                </div>
            </div>
        </div>
        
        );
    }
}
export default connect(store => ({
    user: store.user
  }))(CreateTodo)
