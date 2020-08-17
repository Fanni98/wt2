import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

let admin = [
  {
    name: 'admin',
    password: '123456'
  }


]
function Admin() {
  /*const admin= admin.find(
    x => x.name === params.name && x.password === params.password
  )*/
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