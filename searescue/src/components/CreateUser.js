import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class CreateUser extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      password: '',
      token:''
      
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      name: this.state.name,
      password: this.state.password
    };

    axios
      .post('http://localhost:8082/api/users', data)
      .then(res => {
        this.setState({
          name: '',
          password:''
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in CreateUser!");
      })
  };

  render() {
    const todo = this.state.todo;
    return (
      <div className="Create">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/users" className="btn btn-outline-warning float-left">
                  Felhasználók listája
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Regisztráció</h1>
              

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Name'
                    name='name'
                    className='form-control'
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='form-control'
                    minLength='6'
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>


                <input
                    type="submit"
                    value="OK"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUser;