import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "Components/login/login";

import './app.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;