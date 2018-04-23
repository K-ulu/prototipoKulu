import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
//import {Docente} from '../api/Docente';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error: ''
    };
  }

  componentWillMount(){
    const isLoggedIn = this.props.isAuthenticated;
    if (isLoggedIn) {
      this.props.history.push('/teachers');
    }
  }

  onSubmit(e){
    e.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    let opcion = this.refs.tipo.value;
    console.log(opcion);

    /*Accounts.createUser({email, password}, (err) => {
      console.log('signup callback', err);
    });

   //Este es original
    /*this.setState({
      error: 'Something went wrong'
    });*/

    var datos = {
      email: email,
      password: password,
      profile: {
      },
      tipoUsuario: opcion
    };
  
    var userId = Accounts.createUser(datos);

    var nombre= "Eugenio";
    var ApPaterno = "Diaz";

    Meteor.call('docente.insert', nombre, ApPaterno, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });

    /*
    const { url } = "prueba_Hola";

    e.preventDefault();

    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });
    */
  }
  

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
                          <div className="alert alert-danger" role="alert">
                            {this.state.error ? <p>{this.state.error}</p> : undefined}
                          </div>
                          <div className="card rounded">
                              <div className="card-header">
                                  <h3 className="mb-0 text-center">Regístrate</h3>
                              </div>
                              <div className="card-body mt-4">
                                  <form onSubmit={this.onSubmit.bind(this)} className="form" role="form" autoComplete="off" id="formLogin">
                                      <div className="input-group margin-bottom-sm col-sm-12 col-md-12 col-lg-12">
                                          <span className="input-group-addon"><i className="fa fa-user fa-fw"></i></span>
                                          <input type="email" ref="email" name="email" className="form-control form-control rounded" placeholder="Correo electrónico"/>
                                      </div>
                                      <div className="input-group margin-bottom-sm col-sm-12 col-md-12 col-lg-12">
                                          <span className="input-group-addon"><i className="fa fa-lock fa-fw"></i></span>
                                          <input type="password" ref="password" name="password" className="form-control form-control rounded" placeholder="Constraseña"/>
                                      </div>

                                      <div className = "input-group margin-bottom-sm col-sm-12 col-md-12 col-lg-12">
                                      <span className="input-group-addon"><i className="fa fa-user fa-fw"></i></span>
                                      <select className="form-control form-control rounded" ref="tipo" name ="opcion">
                                        <option value="Alumno">Alumno</option>
                                        <option value ="Docente">Docente</option>
                                        <option value="Usuario">Usuario</option>
                                        <option selected>Seleccione</option>
                                      </select>
                                      </div>

                                      <div className="text-center">
                                        <a href="recuperar.html">¿Olvidaste tu contraseña?</a> ó <a href="/login">¿Ya tienes una cuenta?</a>

                                      </div>
                                      <div className="row-login">
                                        <button type="submit" className="btn btn-primary btn-lg text-center">Regístrarse</button>
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
        <Footer/>
      </div>
    );
  }
}

export default withRouter(Signup);
