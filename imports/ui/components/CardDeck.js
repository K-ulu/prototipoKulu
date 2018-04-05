import React from 'react';
import PropTypes from 'prop-types';

export default class CardDeck extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="card-deck">
          <div className="row justify-content-center">            
            <div className="col-md-6 col-lg-4 mb-md-3">
              <div className="card">
                <img className="card-img-top" src="images/alumnos.jpg" alt="Card image cap"/>
                <div className="card-body">
                  <h5 className="card-title">Alumnos</h5>
                  <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                  <a href="#" className="btn btn-primary">Adelante!</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-md-3">
              <div className="card">
                <img className="card-img-top" src="images/maestros.jpg" alt="Card image cap"/>
                <div className="card-body">
                  <h5 className="card-title">Maestros</h5>
                  <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                  <a href="#" className="btn btn-primary">Adelante!</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-md-3">
              <div className="card">
                <img className="card-img-top" src="images/contenido.jpg" alt="Card image cap"/>
                <div className="card-body">
                  <h5 className="card-title">Administradores Contenido</h5>
                  <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                  <a href="#" className="btn btn-primary">Adelante!</a>
                </div>
              </div>
            </div>
          </div>          
        </div>
      </div>
    );
  }
}
