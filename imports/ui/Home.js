import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withRouter } from "react-router-dom";

import Navbar from './components/Navbar';
import NavbarUser from './components/NavbarUser';
import Carousel from './components/Carousel';
import HomeBand from './components/HomeBand';
import CardDeck from './components/CardDeck';
import Footer from './components/Footer';

class Home extends React.Component {

  render () {
    //mostrarmos la navbar de acuerdo si existe usuario logueado
    let navbar = null;
    //hay usuario logueado
    if(Session.get('user') !== undefined){ 
      navbar = <NavbarUser/>;
    } else { //no hay usuario logueado
      navbar = <Navbar/>;
    }
    return (
      <div>
        { navbar }
        <Carousel/>
        <HomeBand/>
        <CardDeck/>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(Home);
