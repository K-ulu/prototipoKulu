/* Se debe de guardar la clave del grupo? porque en alumnos no esta.. ahora con el userID no lo tenemos como 
  lo generamos en la clase alumnos si el usuario en turno es un docente?
  creo que es todo aunque no se como registrar un alumno con nombre y apellidos si el docente no crea usuario 
  solo alumnos.
  Si el docente registra a su alumno pero el alumno aun no ha confirmado siguen siendo sus alumnos?

  Verificar que cosas si se pueden editar pienso que el correo quiza.
  Porque se tiene que editar el id del docente?
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { withRouter } from "react-router-dom";
import { Session } from 'meteor/session';
import Select from 'react-select';
import HeaderMaestros from './components/HeaderMaestros';
import HeaderLeftMaestros from './components/HeaderLeftMaestros';

import {Grupos} from '../api/grupos.js';
import ListAlumnos from './ListAlumnos';
import Modal from 'react-modal';

class MaestroAlumnos extends React.Component { 
  constructor(){
    super()

    this.state = {
      isActive:false
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount(){
    Modal.setAppElement('body');
  }

  toggleModal = () =>{
    this.setState(
      {
        isActive:!this.state.isActive
      }
    )
  }

  //evento al mandar los datos del formulario
  onSubmit(e){
    e.preventDefault();
    //verifica contraseña
    let nombre = this.refs.nombre.value.trim();
    let apellidoP = this.refs.apellidoP.value.trim();
    let email = this.refs.email.value.trim();

    let claveEscuela = this.refs.claveEscuela.value.trim();
    let matricula = this.refs.matricula.value.trim();

    let grupo = this.state.value;    

    //creando nuestro objeto con los datos del usuario
    var datos = {
      email: email,
      password: "",
      profile: {
        nombre: nombre,
        apellidoP: apellidoP,
        apellidoM: "",
        nickname: "",
        curp: ""
      },
      tipoUsuario: "alumno"
    };
  
    /*//Aqui se crea el alumno
    var userId = Accounts.createUser(datos, (err) => {
      if(err){
        this.setState({error: err.reason});
        
      } else {
        this.setState({error: ''});
      }
    });
    */


    Meteor.call('alumnos.insert2', nombre, apellidoP, matricula, claveEscuela, email, (err, res) => {
      if (!err) {
        // this.handleModalClose();
        alert("insertado");
      } else {
        // this.setState({ error: err.reason });
        alert("ocurrió un error al insertar");
        alert(err.reason);
        console.log(err.reason);
      }
    });
    //this.props.history.push('/dashboard'); //Agregue para redireccionamiento al dashboard 
  }

  componentDidMount(){
    /*INICIO codigo para comportamiento del componente */
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

    $( document ).ready(function() {
      $('ul.sidebar-nav > li a').click(function() {
        $(this).parent().find('ul').toggle();
      });
    
    });
    $("#wrapper").toggleClass("toggled");
    /*FIND codigo para comportamiento del componente */
    //console.log(' didMount', this.props); 
  }

  //funcion para cerrar sesion
  onLogout(){    
    Accounts.logout();
    this.props.history.replace('/');
    Session.set('user', undefined); //borramos de la sesion los datos del usuario
  }

  toggleSidebar(){
    location.href='#menu-toggle';
  }

  quadFilter(){    
    //verificamos la clase para determinar el tipo de vista
    // si tiene la clase list cambiamos a quad
    if($('.section-cards').hasClass('list')){ 
      alert('es lista');
    } else {
      alert('ya es quad');
    }
    /*let cards = $('.section-cards .card'); //obtenemos las tarjeta
    console.log(cards);*/
    /*if($('.section-cards').has)
    $('.section-cards').toggleClass("col-12");
    $('.section-cards').addClass("col-6");*/
  }

  listFilter(){
    alert('lista');
  }

  logChange(val) {
    console.log("Selected: " + val);
  }

  render () {
    var options = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' }
    ];
    
    return (
      <div id="main" className="enlarged">
        {/*<!-- top bar navigation -->*/}
        <HeaderMaestros/>

        {/*Wrapper*/}
        <div id="wrapper">

        {/*Left Sidebar*/}
        <HeaderLeftMaestros/>
        {/*Content*/}
        <div id="page-content-wrapper">
          <div className="content">
            <div className="container-fluid">

              <div className="row">
                <div className="col-xl-12">
                  <div className="breadcrumb-holder">
                    <h1 className="main-title float-left">Dashboard - Alumnos</h1>
                    <ol className="breadcrumb float-right">
                      <li className="breadcrumb-item">Home</li>
                      <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                    <div className="clearfix"></div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div className="card noborder mb-3">
                    {/*<div className="card-header">
                      <h3>
                        <i className="fa fa-line-chart"></i> Items Sold Amount</h3>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non luctus metus. Vivamus fermentum ultricies orci sit amet
                      sollicitudin.
                    </div>*/}

                    <div className="card-body">
                      {/*title*/}
                      <div className="row justify-content-center">
                        <div className="col-6">
                          <h1>Mi Lista de Alumnos</h1>
                        </div>     
                      </div>

                      <div className="row justify-content-center">
                        <div className="col-10">
                          {/*buttons and filter options*/}
                          <div className="row justify-content-between">
                            <div className="col-2">
                              <button onClick={this.toggleModal} className="btn btn-primary btn-block">Nuevo</button>
                            </div>

                            <div className="col-2 btn-group" role="group" aria-label="Basic example">
                              <button onClick={this.quadFilter.bind(this)} type="button" className="btn btn-secondary"><i className="fa fa-th-large"></i></button>
                              <button onClick={this.listFilter.bind(this)} type="button" className="btn btn-secondary"><i className="fa fa-align-justify"></i></button>                          
                            </div> 
                          </div>
                          {/*Buscar alumnos mediante un select*/}
                          <div className="row justify-content-between">
                            <div className="col-12">
                              <form className="form-inline">
                                  <select /*value={this.state.value}*/ onChange={this.handleChange} className="form-control mr-4 col-lg-8">
                                      <option value ="seleccione">Seleccione un grupo!</option>
                                      <option value="alumno">Grupo A</option>
                                      <option value ="docente">Grupo B</option>                                      
                                  </select> 
                                  <button className="btn btn-outline-success col-lg-3" type="submit">Buscar</button>
                                  {/* <Select
                                    name="form-field-name"
                                    value="one"
                                    options={options}
                                    onChange={this.logChange}
                                  /> */}
                              </form>                  
                            </div>
                          </div>
                          {/* Aqui inicia para la lista de alumnos */}
                          <div className = "card-table">
                            <ListAlumnos handleEdit={this.handleEdit} />
                          </div>
                          {/*Cards 50%..*/}
                        </div>
                      </div>                   
                    </div>
                    {/*<div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>*/}
                  </div>
                </div>
              </div>
            </div>          
          </div>
        </div>
        {/*End Content*/}
      </div>
      {/*End Wrapper*/}
      
      <section className="row justify-content-center">
            <Modal 
              isOpen={this.state.isActive} 
              onRequestClose={this.toggleModal}
              contentLabel="Inline Styles Modal Example"
           style={{
              overlay: {
                //position: absolute,
                top: 60,
                left: 250,
                right: 250,
                bottom: 40,
              },
              content: {
                color: 'purple'
              }
            }}
            >
              <div >
                  <span className="anchor" id="formLogin"></span>
                  <div className="card rounded">
                    <div className="card-header mt-2">
                    <div className="row">
                      <div className="col-14 col-sm-6">
                        <h3 className="mb-0 text-center">Agregar Alumno!</h3>
                      </div>
                      <div className="col-2 col-sm-2 float:right">
                        <button onClick={this.toggleModal}>Cerrar!</button>
                      </div>
                      </div>
                    </div>
                      <div className="card-body mt-2">
                        <form onSubmit={this.onSubmit} className="form" role="form" autoComplete="off" id="formLogin">
                          <div className="row">
                            <div className="col-12 col-sm-6">
                              <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-user-circle-o"></i></span>
                                <input type="text" ref="nombre" name="nombre" className="form-control form-control rounded" placeholder="Nombre"/>
                              </div>                                          
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-user fa-fw"></i></span>
                                <input type="text" ref="apellidoP" name="apellidoP" className="form-control form-control rounded" placeholder="ApellidoP"/>
                              </div>                                                                          
                            </div>  
                            <div className="col-12">                                        
                              <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                <input type="email" ref="email" name="email" className="form-control form-control rounded" placeholder="Correo"/>
                              </div>                                         
                            </div>  
                            <div className="col-12">                                        
                              <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                <input type="text" ref="claveEscuela" name="claveEscuela" className="form-control form-control rounded" placeholder="Clave Escuela"/>
                              </div>                                         
                            </div> 
                            <div className="col-12">                                        
                              <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                <input type="text" ref="matricula" name="matricula" className="form-control form-control rouded" placeholder="Matricula"/>
                              </div>                                         
                            </div> 
                            <div className="col-12">  
                              <div className="input-group-prepend">     
                                  <span className="input-group-text"><i className="fa fa-info-circle"></i></span>
                                  <select value={this.state.value} onChange={this.handleChange} className="form-control form-control rounded">
                                    <option value ="seleccione">Grupo</option>
                                    <option value="grupoA">A</option>
                                    <option value ="grupoB">B</option>                                      
                                  </select>                         
                              </div>                                                                       
                            </div>                                    
                          </div>
                          <div className="row-login">
                            <button type="submit" className="btn btn-primary btn-lg text-center btn-block">Regístrar</button>
                          </div>
                        </form>
                      </div>
                      {/*<!--/card-block-->*/}
                  </div>
                  {/*<!-- /form card login -->*/}
                </div>
            </Modal>
      </section>
    </div>
    );
  }
}

export default withRouter(MaestroAlumnos);