import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Error from './components/Error'

import { Alumnos } from "../api/alumnos";

Tracker.autorun(() => {
  Meteor.subscribe('allUsers');	
  Meteor.subscribe('alumnos');
});


function DefaultSelect(props) {
  return (
    <React.Fragment>
      <option value="alumno">Alumno</option>
      <option value ="docente">Docente</option>     
    </React.Fragment>
  );
}

function SelectAdminContenido(props) {
  return <option value ="adminContenido">Administrador de Contenidos</option>;
}

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
      //this.props.history.push('/teachers'); //Este era el que se tenia antes
      this.props.history.push('/dashboard');
    }
  }

  //evento que administra el cambio de datos en el select
  handleChange(event){
    this.setState({value: event.target.value});
  }

  //evento al mandar los datos del formulario
  onSubmit(e){
    e.preventDefault();
    // Meteor.subscribe("alumnos", id);
    Meteor.subscribe('allUsers');	

    //verifica contraseña
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    let confirmPassword = this.refs.confirmPassword.value.trim();
    let opcion = this.state.value;    

    let nombre = this.refs.name.value.trim();
    let apellidoP = '';
    let apellidoM = '';
    let nickname = this.refs.username.value.trim();
    let curp = '';

    let correos = [{address: email, verified:false}];
    console.log(correos);

    //Verifica que los alumnos registrados tengan correos en la coleccion users
    console.log(Meteor.users.find({}).fetch());

    let userAlumno = Meteor.users.findOne({ emails: correos }); // will return all users
    console.log(userAlumno);

    if ( userAlumno != undefined ){
      console.log(userAlumno, userAlumno.tipoUsuario, opcion);
      if ( userAlumno.tipoUsuario == "alumno" && opcion == "alumno"){
        console.log(userAlumno._id);
        apellidoP = userAlumno.profile.apellidoP;
        Meteor.call('users.remove', userAlumno._id, (err, res) => {
          if (!err) {
            console.log("Eliminado!");
            // this.handleModalClose();
          } else {
            this.setState({error: ''});
          }
        });
      }
    } 

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

    console.log('id del nuevo usuario: ', Meteor.userId());

    //insertamos los datos de acuerdo al tipo de usuario
    console.log(opcion);
    if(opcion == 'docente'){
      var claveDocente= '';
      var claveEscuela = '';
      var rfc = '';
      Meteor.call('docentes.insert', claveDocente, claveEscuela,rfc, (err, res) => {
        if (!err) {
          // this.handleModalClose();
          alert("insertado");
        } else {
          this.setState({error: ''});
        }
      });
      this.props.history.push('/dashboard'); //Agregue para redireccionamiento al dashboard
    }
    else if (opcion == 'alumno' && userAlumno == undefined ){
        var matricula = "";
        var claveEscuela = '';
        Meteor.call('alumnos.insert', matricula, claveEscuela, email,"no registrado", (err, res) => {
          if (!err) {
            // this.handleModalClose();
            //alert("insertado");
          } else {
            // this.setState({ error: err.reason });
            alert("ocurrió un error al insertar");
            alert(err.reason);
          }
        });
        this.props.history.push('/dashboard'); //Agregue para redireccionamiento al dashboard
    } else if(opcion == 'adminContenido'){
      //TODO:hacer inserciones en la tabla de administradores de contenido
      this.props.history.push('/dashboard'); //Agregue para redireccionamiento al dashboard
    }
    else if (opcion == 'alumno' && userAlumno != undefined){
      let myID = Alumnos.findOne({correo: email});
      Meteor.call('alumnos.updateStatus', myID._id, "registrado", (err, res) => {
        if (!err) {
          // this.handleModalClose();
        } else {
          // this.setState({ error: err.reason });
          console.log(err.reason);
        }
      });
      this.props.history.push('/dashboard'); //Agregue para redireccionamiento al dashboard
    }
    else{
      alert("Contrasenias desiguales");
    }    
  }
  

  render () {
    let errorMessage = null, error;
    let pathname = this.props.history.location.pathname;
    //verificamos url para determinar que opciones mostrar
    let select = (pathname == '/admin-contenido' || pathname == '/admin-contenido/') ? <SelectAdminContenido/> : <DefaultSelect/>;
    errorMessage = (this.state.error) ? this.state.error : undefined;
    //determinamos error a mostrar si es que lo hay
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
                <div className="col-md-9 col-lg-6 mx-auto">
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
                            <div className="col-12 col-sm-6">
                              <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-user-circle-o"></i></span>
                                <input type="text" ref="username" name="username" className="form-control form-control rounded" placeholder="Usuario"/>
                              </div>                                          
                            </div>
                            <div className="col-12 col-sm-6">
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
                                    { select }
                                    {/*<option value="alumno">Alumno</option>
                                    <option value ="docente">Docente</option>  */}                                    
                                  </select>                         
                              </div> 
                                                                                             
                            </div>                                    
                          </div>

                          <div className="text-center">
                            <a href="recuperar.html">¿Olvidaste tu contraseña?</a> ó <a href="/login">¿Ya tienes una cuenta?</a>
                          </div>
                          <div className="row-login">
                            <button type="submit" className="btn btn-primary btn-lg text-center btn-block">Regístrarse</button>
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
