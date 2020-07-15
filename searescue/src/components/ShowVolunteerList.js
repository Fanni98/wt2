import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import VolunteerCard from './VolunteerCard';

class ShowVolunteerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volunteers: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/volunteers')
      .then(res => {
        this.setState({
          volunteers: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowVolunteerList');
      })
  };


  render() {
    const volunteers = this.state.volunteers;
    console.log("PrintVolunteer: " + volunteers);
    let volunteerList;

    if(!volunteers) {
      volunteerList = "there is no volunteer record!";
    } else {
      volunteerList = volunteers.map((volunteer, k) =>
        <VolunteerCard volunteer={volunteer} key={k} />
      );
    }

    return (
      <div className="ShowList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Volunteers List</h2>
            </div>

            <div className="col-md-11">
              <Link to="/create-volunteer" className="btn btn-outline-warning float-right">
                + Add New Volunteer
              </Link>
              <br />
              <br />
              <hr />
            </div>

          </div>

          <div className="list">
                {volunteerList}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowVolunteerList;