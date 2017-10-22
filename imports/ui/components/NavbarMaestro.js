import React from 'react';
import PropTypes from 'prop-types';

export default class NavbarMaestro extends React.Component {
  render () {
    return (
      <div>
        <div className="container-fluid">
          <div className="container">
            <ul className="nav nav-pills nav-fill">
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="fa fa-users icon" aria-hidden="true"></i>Mis Grupos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="fa fa-file-text icon" aria-hidden="true"></i>Mis Documentos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="fa fa-book icon" aria-hidden="true"></i>Mis Sesiones</a>
              </li>
            </ul>
          </div>
      </div>
      <div className="margin-img">
        <img  src="images/slider-maestro.png" className="img-fluid" alt="Responsive image"/>
      </div>

      </div>

    );
  }
}
