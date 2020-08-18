import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { connect } from 'react-redux';


class Home extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      password: '',
      
     
      
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
      .post('http://localhost:8082/api/users/login', data)
      .then(res => {
        this.setState({
          name: '',
          password:'',
          token:''
        })
        this.props.history.push('/auth');

        localStorage.token=res.data.token
      })
      .catch(err => {
        console.log("Error in CreateUser!");
      })

    

      
  };

  render() {
    
    return (
      <div className="App-header">
        <div className="container">
          <div className="row">
            
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Hello</h1>
              <br />

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Felhasználónév'
                    name='name'
                    className='form-control'
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>
                <hr />

                <div className='form-group'>
                  <input
                    type='password'
                    placeholder='Jelszó'
                    name='password'
                    className='form-control'
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <hr />

                <input
                    type="submit" value="Bejelentkezem"
                    className="btn btn-outline-warning btn-block mt-4"
                />
                <hr />
              <Link to="/create-user" className="btn btn-outline-warning btn-block mt-4">
                  Regisztrálok
              </Link>
              <br />
              <br />
              <hr />
              <Link to={"/ladmin"} className="btn btn-outline-warning float-right">
                  Admin
              </Link>
              </form>
              
          </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(store => ({
  user: store.user
}))(Home)

