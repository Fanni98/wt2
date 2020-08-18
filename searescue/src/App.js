import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import CreateUser from './components/CreateUser';
import ShowUserList from './components/ShowUserList';
import ShowUserDetails from './components/ShowUserDetails';
import UpdateUser from './components/UpdateUser';

import Home from './components/Home';
import AuthRouter from './components/AuthRouter';
import CreateTodo from './components/CreateTodo';
import ShowTodoDetails from './components/ShowTodoDetails';
import UpdateTodo from './components/UpdateTodo';
import Admin from './components/Admin'
import ShowTodoList from './components/ShowTodoList';
import Test from './components/Test';
import ALogin from './components/ALogin';
import Logout from './components/Logout';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn:false
      
    };
  }

  render() {
    return (
      <Router>
        <Switch>

          <AuthRouter parentClass={this} path='/users' component={ShowUserList} />
          <AuthRouter parentClass={this} path='/create-user' component={CreateUser} />
          <AuthRouter parentClass={this}Route path='/show-user/:id' component={ShowUserDetails} />
          <AuthRouter parentClass={this} path='/show-user' component={ShowUserDetails} />
          <AuthRouter parentClass={this} path='/edit-user/:id' component={UpdateUser} />
          <AuthRouter path='/auth' parentClass={this} component={CreateTodo} />

          <AuthRouter parentClass={this} path='/show-todo/:id' component={ShowTodoDetails} />
          <AuthRouter parentClass={this} path='/edit-todo/:id' component={UpdateTodo} />
          <AuthRouter parentClass={this} path='/admin' component={Admin} />
          <AuthRouter parentClass={this} path='/todos' component={ShowTodoList}/>
          <AuthRouter parentClass={this} path='/create-todo' component={CreateTodo}/>
          <AuthRouter parentClass={this} path='/ladmin' component={ALogin} />
          <AuthRouter parentClass={this} path='/test' component={Test} />
          <AuthRouter parentClass={this} path='/logout' component={Logout}/>

          <Route path='/' component={Home}/>
        </Switch>
      </Router>
    );
  }
}

export default App;