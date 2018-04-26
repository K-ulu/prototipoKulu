import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Error from './components/Error'

class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error: '', //almacena el error
      value: '' //almacena valor del tipo de usuario
    };

    //contexto de navegador para nuestras funciones
    this.handleChange = this.handleChange.bind(this);    
    this.onSubmit = this.onSubmit.bind(this);
  }

  //acciones a realizar antes que se monte el componente
  componentWillMount(){
    const isLoggedIn = this.props.isAuthenticated;
    if (isLoggedIn) {
      //TODO: Actualizar para determinar a pagina vamos a mandar a el usuario 
      this.props.history.push('/teachers');
    }
  }

  //evento que administra el cambio de datos en el select
  handleChange(event){
    this.setState({value: event.target.value});
  }

  //evento al mandar los datos del formulario
  onSubmit(e){
    e.preventDefault();
    //TODO:solicitar datos faltantes (actualizar formulario) datos a pedir: nombreUsuario, nombre, correo, password
    // confirmar password, tipo usuario
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    let opcion = this.state.value;    

    let nombre = this.refs.name.value.trim();
    let apellidoP = 'Miranda';
    let apellidoM = 'Rosanda';
    let nickname = this.refs.username.value.trim();
    let curp = 'abcdefgsdfsdf';

    //creando nuestro objeto con los datos del usuario
    var datos = {
      email: email,
      password: password,
      profile: {
        nombre: nombre,
        apellidoP: apellidoP,
        apellidoM: apellidoM,
        nickname: nickname,
        curp: curp
      },
      tipoUsuario: opcion
    };
  
    var userId = Accounts.createUser(datos, (err) => {
      if(err){
        this.setState({error: err.reason});
        
      } else {
        this.setState({error: ''});
      }
    });

    //insertamos los datos de acuerdo al tipo de usuario
    if(opcion == 'docente'){
      var claveDocente= "abcdef789t";
        var claveEscuela = "abcdef123t";
        var rfc = "aaaaaaa"
        Meteor.call('docente.insert', claveDocente, claveEscuela,rfc, (err, res) => {
          if (!err) {
            // this.handleModalClose();
            alert("insertado");
          } else {
            // this.setState({ error: err.reason });
            alert("ocurrió un error al insertar");
            alert(err.reason);
          }
        });
    }
    else if (opcion == 'alumno'){
      var matricula = "aaaaaaaaaaa";
      var claveEscuela = 'bbbbbbbbbb';
      Meteor.call('alumno.insert', matricula, claveEscuela, (err, res) => {
        if (!err) {
          // this.handleModalClose();
          alert("insertado");
        } else {
          // this.setState({ error: err.reason });
          alert("ocurrió un error al insertar");
          alert(err.reason);
        }
      });
    }    
  }
  

  render () {
    let errorMessage = null, error;
    errorMessage = (this.state.error) ? this.state.error : undefined;
    if(errorMessage === undefined){
      error = null;
    } else {
      error = <Error errorMessage={errorMessage}/>;
    }
    return (
      <div>
        <Navbar/>
        <div className="container py-5">
          <div className="row">
              <div className="col-md-12">
                  <h2 className="text-center mb-4"></h2>
                  <div className="row">
                      <div className="col-md-6 mx-auto">
                          <span className="anchor" id="formLogin"></span>

                          {/*<!-- form card login -->*/}
                          
                          {/*<div className="alert alert-danger" role="alert">
                            {this.state.error ? <p>{this.state.error}</p> : undefined}
    </div> */}
                          { error }
                          <div className="card rounded">
                              <div className="card-header">
                                  <h3 className="mb-0 text-center">Regístrate</h3>
                              </div>
                              <div className="card-body mt-2">
                                  <form onSubmit={this.onSubmit} className="form" role="form" autoComplete="off" id="formLogin">
                                    <div className="row">
                                      <div className="col-6">
                                        <div className="input-group-prepend">
                                          <span className="input-group-text"><i className="fa fa-user-circle-o"></i></span>
                                          <input type="text" ref="username" name="username" className="form-control form-control rounded" placeholder="Usuario"/>
                                        </div>                                          
                                      </div>
                                      <div className="col-6">
                                        <div className="input-group-prepend">
                                          <span className="input-group-text"><i className="fa fa-user fa-fw"></i></span>
                                          <input type="text" ref="name" name="name" className="form-control form-control rounded" placeholder="Nombre"/>
                                        </div>                                                                          
                                      </div>  
                                      <div className="col-12">                                        
                                        <div className="input-group-prepend">
                                          <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                          <input type="email" ref="email" name="email" className="form-control form-control rounded" placeholder="Correo electrónico"/>
                                        </div>                                         
                                      </div>  
                                      <div className="col-12">                                        
                                        <div className="input-group-prepend">
                                          <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                          <input type="password" ref="password" name="password" className="form-control form-control rounded" placeholder="Constraseña"/>
                                        </div>                                         
                                      </div> 
                                      <div className="col-12">                                        
                                        <div className="input-group-prepend">
                                          <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                          <input type="password" ref="confirmPassword" name="confirmPassword" className="form-control form-control rouded" placeholder="Confirmar Constraseña"/>
                                        </div>                                         
                                      </div> 
                                      <div className="col-12">  
                                        <div className="input-group-prepend">     
                                            <span className="input-group-text"><i className="fa fa-info-circle"></i></span>
                                            <select value={this.state.value} onChange={this.handleChange} className="form-control form-control rounded">
                                              <option value ="seleccione">Seleccione tipo de usuario</option>
                                              <option value="alumno">Alumno</option>
                                              <option value ="docente">Docente</option>                                      
                                            </select>                         
                                        </div>                                                                       
                                      </div>                                    
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
