import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import CreateAnimal from './components/CreateAnimal';
import ShowAnimalList from './components/ShowAnimalList';
import ShowAnimalDetails from './components/ShowAnimalDetails';
import UpdateAnimalInfo from './components/UpdateAnimalInfo';

import CreateVolunteer from './components/CreateVolunteer';
import ShowVolunteerList from './components/ShowVolunteerList';
import ShowVolunteerDetails from './components/ShowVolunteerDetails';
import UpdateVolunteerInfo from './components/UpdateVolunteerInfo';

import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/animals' component={ShowAnimalList} />
          <Route path='/create-animal' component={CreateAnimal} />
          <Route path='/edit-animal/:id' component={UpdateAnimalInfo} />
          <Route path='/show-animal/:id' component={ShowAnimalDetails} />

	        <Route exact path='/volunteers' component={ShowVolunteerList} />
          <Route path='/create-volunteer' component={CreateVolunteer} />
          <Route path='/edit-volunteer/:id' component={UpdateVolunteerInfo} />
          <Route path='/show-volunteer/:id' component={ShowVolunteerDetails} />

          <Route path='/' component={Home}/>
        </div>
      </Router>
    );
  }
}

export default App;