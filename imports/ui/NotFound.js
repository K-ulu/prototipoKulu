import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './components/Navbar';
import NavbarUser from './components/NavbarUser';

export default class NotFound extends React.Component {
  render (){
    const isLoggedIn = this.props.isAuthenticated;

    let navbar = null;
    if (isLoggedIn) {
      navbar = <NavbarUser/>;
    } else {
      navbar = <Navbar/>;
    }
    return (
      <div>
        { navbar }
        NotFound component here!
      </div>
    );
  }
}
