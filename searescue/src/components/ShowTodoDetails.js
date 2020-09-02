import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class showTodoDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: {},
      
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8082/api/todos/'+ this.props.match.params.id)
      .then(res => {
        // console.log("Print-showTodoDetails-API-response: " + res.data);
        this.setState({
          todo: res.data
        })
      })
      .catch(err => {
        console.log("Error from ShowTodoDetails");
      })
  };

  onDeleteClick () {
    axios
      .delete('http://localhost:8082/api/todos/'+ this.props.match.params.id)
      .then(res => {
        this.props.history.push("/auth");
      })
      .catch(err => {
        console.log("Error form ShowTodoDetails_deleteClick");
      })
  };



  render() {

    const todo = this.state.todo;
    let TodoItem = <div>
      <table className="table table-hover table-dark">
        <tbody>
        <tr>
            <td>Cím</td>
            <td>{ todo.title }</td>
          </tr>
          <tr>
            <td>Feladat</td>
            <td>{ todo.task }</td>
          </tr>
          <tr>
            <td>Létrehozási dátum</td>
            <td>{ todo.date }</td>
          </tr>
          <tr>
            <td>Lejárati dátum</td>
            <td>{ todo.expirationDate }</td>
          </tr>
        </tbody>
      </table>
    </div>

    return (
      <div className="App-header">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <br /> <br />
              
            </div>
            <br />    
          </div>
          <div>
            { TodoItem }
          </div>
          <div className="row">
          <div className="col-md-6">
              <Link to={`/edit-todo/${todo._id}`} className="btn btn-outline-info btn-lg btn-block">
                    Módosít
              </Link>
              <br />
            </div>
            <div className="col-md-6">
                <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,todo._id)}>Töröl</button><br />
            </div>

          
            <Link to="/auth" className="btn btn-outline-warning btn-lg btn-block">
                  Mégse
              </Link>
                <br />
            
          </div>
        </div>
      </div>
    );
  }
}

export default showTodoDetails;