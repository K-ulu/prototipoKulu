import React from 'react';
import PropTypes from 'prop-types';

export default class Footer extends React.Component {
  render () {
    return (
      <footer className="footer">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">K'ulu'</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/about">¿Quiénes somos? <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/business">K'ulu' for business</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Contacto</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/support">Soporte</a>
              </li>
            </ul>
          </div>
        </nav>
      </footer>
    );
  }
}
