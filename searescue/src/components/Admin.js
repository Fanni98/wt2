import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';


function Admin() {
    return(
        
        <div className="App-header">
          
            <div className="col-md-11">                       
              <Link to="/users" className="btn btn-outline-warning float-left">
                Felhasználók
              </Link>
              <Link to="/todos" className="btn btn-outline-warning float-left">
                Feladatok
              </Link>
              <br />
              <br />
            </div>
    
            
        </div>
       
    )
}
export default Admin;