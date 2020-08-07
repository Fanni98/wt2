import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: ''
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8082/api/users/'+this.props.match.params.id)
      .then(res => {
        // this.setState({...this.state, user: res.data})
        this.setState({
          name: res.data.name,
          password: res.data.password
        })
      })
      .catch(err => {
        console.log("Error from UpdateUser");
      })
  };

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
      .put('http://localhost:8082/api/users/'+this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/show-user/'+this.props.match.params.id);
      })
      .catch(err => {
        console.log("Error in UpdateUser!");
      })
  };


  render() {
    return (
      <div className="UpdateInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/users" className="btn btn-outline-warning float-left">
                  Felhasználók listája
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Adatok módosítása</h1>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
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
              <input
                type='password'
                placeholder='Password'
                name='password'
                className='form-control'
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Módosítás</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default UpdateUser;