import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class showUserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    console.log(this.props.user.data)
    if(this.props.match.params.id == 'undefined' || this.props.match.params.id == undefined) {
      console.log('user nincs...')
      console.log(this.props.user.data)
      console.log(this.props.todo)
      this.setState({user: this.props.user.data, todo: this.props.data})
    } else {
      axios
      .get('http://localhost:8082/api/users/'+this.props.match.params.id)
      .then(res => {
        // console.log("Print-showUserDetails-API-response: " + res.data);
        this.setState({
          user: res.data
        })
      })
      .catch(err => {
        console.log("Error from ShowUserDetails");
      })
    }
  };

  onDeleteClick (id) {
    axios
      .delete('http://localhost:8082/api/users/'+id)
      .then(res => {
        this.props.history.push("/users");
      })
      .catch(err => {
        console.log("Error form ShowUserDetails_deleteClick");
      })
  };


  render() {

    const user = this.state.user;
    let UserItem = <div>
      <table className="table table-hover table-dark">
        <tbody>
          <tr>
            <td>Név</td>
            <td>{ user.name }</td>
          </tr>
          <tr>
            <td>Jelszó</td>
            <td>{ user.password }</td>
          </tr>
        </tbody>
      </table>
    </div>

    return (
      <div className="App-header">
        <div className="container">
          <div className="row">
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Adatok</h1> 
              <hr /> <br />
            </div>
          </div>
          <div>
            { UserItem }
          </div> 
          <div className="row">
            <div className="col-md-6">
                <Link to={`/edit-user/${user._id}`} className="btn btn-outline-info btn-lg btn-block">
                      Módosít
                </Link>
                <br />
            </div>
            <div className="col-md-6">
                <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,user._id)}>Töröl</button><br />
            </div> 
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
  user: store.user,
}))(showUserDetails)