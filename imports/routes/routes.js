import { Meteor } from 'meteor/meteor';
import React from 'react';
import {  BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import Home from '../ui/Home';
import Login from '../ui/Login';
import Signup from '../ui/Signup';
import About from '../ui/About';
import Business from '../ui/Business';
import Contact from '../ui/Contact';
import Support from '../ui/Support';
import NotFound from '../ui/NotFound';

import MaestroDashboard from '../ui/MaestroDashboard';

export const routes = (
  <Router>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup}/>
      <Route path="/about" component={About} />
      <Route path="/business" component={Business} />
      <Route path="/contact" component={Contact} />
      <Route path="/support" component={Support} />
      <Route path="*" component={NotFound}/>
    </Switch>
  </Router>
);
