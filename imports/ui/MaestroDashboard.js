import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './Navbar';
import Footer from './Footer';

export default class MaestroDashboard extends React.Component{
  render () {
    return (
      <div>
        <Navbar/>
        MaestroDashboard here!
        <Footer/>
      </div>
    );
  }
}
