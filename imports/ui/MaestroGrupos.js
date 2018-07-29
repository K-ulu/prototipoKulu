import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { withRouter } from "react-router-dom";
import { Session } from 'meteor/session';
import HeaderMaestros from './components/HeaderMaestros';
import HeaderLeftMaestros from './components/HeaderLeftMaestros';
import Modal from 'react-modal';

import ListGrupo from './ListGrupos';

class MaestroGrupos extends React.Component{
  constructor(){
    super()
    this.state = {
      isActive:false,
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
    let grado = this.refs.grado.value.trim();
    let grupo = this.refs.grupo.value.trim();
    let nombreGrupo = this.refs.nombreGrupo.value.trim();

    let claveEscuela = this.refs.claveEscuela.value.trim();

    Meteor.call('grupos.insert', nombreGrupo, grado, grupo, claveEscuela, (err, res) => {
      if (!err) {
        alert("insertado");
      } else {
        alert("ocurrió un error al insertar");
        alert(err.reason);
        console.log(err.reason);
      }
    });
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
                    <h1 className="main-title float-left">Dashboard - Grupos</h1>
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
                    <div className="card-body">
                      {/*title*/}
                      <div className="row justify-content-center">
                        <div className="col-6">
                          <h1>Mi Lista de Grupos</h1>
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
                          {/*Buscar grupo mediante un buscardo*/}
                          <div className="row justify-content-between">
                            <div className="col-12">
                                <form className="form-inline">
                                <input className="form-control mr-4 col-lg-8" type="text" placeholder="Buscar..."/>
                                <button className="btn btn-outline-success col-lg-3" type="submit">Buscar</button>
                                </form>                  
                            </div>
                          </div>
                          {/* Aqui inicia para la lista de grupos */}
                            <div className = "card-table" >
                                <ListGrupo handleEdit={this.handleEdit} />
                            </div>             
                        </div>
                      </div>                   
                    </div>

                    
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
                        <h3 className="mb-0 text-center">Agregar Grupo!</h3>
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
                                <input type="text" ref="grado" name="grado" className="form-control form-control rounded" placeholder="Grado"/>
                              </div>                                          
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-user fa-fw"></i></span>
                                <input type="text" ref="grupo" name="grupo" className="form-control form-control rounded" placeholder="Grupo"/>
                              </div>                                                                          
                            </div>  
                            <div className="col-12">                                        
                              <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                <input type="text" ref="nombreGrupo" name="nombreGrupo" className="form-control form-control rounded" placeholder="nombreGrupo"/>
                              </div>                                         
                            </div>  
                            <div className="col-12">                                        
                              <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                <input type="text" ref="claveEscuela" name="claveEscuela" className="form-control form-control rounded" placeholder="Clave Escuela"/>
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
 
export default withRouter(MaestroGrupos);
