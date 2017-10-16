import React from 'react';
import PropTypes from 'prop-types';

export default class Navbar extends React.Component {
  render(){
    return (
      <div>
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand ml-sm-2 mr-sm-2" href="/">
            <img src="images/kulu_logo_160.png" width="160" height="36" className="d-inline-block align-top" alt="logo"/>
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="col">
              <form className="form-inline">
                <input className="form-control ml-sm-4 mr-sm-2 col-sm-9" type="text" placeholder="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0 col-sm-2" type="submit">Search</button>
              </form>
            </div>
            <div className="col">
              <ul className="nav nav-pills justify-content-end">
                <li className="nav-item">
                  <a className="nav-link" href="#">K'ulu' PRO</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Iniciar Sesión</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="#">Regístrarse</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/*<nav className="navbar navbar-toggleable-sm navbar-light bg-faded">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <a className="navbar-brand" href="/">
            <img src="images/kulu_logo_320.png" width="100" height="30" class="d-inline-block align-top" alt="logo"/>
          </a>


          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <div className="d-flex flex-row justify-content-center mr-auto ml-auto form-group row">



              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mb-2 mr-sm-2 mb-sm-0" type="text" placeholder="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
            <ul className="navbar-nav text-center ml-auto mt-2 mt-md-0">
              <li className="nav-item">
                <a className="nav-link" href="#">Iniciar Sesión <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Registrarse</a>
              </li>
            </ul>
          </div>
        </nav>*/}
      </div>
    );
  }
}
