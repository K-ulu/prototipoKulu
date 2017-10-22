import React from 'react';
import PropTypes from 'prop-types';

export default class CardDeck extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="card-deck">
          <div className="card">
            <img className="card-img-top" src="images/contenido.jpg" alt="Card image cap"/>
            <div className="card-block">
              <h4 className="card-title">Administradores Contenido</h4>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
              <a href="#" className="btn btn-primary">Adelante!</a>
            </div>
          </div>
          <div className="card">
            <img className="card-img-top" src="images/alumnos.jpg" alt="Card image cap"/>
            <div className="card-block">
              <h4 className="card-title">Alumnos</h4>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
              <a href="#" className="btn btn-primary">Adelante!</a>
            </div>
          </div>
          <div className="card">
            <img className="card-img-top" src="images/maestros.jpg" alt="Card image cap"/>
            <div className="card-block">
              <h4 className="card-title">Maestros</h4>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
              <a href="#" className="btn btn-primary">Adelante!</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
