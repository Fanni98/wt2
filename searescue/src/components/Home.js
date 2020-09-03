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

        localStorage.token=res.data.token
        localStorage.logoutTime= Date.now() + 300000
        setTimeout(() => {
          this.props.history.push('/auth');
        }, 100);
      })
      .catch(err => {
        console.log("Error in Login!");
      })

    

      
  };

  render() {
    
    return (
      <div className="App-header">
        <div className="container">
          <div className="row">
            
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Hello ٩(｡•́‿•̀｡)۶</h1>
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
                    className="btn btn-primary btn-block btn-lg"
                />
                <hr />
              <Link to="/regist" className="btn btn-warning btn-block btn-lg">
                  Regisztrálok
              </Link>
              <br />
              <br />
              <hr />
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

