import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AnimalCard from './AnimalCard';

class ShowAnimalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animals: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/animals')
      .then(res => {
        this.setState({
          animals: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowAnimalList');
      })
  };


  render() {
    const animals = this.state.animals;
    console.log("PrintAnimal: " + animals);
    let animalList;

    if(!animals) {
      animalList = "there is no animal record!";
    } else {
      animalList = animals.map((animal, k) =>
        <AnimalCard animal={animal} key={k} />
      );
    }

    return (
      <div className="ShowList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Animals List</h2>
            </div>

            <div className="col-md-11">
              <Link to="/create-animal" className="btn btn-outline-warning float-right">
                + Add New Animal
              </Link>
              <br />
              <br />
              <hr />
            </div>

          </div>

          <div className="list">
                {animalList}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowAnimalList;