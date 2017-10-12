import React from 'react';
import ReactDOM from 'react-dom';
import Test from '../imports/ui/test';
import Navbar from '../imports/ui/Navbar';
import Carousel from '../imports/ui/Carousel';

Meteor.startup(() => {
  ReactDOM.render(<Carousel/>, document.getElementById('app'));
});
