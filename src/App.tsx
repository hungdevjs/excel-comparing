import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './bootstrap.global.css';
import './App.global.css';
import Home from './containers/Home/views/Home';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}
