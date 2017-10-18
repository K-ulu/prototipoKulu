import React from 'react';
import PropTypes from 'prop-types';

export default class MaestroNuevaSesion extends React.Component {
  render () {
    return (
      <div className="container margin-block">
        <h2>¿Listo para enseñar algo hoy?</h2>
        <img src="images/crear-sesion.png" className="img-fluid" alt="Responsive image"/>
      </div>
    );
  }
}
