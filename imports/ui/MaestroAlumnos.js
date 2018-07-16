import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { withRouter } from "react-router-dom";
import { Session } from 'meteor/session';
import Select from 'react-select';
import HeaderMaestros from './components/HeaderMaestros';
import HeaderLeftMaestros from './components/HeaderLeftMaestros';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import {Grupos} from '../api/grupos.js';
import {Alumnos} from '../api/alumnos.js';

class MaestroAlumnos extends TrackerReact(React.Component) { 
  resolutions(){
    console.log(Alumnos.find().fetch());
    return Alumnos.find().fetch();
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

    console.log(this.resolutions());
    let res = this.resolutions();
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
                              <button className="btn btn-primary btn-block">Nuevo</button>
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
                                  <Select
                                    name="form-field-name"
                                    value="one"
                                    options={options}
                                    onChange={this.logChange}
                                  />
                              </form>                  
                            </div>
                          </div>
                          {/* Aqui inicia para la lista de alumnos */}
                          {/*Cards 100%..*/}
                          <div className="row">
                            <div className="col-12 section-cards list">
                              <div className="card">
                                <div className="card-body">
                                  <div className="row justify-content-between">
                                    <div className="col-8">
                                      <h5 className="card-title">Card title</h5>
                                      <h6 className="card-subtitle mb-2 text-muted">Audio</h6>
                                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>                            
                                    </div>                          
                                    <div className="col-2">
                                      <div className="btn-group" role="group" aria-label="Basic example">                            
                                        <button type="button" className="btn btn-secondary success-btn"><i className="fa fa-pencil"></i></button>                          
                                        <button type="button" className="btn btn-secondary danger-btn"><i className="fa fa-trash"></i></button>
                                      </div>  
                                    </div> 
                                  </div>
                                </div>
                              </div>                          
                            </div>                        
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
    </div>
    );
  }
}

export default withRouter(MaestroAlumnos);