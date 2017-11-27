import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './components/Navbar';
import NavbarUser from './components/NavbarUser';
import NavbarMaestro from './components/NavbarMaestro';
import MaestroNuevaSesion from './components/MaestroNuevaSesion';
import CarouselItems from './components/CarouselItems';
import Footer from './components/Footer';


export default class MaestroDashboard extends React.Component{
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
        <NavbarMaestro/>
        <MaestroNuevaSesion/>
        <CarouselItems name="Materias"/>
        <CarouselItems name="Bloques"/>
        <CarouselItems name="Articulos Destacados"/>
        <CarouselItems name="Documentos Recientes"/>
        <Footer/>
      </div>
    );
  }
}
