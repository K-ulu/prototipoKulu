import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './components/Navbar';

export default class About extends React.Component {
  render () {
    return (
      <div>
        <Navbar/>
        About Component here!
      </div>
    );
  }
}
