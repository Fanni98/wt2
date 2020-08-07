import React from 'react';
import logo from '../sr.png'; 
import '../App.css';
import { Link } from 'react-router-dom';


function Admin() {
    return(
        
        <div className="App-header">
          
            <div className="col-md-11">
            
              <Link to="/create-user" className="btn btn-outline-warning float-left">
                + Felhasználó
              </Link>
              <Link to="/create-todo" className="btn btn-outline-warning float-left">
                + Feladat</Link>
                <Link to="/users" className="btn btn-outline-warning float-left">
                Felhasználók
              </Link>
              <Link to="/todos" className="btn btn-outline-warning float-left">
                Feladatok
              </Link>
              <br />
              <br />
              <hr />
            </div>
    
            
        </div>
       
    )
}
export default Admin;