import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import CardDeck from './components/CardDeck';
import Footer from './components/Footer';

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
