import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class showAnimalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animal: {}
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8082/api/animals/'+this.props.match.params.id)
      .then(res => {
        // console.log("Print-showAnimalDetails-API-response: " + res.data);
        this.setState({
          animal: res.data
        })
      })
      .catch(err => {
        console.log("Error from ShowAnimalDetails");
      })
  };

  onDeleteClick (id) {
    axios
      .delete('http://localhost:8082/api/animals/'+id)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error form ShowAnimalDetails_deleteClick");
      })
  };


  render() {

    const animal = this.state.animal;
    let AnimalItem = <div>
      <table className="table table-hover table-dark">
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Name</td>
            <td>{ animal.name }</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Type</td>
            <td>{ animal.type }</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Age</td>
            <td>{ animal.age }</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Rescue date</td>
            <td>{ animal.rescue_date }</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Description</td>
            <td>{ animal.description }</td>
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
              <Link to="/animals" className="btn btn-outline-warning float-left">
                  Show Animal List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Animal's Record</h1>
              <p className="lead text-center">
                  View Animal's Info
              </p>
              <hr /> <br />
            </div>
          </div>
          <div>
            { AnimalItem }
          </div>

          <div className="row">
          <div className="col-md-6">
              <Link to={`/edit-animal/${animal._id}`} className="btn btn-outline-info btn-lg btn-block">
                    Edit
              </Link>
              <br />
            </div>
            
            <div className="col-md-6">
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,animal._id)}>Delete</button><br />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default showAnimalDetails;