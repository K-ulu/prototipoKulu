import React from 'react';
import PropTypes from 'prop-types';

export default class Footer extends React.Component {
  render () {
    return (
      <footer className="footer">
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="/">K'ulu'</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/about">¿Quiénes somos?<span className="sr-only">(current)</span></a>
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
