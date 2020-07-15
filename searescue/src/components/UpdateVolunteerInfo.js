import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

class UpdateVolunteerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: ''
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8082/api/volunteers/'+this.props.match.params.id)
      .then(res => {
        // this.setState({...this.state, volunteer: res.data})
        this.setState({
          name: res.data.name,
          age: res.data.age
        })
      })
      .catch(err => {
        console.log("Error from UpdateVolunteerInfo");
      })
  };

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
      .put('http://localhost:8082/api/volunteers/'+this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/show-volunteer/'+this.props.match.params.id);
      })
      .catch(err => {
        console.log("Error in UpdateVolunteerInfo!");
      })
  };


  render() {
    return (
      <div className="UpdateInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/volunteers" className="btn btn-outline-warning float-left">
                  Show Volunteer List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit</h1>
              <p className="lead text-center">
                  Update Volunteer's Info
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor="name">Name</label>
              <input
                type='text'
                placeholder='name'
                name='name'
                className='form-control'
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <br />

            <div className='form-group'>
            <label htmlFor="age">Age</label>
              <input
                type='text'
                placeholder='Age'
                name='age'
                className='form-control'
                value={this.state.age}
                onChange={this.onChange}
              />
            </div>

           

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default UpdateVolunteerInfo;