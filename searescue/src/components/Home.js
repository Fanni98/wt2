import React from 'react';
import logo from '../sr.png'; 
import '../App.css';
import { Link } from 'react-router-dom';


function Home() {
    return(
        
        <div className="App-header">
          
            <div className="col-md-11">

              <h1 className="display-4 text-center">SeaRescue</h1>
            
              <Link to="/create-animal" className="btn btn-outline-warning float-right">
                + Add New Animal
              </Link>
              <Link to="/create-volunteer" className="btn btn-outline-warning float-right">
                + Add New Volunteer</Link>
                <Link to="/volunteers" className="btn btn-outline-warning float-right">
                Volunteers
              </Link>
              <Link to="/animals" className="btn btn-outline-warning float-right">
                Our Animals
              </Link>
              <br />
              <br />
              <hr />
            </div>
       
            <img src={logo} className="App-logo" alt="logo" />
            <div >
                <h1>
                In a way we're all sea creatures. - Dr. Sylvia Earl
                </h1>
            </div>
        </div>
       
    )
}
export default Home;