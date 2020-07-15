import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class CreateAnimal extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      type:'',
      age:'',
      rescue_date:'',
      description:''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      name: this.state.name,
      type: this.state.type,
      age: this.state.age,
      rescue_date: this.state.rescue_date,
      description: this.state.description
    };

    axios
      .post('http://localhost:8082/api/animals', data)
      .then(res => {
        this.setState({
          name: '',
          type:'',
          age:'',
          rescue_date:'',
          description:''
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in CreateAnimal!");
      })
  };

  render() {
    return (
      <div className="Create">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/animals" className="btn btn-outline-warning float-left">
                  Show Animal List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Animal</h1>
              

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
                    type='text'
                    placeholder='Type'
                    name='type'
                    className='form-control'
                    value={this.state.type}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Age'
                    name='age'
                    className='form-control'
                    value={this.state.age}
                    onChange={this.onChange}
                  />
                </div>

		            <div className='form-group'>
                  <input
                    type='date'
                    placeholder='Rescue date'
                    name='rescue_date'
                    className='form-control'
                    value={this.state.rescue_date}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Description'
                    name='description'
                    className='form-control'
                    value={this.state.description}
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

export default CreateAnimal;