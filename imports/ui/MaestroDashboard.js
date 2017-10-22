import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './components/Navbar';
import NavbarMaestro from './components/NavbarMaestro';
import MaestroNuevaSesion from './components/MaestroNuevaSesion';
import CarouselItems from './components/CarouselItems';
import Footer from './components/Footer';


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
