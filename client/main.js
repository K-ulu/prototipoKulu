import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
//import '../imports/compatibility/bootstrap.js';
import { routes } from '../imports/routes/routes';

// Import Tether.js - Bootstrap tooltip requires Tether.
// We also add 'global.Tether' as a workaround for Meteor.
//import tether from 'tether';
//global.Tether = tether;

//import popper from 'popper.js';
//global.Popper = popper;
// Import Bootstrap js npm module.cmd
//bootstrap = require('bootstrap');

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));

});
