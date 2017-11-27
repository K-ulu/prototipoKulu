import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './components/Navbar';
import NavbarUser from './components/NavbarUser';
import Carousel from './components/Carousel';
import CardDeck from './components/CardDeck';
import Footer from './components/Footer';

export default class Home extends React.Component {
  render () {
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
        <Carousel/>
        <CardDeck/>
        <Footer/>
      </div>
    );
  }
}
