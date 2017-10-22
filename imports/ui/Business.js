import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './components/Navbar';

export default class Business extends React.Component {
  render () {
    return (
      <div>
        <Navbar/>
        Business Component here!
      </div>
    );
  }
}
