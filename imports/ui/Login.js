import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default class Login extends React.Component {
  render () {
    return (
      <div>
        <Navbar/>

        <div className="container py-5">
          <div className="row">
              <div className="col-md-12">
                  <h2 className="text-center mb-4"></h2>
                  <div className="row">
                      <div className="col-md-5 mx-auto">
                          <span className="anchor" id="formLogin"></span>

                          {/*<!-- form card login -->*/}
                          <div className="card rounded">
                              <div className="card-header">
                                  <h3 className="mb-0 text-center">Ingresa tus datos</h3>
                              </div>
                              <div className="card-body mt-4">
                                  <form className="form" role="form" autocomplete="off" id="formLogin">
                                      <div className="input-group margin-bottom-sm col-sm-12 col-md-12 col-lg-12">
                                          <span class="input-group-addon"><i class="fa fa-user fa-fw"></i></span>
                                          <input type="text" className="form-control form-control rounded" placeholder="Correo electrónico"/>
                                      </div>
                                      <div className="input-group margin-bottom-sm col-sm-12 col-md-12 col-lg-12">
                                          <span class="input-group-addon"><i class="fa fa-lock fa-fw"></i></span>
                                          <input type="password" className="form-control form-control rounded" placeholder="Constraseña"/>
                                      </div>
                                      <div className="text-center">
                                        <a href="recuperar.html">¿Olvidaste tu contraseña?</a> ó <a href="registro.html">¿No eres miembro aún?</a>
                                      </div>
                                      <div className="row-login">
                                        <button type="button" className="btn btn-primary btn-lg text-center">Iniciar Sesión</button>
                                      </div>

                                  </form>
                              </div>
                              {/*<!--/card-block-->*/}
                          </div>
                          {/*<!-- /form card login -->*/}
                      </div>
                  </div>
                  {/*<!--/row-->*/}
              </div>
              {/*<!--/col-->*/}
          </div>
          {/*<!--/row-->*/}
      </div>










        {/*<div className="container">
            <div className="kulu-head"><img src="img/kulu_head.png" width=""/>
                <div className="kulu-hand" id="pass1"></div>
                <div className="kulu-hand-r" id="pass2"></div>
            </div>
            <div className="bg-img"></div>
            <div className="login">
                <div className="title">
                    <h2>Ingresa tus datos</h2>
                </div>
                <br>
                <form id="form">
                    <div className="control">
                        <label for="usuario" className="fa fa-user"></label>
                        <input type="text" id="pass3" name="usuario" placeholder="Nombre de usuario"/>
                    </div>
                    <br/>
                    <div className="control">
                        <label for="correo" className="fa fa-lock"></label>
                        <input type="password" id="pass" name="contrasena" placeholder="Contraseña"/>
                    </div>
                    <br/>
                    <button type="submit" name="iniciar">Iniciar sesión</button>
                    <br/>
                    <br/>
                    <div className="footer"> <a href="recuperar.html">¿Olvidaste tu contraseña?</a> ó <a href="registro.html">¿No eres miembro aún?</a></div>
                </form>
            </div>
        </div>*/}
        <Footer/>
      </div>
    );
  }
}
