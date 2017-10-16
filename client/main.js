import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import Test from '../imports/ui/test';
import Navbar from '../imports/ui/Navbar';
import Carousel from '../imports/ui/Carousel';
import Carousel1 from '../imports/ui/Carousel1';

// Import Tether.js - Bootstrap tooltip requires Tether.
// We also add 'global.Tether' as a workaround for Meteor.
import tether from 'tether';
global.Tether = tether;

import popper from 'popper.js';
global.Popper = popper;
// Import Bootstrap js npm module.cmd
bootstrap = require('bootstrap');

Meteor.startup(() => {
  ReactDOM.render(<Navbar/>, document.getElementById('app'));
});
