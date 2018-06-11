import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './components/Navbar';
import NavbarUser from './components/NavbarUser';
import NavbarMaestro from './components/NavbarMaestro';
import MaestroNuevaSesion from './components/MaestroNuevaSesion';
import CarouselItems from './components/CarouselItems';
import Footer from './components/Footer';

export default class UsuarioDashboard extends React.Component {

  toggleSidebar(){
    location.href='#menu-toggle';
  }

  componentDidMount(){
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
    
    
  }

  render () {
    const isLoggedIn = this.props.isAuthenticated;

    let navbar = null;
    if (isLoggedIn) {
      navbar = <NavbarUser/>;
    } else {
      navbar = <Navbar/>;
    }
    return (
      <div id="main" className="enlarged">

        {/*<!-- top bar navigation -->*/}
        <div className="headerbar">    
          {/*<!-- LOGO -->*/}
          <div className="headerbar-left">
            <a href="#" className="logo">
            <img alt="Logo" src="images/kulu_logo_160.png" />
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
                      <small>
                        <span className="label label-danger pull-xs-right">5</span>Allerts</small>
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
                  <img src="images/admin.jpg" alt="Profile image" className="avatar-rounded"/>
                </a>
                <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                  {/*<!-- item-->*/}
                  <div className="dropdown-item noti-title">
                    <h5 className="text-overflow">
                      <small>Hello, user</small>
                    </h5>
                  </div>
    
                  {/*<!-- item-->*/}
                  <a href="pro-profile.html" className="dropdown-item notify-item">
                    <i className="fa fa-user"></i>
                    <span>Profile</span>
                  </a>
    
                  {/*<!-- item-->*/}
                  <a href="#" className="dropdown-item notify-item">
                    <i className="fa fa-power-off"></i>
                    <span>Logout</span>
                  </a>
    
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
                <span> Nueva Mini Sesión </span>
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

            {/*<li className="submenu">
              <a href="#">
                <span className="label radius-circle bg-danger float-right">20</span>
                <i className="fa fa-fw fa-copy"></i>
                <span> Example Pages </span>
              </a>
              <ul className="list-unstyled">
                <li>
                  <a href="page-pricing-tables.html">Pricing Tables</a>
                </li>
                <li>
                  <a target="_blank" href="page-coming-soon.html">Countdown</a>
                </li>
                <li>
                  <a href="page-invoice.html">Invoice</a>
                </li>
                <li>
                  <a href="page-login.html">Login / Register</a>
                </li>
                <li>
                  <a href="page-blank.html">Blank Page</a>
                </li>
              </ul>
            </li>

            <li className="submenu">
              <a href="#">
                <span className="label radius-circle bg-primary float-right">9</span>
                <i className="fa fa-fw fa-indent"></i>
                <span> Menu Levels </span>
              </a>
              <ul>
                <li>
                  <a href="#">
                    <span>Second Level</span>
                  </a>
                </li>
                <li className="submenu">
                  <a href="#">
                    <span>Third Level</span>
                    <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li>
                      <a href="#">
                        <span>Third Level Item</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span>Third Level Item</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>*/}

            


            
          </ul>
        </div>
        {/*End Left Sidebar*/}

        {/*Content*/}
        <div id="page-content-wrapper">
            <div className="container-fluid">
                <h1>Usuario Dashboard - Simple Sidebar</h1>
                <p>This template has a responsive menu toggling system. The menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will appear/disappear. On small screens, the page content will be pushed off canvas.</p>
                <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>.</p>
                {/*<a href="#menu-toggle" class="btn btn-secondary" id="menu-toggle">Toggle Menu</a>*/}
            </div>
        </div>
        {/*End Content*/}

      
      </div>
      {/*End Wrapper*/}


        {/*
        { navbar }
        <NavbarMaestro/>
        <MaestroNuevaSesion/>
        <CarouselItems name="Materias"/>
        <CarouselItems name="Bloques"/>
        <CarouselItems name="Articulos Destacados"/>
        <CarouselItems name="Documentos Recientes"/>
        <Footer/>*/}
      </div>
    );
  }
}
