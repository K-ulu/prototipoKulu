import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';


export default class Navbar extends React.Component {
  render(){
    return (
      <div className="border-blue">
        <nav className="navbar navbar-expand-lg navbar-light">          
          <a href="/" className="navbar-brand ml-sm-2 mr-sm-2 order-md-first order-0" href="/">
            <img src="images/kulu_logo_160.png" width="160" height="36" className="d-inline-block align-top" alt="logo"/>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse" id="mainNav">
            <div className="container">
              <div className="row align-items-center justify-content-center">
                {/*Dropdown de recursos*/}
                <div className="col-12 col-lg-2 mb-3 mb-lg-0 mt-3 mt-lg-0">
                  <div className="dropdown ml-sm-4 dropdown-margin">
                    <button className="btn btn-primary dropdown-toggle btn-block" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Recursos
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a className="dropdown-item" href="#">Libros</a>
                      <a className="dropdown-item" href="#">Contenido Multimedia</a>
                      <a className="dropdown-item" href="#">Blog</a>
                      <a className="dropdown-item" href="#">Documentos</a>
                      <a className="dropdown-item" href="#">Elementos de Objetos de Aprendizajes</a>
                      <a className="dropdown-item" href="#">Objetos de Aprendizajes</a>
                    </div>
                  </div>
                </div>
                {/*Buscador..*/}
                <div className="col-12 col-md-12 col-lg-4 mb-3 mb-lg-0">
                  <form className="form-inline">
                    <input className="form-control ml-sm-4 mr-sm-2 ml-lg-2 col-sm-9 col-lg-8" type="text" placeholder="Buscar..."/>
                    <button className="btn btn-outline-success my-2 my-sm-0 col-sm-2 col-lg-3" type="submit">Buscar</button>
                  </form>                  
                </div>
                {/*Botones de acceso a cuentas*/}
                <div className="col-12 col-lg-6">
                  <ul className="nav nav-pills justify-content-end">
                  <li className="nav-item col-12 col-md-4 col-lg-4 text-center">
                    <a className="nav-link" href="#">K'ulu' PRO</a>
                  </li>
                  <li className="nav-item col-12 col-md-4 col-lg-4 text-center">
                    <a className="nav-link" href="/login">Iniciar Sesión</a>
                  </li>
                  <li className="nav-item col-12 col-md-4 col-lg-3 text-center">
                    <a className="nav-link active" href="/signup">Regístrarse</a>
                  </li>                   
                  </ul>
                </div>
              </div>
            </div>           
          </div>
        </nav>
      </div>
    );
  }
}
