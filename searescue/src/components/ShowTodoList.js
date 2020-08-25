import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TodoCardAdmin from './TodoCardAdmin';
import { connect } from 'react-redux';



class ShowTodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
         
      hoverItemId: null,
      grabedItemId: null
    };
  }

 

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/todos')
      .then(res => {
        this.setState({
          todos: res.data,
          
         
        })
        console.log(res.data)
        
      })
      .catch(err =>{
        console.log('Error from ShowTodoList');
      })
  };
  
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
    let todoList;

    if(!todos) {
        todoList = "there is no todo record!";
    } else {
        todoList = todos.map((todo, k) =>
        <TodoCardAdmin todo={todo} key={k}  
        onDragStart={this.onDragStart.bind(this)}
        onDragOver={this.onDragOver.bind(this)}/>
      );
    }

    return (
      <div className="ShowList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Feladatok listája</h2>
            </div>

            <div className="col-md-11">
              <Link to="/create" className="btn btn-outline-warning float-right">
                +
              </Link>
              <br />
              <br />
              <hr />
            </div>

          </div>
          <div className="ShowList">
                <div className="container">
                  <div className="list" onDrop={this.onDrop.bind(this)}>
                        {todoList}
                  </div>
                </div>
              </div>

        </div>
      </div>
    );
  }
}

export default connect(store => ({
  user: store.user
}))(ShowTodoList)

