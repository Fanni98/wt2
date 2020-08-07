import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TodoCard from './TodoCard';



class ShowTodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

 

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/todos')
      .then(res => {
        this.setState({
          todos: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowTodoList');
      })
  };
  


  render() {
    const todos = this.state.todos;
    console.log("PrintTodo: " + todos);
    let todoList;

    if(!todos) {
        todoList = "there is no todo record!";
    } else {
        todoList = todos.map((todo, k) =>
        <TodoCard todo={todo} key={k} />
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
              <Link to="/create-todo" className="btn btn-outline-warning float-right">
                +
              </Link>
              <br />
              <br />
              <hr />
            </div>

          </div>
          <div className="list">
                {todoList}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowTodoList;