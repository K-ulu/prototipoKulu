import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import Test from '../imports/ui/test';
import Home from '../imports/ui/Home';
import MaestroDashboard from '../imports/ui/MaestroDashboard';

// Import Tether.js - Bootstrap tooltip requires Tether.
// We also add 'global.Tether' as a workaround for Meteor.
import tether from 'tether';
global.Tether = tether;

import popper from 'popper.js';
global.Popper = popper;
// Import Bootstrap js npm module.cmd
bootstrap = require('bootstrap');

Meteor.startup(() => {
  ReactDOM.render(<MaestroDashboard/>, document.getElementById('app'));
});
