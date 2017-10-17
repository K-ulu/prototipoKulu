import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './Navbar';
import Carousel from './Carousel';
import CardDeck from './CardDeck';
import Footer from './Footer';

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <Navbar/>
        <Carousel/>
        <CardDeck/>
        <Footer/>
      </div>
    );
  }
}
