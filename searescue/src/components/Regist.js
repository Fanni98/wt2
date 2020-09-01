import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

class Regist extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      password: '',
      token:'',
      backgroundColor: "#4285F4"
      
    };
   
  }
 
  onChange = e => {
    if(strongRegex.test(e.target.value)) {
      this.setState({ backgroundColor: "#0F9D58" ,  [e.target.name]: e.target.value});
      } else if(mediumRegex.test(e.target.value)) {
          this.setState({ backgroundColor: "#F4B400",  [e.target.name]: e.target.value });
      } else {
          this.setState({ backgroundColor: "#DB4437",  [e.target.name]: e.target.value });
      }
   
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      name: this.state.name,
      password: this.state.password
    };

    axios
      .post('http://localhost:8082/api/users/register', data)
      .then(res => {
        this.setState({
          name: '',
          password:''
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in Register!");
      })
  };

  render() {
    const todo = this.state.todo;
    return (
      <div className="App-header">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Regisztráció</h1>
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

                

                <div className='form-control' style={{ backgroundColor: this.state.backgroundColor }}>
                  <p><label htmlFor="password">Jelszó: </label></p>
                  <input type="password" value={this.state.password} name="password" className='form-control' onChange={this.onChange} />
                </div>
                

                <h1>Minél erősebb a jelszó annál biztonságosabb 😉</h1>
                <p className="password">Kis és nagy betű, speciális karakterek, számok és legalább 8 karakter</p>
                <p className="password">🔴 gyenge</p>
                <p className="password">🟡 közepes</p>
                <p className="password">🟢 erős</p>

                <hr />

                <input
                    type="submit"
                    value="OK"
                    className="btn btn-warning btn-block btn-lg"
                />
              </form>
          </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Regist;