import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { withRouter } from "react-router-dom";
import { Session } from 'meteor/session';

class MaestroElementosNuevo extends React.Component {

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

    
    console.log(' didMount', this.props);   
    console.log('url ', this.props.history.location.pathname);
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

  

  render () {
    return (
      <div id="main" className="enlarged">

        {/*<!-- top bar navigation -->*/}
        <div className="headerbar">    
          {/*<!-- LOGO -->*/}
          <div className="headerbar-left">
            <a href="#" className="logo">
            <img alt="Logo" src="/images/kulu_logo_160.png" />
              {/*<span>  Admin</span>*/}
            </a>
          </div>
  
          <nav className="navbar-custom">    
            <ul className="list-inline float-right mb-0">    
              <li className="list-inline-item dropdown notif">
                <a className="nav-link dropdown-toggle arrow-none" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                  <i className="fa fa-fw fa-question-circle"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-arrow-success dropdown-lg">
                  {/*<!-- item-->*/}
                  <div className="dropdown-item noti-title">
                    <h5>
                      <small>Help and Support</small>
                    </h5>
                  </div>
    
                  {/*<!-- item-->*/}
                  <a target="_blank" href="https://www.pikeadmin.com" className="dropdown-item notify-item">
                    <p className="notify-details ml-0">
                      <b>Do you want custom development to integrate this theme?</b>
                      <span>Contact Us</span>
                    </p>
                  </a>
    
                  {/*<!-- item-->*/}
                  <a target="_blank" href="https://www.pikeadmin.com/pike-admin-pro" className="dropdown-item notify-item">
                    <p className="notify-details ml-0">
                      <b>Do you want PHP version of the theme that save dozens of hours of work?</b>
                      <span>Try Pike Admin PRO</span>
                    </p>
                  </a>
    
                  {/*<!-- All-->*/}
                  <a title="Clcik to visit Pike Admin Website" target="_blank" href="https://www.pikeadmin.com" className="dropdown-item notify-item notify-all">
                    <i className="fa fa-link"></i> Visit Pike Admin Website
                  </a>
    
                </div>
              </li>
    
              <li className="list-inline-item dropdown notif">
                <a className="nav-link dropdown-toggle arrow-none" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                  <i className="fa fa-fw fa-envelope-o"></i>
                  <span className="notif-bullet"></span>
                </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-arrow-success dropdown-lg">
                  {/*<!-- item-->*/}
                  <div className="dropdown-item noti-title">
                    <h5>
                      <small>
                        <span className="label label-danger pull-xs-right">12</span>Contact Messages</small>
                    </h5>
                  </div>
    
                  {/*<!-- item-->*/}
                  <a href="#" className="dropdown-item notify-item">
                    <p className="notify-details ml-0">
                      <b>Jokn Doe</b>
                      <span>New message received</span>
                      <small className="text-muted">2 minutes ago</small>
                    </p>
                  </a>
    
                  {/*<!-- item-->*/}
                  <a href="#" className="dropdown-item notify-item">
                    <p className="notify-details ml-0">
                      <b>Michael Jackson</b>
                      <span>New message received</span>
                      <small className="text-muted">15 minutes ago</small>
                    </p>
                  </a>
    
                  {/*<!-- item-->*/}
                  <a href="#" className="dropdown-item notify-item">
                    <p className="notify-details ml-0">
                      <b>Foxy Johnes</b>
                      <span>New message received</span>
                      <small className="text-muted">Yesterday, 13:30</small>
                    </p>
                  </a>
    
                  {/*<!-- All-->*/}
                  <a href="#" className="dropdown-item notify-item notify-all">
                    View All
                  </a>
    
                </div>
              </li>
    
              <li className="list-inline-item dropdown notif">
                <a className="nav-link dropdown-toggle arrow-none" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                  <i className="fa fa-fw fa-bell-o"></i>
                  <span className="notif-bullet"></span>
                </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-lg">
                  {/*<!-- item-->*/}
                  <div className="dropdown-item noti-title">
                    <h5>
                      <small><span className="label label-danger pull-xs-right">5</span>Allerts</small>
                    </h5>
                  </div>
    
                  {/*<!-- item-->*/}
                  <a href="#" className="dropdown-item notify-item">
                    <div className="notify-icon bg-faded">
                      <img src="images/admin.jpg" alt="img" className="rounded-circle img-fluid"/>
                    </div>
                    <p className="notify-details">
                      <b>John Doe</b>
                      <span>User registration</span>
                      <small className="text-muted">3 minutes ago</small>
                    </p>
                  </a>
    
                  {/*<!-- item-->*/}
                  <a href="#" className="dropdown-item notify-item">
                    <div className="notify-icon bg-faded">
                      <img src="images/admin.jpg" alt="img" className="rounded-circle img-fluid"/>
                    </div>
                    <p className="notify-details">
                      <b>Michael Cox</b>
                      <span>Task 2 completed</span>
                      <small className="text-muted">12 minutes ago</small>
                    </p>
                  </a>
    
                  {/*<!-- item-->*/}
                  <a href="#" className="dropdown-item notify-item">
                    <div className="notify-icon bg-faded">
                      <img src="images/admin.jpg" alt="img" className="rounded-circle img-fluid"/>
                    </div>
                    <p className="notify-details">
                      <b>Michelle Dolores</b>
                      <span>New job completed</span>
                      <small className="text-muted">35 minutes ago</small>
                    </p>
                  </a>
    
                  {/*<!-- All-->*/}
                  <a href="#" className="dropdown-item notify-item notify-all">
                    View All Allerts
                  </a>
    
                </div>
              </li>
    
              <li className="list-inline-item dropdown notif">
                <a className="nav-link dropdown-toggle nav-user" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                  <img src="/images/admin.jpg" alt="Profile image" className="avatar-rounded"/>
                </a>
                <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                  {/*<!-- item-->*/}
                  <div className="dropdown-item noti-title">
                    <h5 className="text-overflow">
                      <small>Hello, usuario  </small>
                    </h5>
                  </div>
    
                  {/*<!-- item-->*/}
                  <a href="pro-profile.html" className="dropdown-item notify-item">
                    <i className="fa fa-user"></i>
                    <span>Profile</span>
                  </a>    
                  
                  {/*<!-- item-->*/}
                  <button onClick={this.onLogout.bind(this)} className="dropdown-item notify-item">
                    <i className="fa fa-power-off"></i>
                    <span>Logout</span>
                  </button>
    
                  {/*<!-- item-->*/}
                  <a target="_blank" href="https://www.pikeadmin.com" className="dropdown-item notify-item">
                    <i className="fa fa-external-link"></i>
                    <span>Pike Admin</span>
                  </a>
                </div>
              </li>
    
            </ul>
    
            <ul className="list-inline menu-left mb-0">
              <li className="float-left">              
                <button className="button-menu-mobile open-left" id="menu-toggle" onClick={this.toggleSidebar.bind(this)}>
                  <i className="fa fa-fw fa-bars"></i>
                </button>
              </li>
            </ul>
    
          </nav>
  
        </div>
      {/*<!-- End Navigation-->*/}

      {/*Wrapper*/}
      <div id="wrapper">

        {/*Left Sidebar*/}
        <div id="sidebar-wrapper">

          <ul className="sidebar-nav">

            <li className="submenu">
              <a className="active" href="/teachers">
                <i className="fa fa-fw fa-bars"></i>
                <span> Dashboard </span>
              </a>
            </li>

            <li className="submenu">
              <a className="nuevaSesion" href="#">
                <i className="fa fa-fw fa-play"></i>
                <span> Nueva Sesión </span>
              </a>
            </li>

            <li className="submenu">
              <a href="#">
                <i className="fa fa-fw fa-eye"></i>
                <span> Explorar </span>
              </a>
            </li>

            <li className="submenu">
              <a href="#">
                <i className="fa fa-fw fa-book"></i>
                <span> Biblioteca </span>
                <span className="menu-arrow"></span>
              </a>
              <ul className="list-unstyled">
                <li>
                  <a href="forms-general.html">
                    <i className="fa fa-fw fa-copy"></i>
                    <span> Libros </span>
                  </a>
                </li>
                <li>
                  <a href="forms-select2.html">
                    <i className="fa fa-fw fa-headphones"></i>
                    <span> Cont. Mult. </span>
                  </a>
                </li>   
                <li>
                  <a href="forms-select2.html">
                    <i className="fa fa-fw fa-file-text-o"></i>
                    <span> Documentos </span>
                  </a>
                </li>    
                <li>
                  <a href="forms-select2.html">
                    <i className="fa fa-fw fa-address-book"></i>
                    <span> Obj. de Aprend. </span>
                  </a>
                </li>      
                <li>
                  <a href="forms-select2.html">
                    <i className="fa fa-fw fa-cogs"></i>
                    <span> Elem. de Aprend. </span>
                  </a>
                </li>         
              </ul>
            </li> 

            <li className="submenu">
              <a href="#">
                <i className="fa fa-fw fa-user"></i>
                <span> Mis Alumnos </span>
              </a>
            </li>            

            <li className="submenu">
              <a href="#">
                <i className="fa fa-fw fa-users"></i>
                <span> Mis Grupos </span>
              </a>
            </li>

            <li className="submenu">
              <a href="#">
                <i className="fa fa-fw fa-headphones"></i>
                <span> Mi Cont. Mult. </span>
              </a>
            </li>

            <li className="submenu">
              <a href="#">
                <i className="fa fa-fw fa-file-text-o"></i>
                <span> Mis Documentos </span>
              </a>
            </li>            

            <li className="submenu">
              <a className="pro" href="#">
                <i className="fa fa-fw fa-star"></i>
                <span> K'ulu' PRO </span>
                <span className="menu-arrow"></span>
              </a>
              <ul className="list-unstyled">
                <li>
                  <a target="_blank" href="https://www.pikeadmin.com/pike-admin-pro">Admin PRO features</a>
                </li>
                <li>
                  <a href="pro-settings.html">Settings</a>
                </li>
                <li>
                  <a href="pro-profile.html">My Profile</a>
                </li>
                <li>
                  <a href="pro-users.html">Users</a>
                </li>
                <li>
                  <a href="pro-articles.html">Articles</a>
                </li>
                <li>
                  <a href="pro-categories.html">Categories</a>
                </li>
                <li>
                  <a href="pro-pages.html">Pages</a>
                </li>
                <li>
                  <a href="pro-contact-messages.html">Contact Messages</a>
                </li>
                <li>
                  <a href="pro-slider.html">Slider</a>
                </li>
              </ul>
            </li>


            
          </ul>
        </div>
        {/*End Left Sidebar*/}

        {/*Content*/}
        <div id="page-content-wrapper">
          <div className="content">
            <div className="container-fluid">

              <div className="row">
                <div className="col-xl-12">
                  <div className="breadcrumb-holder">
                    <h1 className="main-title float-left">Dashboard - Elementos</h1>
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
                        <div className="col-10">
                          <h1 className="text-center">Nuevo Contenido Multimedia</h1>
                          <p className="mt-5">Est dolore eiusmod Lorem Lorem Est dolore eiusmod Lorem Lorem Est dolore eiusmod Lorem Lorem Est dolore eiusmod Lorem Lorem Est dolore eiusmod Lorem Lorem Est dolore eiusmod Lorem Lorem Est dolore eiusmod Lorem Lorem Est dolore eiusmod Lorem Lorem.</p>
                        </div>     
                      </div>

                      <div className="row justify-content-center">
                        <div className="col-10">
                        <form action="/file-upload" className="dropzone" id="my-awesome-dropzone">        
                          <div className="dz-message needsclick">
                            Arrastra para agregar nuevos archivos o haz clic aquí.<br />
                            <span className="note needsclick">(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span>
                          </div>                
                        </form>



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

export default withRouter(MaestroElementosNuevo);