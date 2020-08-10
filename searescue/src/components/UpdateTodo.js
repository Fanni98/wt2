import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { connect } from 'react-redux';

class UpdateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      task: '',
      date: '',
      expirationDate: ''
    };
  }

  getTodos(){
    console.log(this.state.user)
    axios
    .get('http://localhost:8082/api/todos/'+this.props.match.params.id)
    .then(res => {
      // this.setState({...this.state, todo: res.data})
      this.setState({
        title: res.data.title,
        task: res.data.task,
        date: res.data.date,
        expirationDate: res.data.expirationDate
      })
    })
    .catch(err => {
      console.log("Error from UpdateTodo");
    })
  }

  componentDidMount() {
   this.getTodos()
   console.log(this.props.user.data)
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      title: this.state.title,
      task: this.state.task,
      date: this.state.date,
      expirationDate: this.state.expirationDate
    };

    axios
      .put('http://localhost:8082/api/todos/'+this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/auth/');
        this.getTodos()
    })
      .catch(err => {
        console.log("Error in UpdateTodo!");
      })
  };


  render() {
    return (
      <div className="App-header">
        <div className="container">
          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
            <input
                type='text'
                placeholder='Cím'
                name='title'
                className='form-control'
                value={this.state.title}
                onChange={this.onChange}
              />
              <hr />
              <input
                type='text'
                placeholder='Feladat'
                name='task'
                className='form-control'
                value={this.state.task}
                onChange={this.onChange}
              />
              <hr />
              <input
                type='date'
                placeholder='Dátum'
                name='date'
                className='form-control'
                value={this.state.date}
                onChange={this.onChange}
              />
               <hr />
              <input
                type='date'
                placeholder='Lejárati dátum'
                name='expirationDate'
                className='form-control'
                value={this.state.expirationDate}
                onChange={this.onChange}
              />
            </div>
            <br />
            
            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Módosítás</button>
            </form>
            <br />
            <div className="col-md-6">
            <Link to="/auth" className="btn btn-outline-warning float-left">
                  Mégse
              </Link>
                <br />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default connect(store => ({
  user: store.user
}))(UpdateTodo)