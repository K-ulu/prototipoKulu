import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './Navbar';
import NavbarMaestro from './NavbarMaestro';
import MaestroNuevaSesion from './MaestroNuevaSesion';
import CarouselItems from './CarouselItems';
import Footer from './Footer';


export default class MaestroDashboard extends React.Component{
  render () {
    return (
      <div>
        <Navbar/>
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
