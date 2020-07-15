import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class CreateVolunteer extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      age:''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      name: this.state.name,
      age: this.state.age
    };

    axios
      .post('http://localhost:8082/api/volunteers', data)
      .then(res => {
        this.setState({
          name: '',
          age:''
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in CreateVolunteer!");
      })
  };

  render() {
    return (
      <div className="Create">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/volunteers" className="btn btn-outline-warning float-left">
                  Show Volunteer List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Volunteer</h1>
              <p className="lead text-center">
                  Add new Volunteer
              </p>

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
                <br />

                <div className='form-group'>
                  <input
                    type='number'
                    placeholder='Age'
                    name='age'
                    className='form-control'
                    value={this.state.age}
                    onChange={this.onChange}
                  />
                </div>

                <input
                    type="submit"
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

export default CreateVolunteer;