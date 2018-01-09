import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Todos from './todos/todos'
import Login from './login/login'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <h1>App</h1>
          <ul>
            <li><Link to="/">Todo List</Link></li>
            <li><Link to="/login">Login Form</Link></li>
          </ul>
          <Switch>
            <Route exact path="/" component={Todos}/>
            <Route path="/login" component={Login}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
