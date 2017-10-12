import React from 'react';
import ReactDOM from 'react-dom';

Meteor.startup(() => {
  ReactDOM.render(<h1>Hello World!!</h1>, document.getElementById('app'));
});
