import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './components/Navbar';
import NavbarUser from './components/NavbarUser';
import NavbarMaestro from './components/NavbarMaestro';
import MaestroNuevaSesion from './components/MaestroNuevaSesion';
import CarouselItems from './components/CarouselItems';
import Footer from './components/Footer';

import MaestroDashboard from './MaestroDashboard';
import UsuarioDashboard from './UsuarioDashboard';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


export default class Dashboard extends React.Component {

  render () {
    const isLoggedIn = this.props.isAuthenticated;
    const tipoUsuario = "alumno";

    let navbar = null;
    if (isLoggedIn) {
        if (tipoUsuario == "docente"){
            navbar = <MaestroDashboard/>;
        }  
        else{
            navbar = <UsuarioDashboard/>; 
        }  
    } else {
      navbar = <Navbar/>;
    }
    return (
    <div>
        { navbar }
    </div>
    );
  }
}
