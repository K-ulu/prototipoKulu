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

    const userId = Accounts.userId();
    var user=Meteor.users.findOne(userId);
    console.log(this.props.currentUser);
    console.log(userId);
    console.log(user);

    let navbar = null;
    if (isLoggedIn) {
        if (tipoUsuario == "docente"){
            navbar = <MaestroDashboard/>;
        }  
        else{
            navbar = <UsuarioDashboard/>; 
        }  
      navbar = <NavbarUser/>;
    } else {
      navbar = <Navbar/>;
    }
    return (
    <div>
        { navbar }
        <p>Hola! <strong>{this.props.currentUser}</strong>, bienvenido a tuTwitter en miTwitter!</p>
    </div>
    );
  }
}
