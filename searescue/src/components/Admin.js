import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';


function Admin() {
    return(
        
        <div className="App-header">         
            <div className="col-md-11">                       
              <Link to="/users" className="btn btn-outline-primary btn-lg float-left">
                Felhasználók
              </Link>
              <Link to="/todos" className="btn btn-outline-warning btn-lg float-left">
                Feladatok
              </Link>
              <Link to="/logout" className="btn btn-danger btn-lg float-right">
                Kijelentkezés
              </Link>                         
              
            </div>
    
            
        </div>
       
    )
}
export default Admin;