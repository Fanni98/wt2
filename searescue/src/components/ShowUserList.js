import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';

class ShowUserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/users')
      .then(res => {
        this.setState({
          users: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowUserList');
      })
  };


  render() {
    const users = this.state.users;
    console.log("PrintUser: " + users);
    let userList;

    if(!users) {
        userList = "there is no user record!";
    } else {
        userList = users.map((user, k) =>
        <UserCard user={user} key={k} />
      );
    }

    return (
      <div className="ShowList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Felhasználók listája</h2>
            </div>

            <div className="col-md-11">
              <Link to="/create-user" className="btn btn-outline-warning float-right">
                +
              </Link>
              <br />
              <br />
              <hr />
            </div>

          </div>
          <div className="list">
                {userList}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowUserList;