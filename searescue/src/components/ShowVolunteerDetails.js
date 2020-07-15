import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class showVolunteerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volunteer: {}
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8082/api/volunteers/'+this.props.match.params.id)
      .then(res => {
        // console.log("Print-showVolunteerDetails-API-response: " + res.data);
        this.setState({
          volunteer: res.data
        })
      })
      .catch(err => {
        console.log("Error from ShowVolunteerDetails");
      })
  };

  onDeleteClick (id) {
    axios
      .delete('http://localhost:8082/api/volunteers/'+id)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error form ShowVolunteerDetails_deleteClick");
      })
  };


  render() {

    const volunteer = this.state.volunteer;
    let VolunteerItem = <div>
      <table className="table table-hover table-dark">
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Name</td>
            <td>{ volunteer.name }</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Age</td>
            <td>{ volunteer.age }</td>
          </tr>
        </tbody>
      </table>
    </div>

    return (
      <div className="ShowDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/volunteers" className="btn btn-outline-warning float-left">
                  Show Volunteer List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Volunteer's Record</h1>
              <p className="lead text-center">
                  View Volunteer's Info
              </p>
              <hr /> <br />
            </div>
          </div>
          <div>
            { VolunteerItem }
          </div>
          <div className="row">
          <div className="col-md-6">
              <Link to={`/edit-volunteer/${volunteer._id}`} className="btn btn-outline-info btn-lg btn-block">
                    Edit
              </Link>
              <br />
            </div>
            <div className="col-md-6">
                <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,volunteer._id)}>Delete</button><br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default showVolunteerDetails;