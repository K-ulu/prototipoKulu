import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './components/Navbar';
import NavbarUser from './components/NavbarUser';
import NavbarMaestro from './components/NavbarMaestro';
import MaestroNuevaSesion from './components/MaestroNuevaSesion';
import CarouselItems from './components/CarouselItems';
import Footer from './components/Footer';


export default class MaestroDashboard extends React.Component{

  componentDidMount(){
    /*$('.open-left').on('click', () => {
      alert();
    });*/
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
      <div id="body" className="adminbody ">

        <div id="main">
        
          {/* top bar navigation*/}
          <div className="headerbar">
          {/*Logo n*/} 
          <div className="headerbar-left">
            <a href="index.html" className="logo">
              <img alt="Logo" src="images/kulu_logo_160.png" />
              <span>Maestros</span>
            </a>
          </div>

          <nav className="navbar-custom">
            <ul className="list-inline float-right mb-0">

            <li className="list-inline-item dropdown notif">
              <a className="nav-link dropdown-toggle arrow-none" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                <i className="fa fa-fw fa-question-circle"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-arrow-success dropdown-lg">
                {/*item*/}
                <div className="dropdown-item-dash noti-title">
                  <h5>
                    <small>Help and Support</small>
                  </h5>
                </div>

                {/*item*/}
                <a target="_blank" href="https://www.pikeadmin.com" className="dropdown-item-dash notify-item">
                  <p className="notify-details ml-0">
                    <b>Do you want custom development to integrate this theme?</b>
                    <span>Contact Us</span>
                  </p>
                </a>

                {/*item*/}
                <a target="_blank" href="https://www.pikeadmin.com/pike-admin-pro" className="dropdown-item-dash notify-item">
                  <p className="notify-details ml-0">
                    <b>Do you want PHP version of the theme that save dozens of hours of work?</b>
                    <span>Try Pike Admin PRO</span>
                  </p>
                </a>

                {/*All*/}
                <a title="Clcik to visit Pike Admin Website" target="_blank" href="https://www.pikeadmin.com" className="dropdown-item-dash notify-item notify-all">
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
                {/*item*/}
                <div className="dropdown-item-dash noti-title">
                  <h5>
                    <small>
                      <span className="label label-danger pull-xs-right">12</span>Contact Messages</small>
                  </h5>
                </div>

                {/*item*/}
                <a href="#" className="dropdown-item-dash notify-item">
                  <p className="notify-details ml-0">
                    <b>Jokn Doe</b>
                    <span>New message received</span>
                    <small className="text-muted">2 minutes ago</small>
                  </p>
                </a>

                {/*item*/}
                <a href="#" className="dropdown-item-dash notify-item">
                  <p className="notify-details ml-0">
                    <b>Michael Jackson</b>
                    <span>New message received</span>
                    <small className="text-muted">15 minutes ago</small>
                  </p>
                </a>

                {/*item*/}
                <a href="#" className="dropdown-item-dash notify-item">
                  <p className="notify-details ml-0">
                    <b>Foxy Johnes</b>
                    <span>New message received</span>
                    <small className="text-muted">Yesterday, 13:30</small>
                  </p>
                </a>

                {/*All*/}
                <a href="#" className="dropdown-item-dash notify-item notify-all">
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
                {/*item*/}
                <div className="dropdown-item-dash noti-title">
                  <h5>
                    <small>
                      <span className="label label-danger pull-xs-right">5</span>Allerts</small>
                  </h5>
                </div>

                {/*item*/}
                <a href="#" className="dropdown-item-dash notify-item">
                  <div className="notify-icon bg-faded">
                    <img src="assets/images/avatars/avatar2.png" alt="img" className="rounded-circle img-fluid"/>
                  </div>
                  <p className="notify-details">
                    <b>John Doe</b>
                    <span>User registration</span>
                    <small className="text-muted">3 minutes ago</small>
                  </p>
                </a>

                {/*item*/}
                <a href="#" className="dropdown-item-dash notify-item">
                  <div className="notify-icon bg-faded">
                    <img src="assets/images/avatars/avatar3.png" alt="img" className="rounded-circle img-fluid"/>
                  </div>
                  <p className="notify-details">
                    <b>Michael Cox</b>
                    <span>Task 2 completed</span>
                    <small className="text-muted">12 minutes ago</small>
                  </p>
                </a>

                {/*item*/}
                <a href="#" className="dropdown-item-dash notify-item">
                  <div className="notify-icon bg-faded">
                    <img src="assets/images/avatars/avatar4.png" alt="img" className="rounded-circle img-fluid"/>
                  </div>
                  <p className="notify-details">
                    <b>Michelle Dolores</b>
                    <span>New job completed</span>
                    <small className="text-muted">35 minutes ago</small>
                  </p>
                </a>

                {/*item*/}
                <a href="#" className="dropdown-item-dash notify-item notify-all">
                  View All Allerts
                </a>

              </div>
            </li>

            <li className="list-inline-item dropdown notif">
              <a className="nav-link dropdown-toggle nav-user" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                <img src="assets/images/avatars/admin.png" alt="Profile image" className="avatar-rounded"/>
              </a>
              <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                {/*item*/}
                <div className="dropdown-item-dash noti-title">
                  <h5 className="text-overflow">
                    <small>Hello, admin</small>
                  </h5>
                </div>

                {/*item*/}
                <a href="pro-profile.html" className="dropdown-item-dash notify-item">
                  <i className="fa fa-user"></i>
                  <span>Profile</span>
                </a>

                {/*item*/}
                <a href="#" className="dropdown-item-dash notify-item">
                  <i className="fa fa-power-off"></i>
                  <span>Logout</span>
                </a>

                {/*item*/}
                <a target="_blank" href="https://www.pikeadmin.com" className="dropdown-item-dash notify-item">
                  <i className="fa fa-external-link"></i>
                  <span>Pike Admin</span>
                </a>
              </div>
            </li>

          </ul>

          <ul className="list-inline menu-left mb-0">
            <li className="float-left">
              <button className="button-menu-mobile open-left">
                <i className="fa fa-fw fa-bars"></i>
              </button>
            </li>
          </ul>

          </nav>

          </div>      
          {/*End Navigation*/} 


          {/* Left sidebar*/}
          <div className="left main-sidebar">
            <div className="sidebar-inner leftscroll">
              <div id="sidebar-menu">
                <ul>

                  <li className="submenu">
                    <a className="active" href="/teachers">
                      <i className="fa fa-fw fa-bars"></i>
                      <span> Dashboard </span>
                    </a>
                  </li>
      
                  <li className="submenu">
                    <a href="charts.html">
                      <i className="fa fa-fw fa-area-chart"></i>
                      <span> Alumnos </span>
                    </a>
                  </li>
      
                  <li className="submenu">
                    <a href="#">
                      <i className="fa fa-fw fa-table"></i>
                      <span> Grupos </span>
                      <span className="menu-arrow"></span>
                    </a>
                    <ul className="list-unstyled">
                      <li>
                        <a href="tables-basic.html">Basic Tables</a>
                      </li>
                      <li>
                        <a href="tables-datatable.html">Data Tables</a>
                      </li>
                    </ul>
                  </li>
      
                  <li className="submenu">
                    <a href="#">
                      <i className="fa fa-fw fa-tv"></i>
                      <span> Sesiones de Aprendizajes </span>
                      <span className="menu-arrow"></span>
                    </a>
                    <ul className="list-unstyled">
                      <li>
                        <a href="ui-alerts.html">Alerts</a>
                      </li>
                      <li>
                        <a href="ui-buttons.html">Buttons</a>
                      </li>
                      <li>
                        <a href="ui-cards.html">Cards</a>
                      </li>
                      <li>
                        <a href="ui-carousel.html">Carousel</a>
                      </li>
                      <li>
                        <a href="ui-collapse.html">Collapse</a>
                      </li>
                      <li>
                        <a href="ui-icons.html">Icons</a>
                      </li>
                      <li>
                        <a href="ui-modals.html">Modals</a>
                      </li>
                      <li>
                        <a href="ui-tooltips.html">Tooltips and Popovers</a>
                      </li>
                    </ul>
                  </li>
      
                  <li className="submenu">
                    <a href="#">
                      <i className="fa fa-fw fa-file-text-o"></i>
                      <span> Mi Contenido Multimedia </span>
                      <span className="menu-arrow"></span>
                    </a>
                    <ul className="list-unstyled">
                      <li>
                        <a href="forms-general.html">General Elements</a>
                      </li>
                      <li>
                        <a href="forms-select2.html">Select2</a>
                      </li>
                      <li>
                        <a href="forms-validation.html">Form Validation</a>
                      </li>
                      <li>
                        <a href="forms-text-editor.html">Text Editors</a>
                      </li>
                      <li>
                        <a href="forms-upload.html">Multiple File Upload</a>
                      </li>
                      <li>
                        <a href="forms-datetime-picker.html">Date and Time Picker</a>
                      </li>
                      <li>
                        <a href="forms-color-picker.html">Color Picker</a>
                      </li>
                    </ul>
                  </li>
      
                  <li className="submenu">
                    <a href="#">
                      <i className="fa fa-fw fa-th"></i>
                      <span> Mis Documentos </span>
                      <span className="menu-arrow"></span>
                    </a>
                    <ul className="list-unstyled">
                      <li>
                        <a href="star-rating.html">Star Rating</a>
                      </li>
                      <li>
                        <a href="range-sliders.html">Range Sliders</a>
                      </li>
                      <li>
                        <a href="tree-view.html">Tree View</a>
                      </li>
                      <li>
                        <a href="sweetalert.html">SweetAlert</a>
                      </li>
                      <li>
                        <a href="calendar.html">Calendar</a>
                      </li>
                      <li>
                        <a href="gmaps.html">GMaps</a>
                      </li>
                      <li>
                        <a href="counter-up.html">Counter-Up</a>
                      </li>
                    </ul>
                  </li>
      
                  <li className="submenu">
                    <a href="#">
                      <i className="fa fa-fw fa-image"></i>
                      <span> Objetos de Aprendizaje </span>
                      <span className="menu-arrow"></span>
                    </a>
                    <ul className="list-unstyled">
                      <li>
                        <a href="media-fancybox.html">
                          <span className="label radius-circle bg-danger float-right">cool</span> Fancybox </a>
                      </li>
                      <li>
                        <a href="media-masonry.html">Masonry</a>
                      </li>
                      <li>
                        <a href="media-lightbox.html">Lightbox</a>
                      </li>
                      <li>
                        <a href="media-owl-carousel.html">Owl Carousel</a>
                      </li>
                      <li>
                        <a href="media-image-magnifier.html">Image Magnifier</a>
                      </li>
      
                    </ul>
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
                        <ul >
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
      
                  {/*<li className="submenu">
                    <a className="pro" href="#">
                      <i className="fa fa-fw fa-star"></i>
                      <span> Pike Admin PRO </span>
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
                </li>*/}
      
                </ul>
                <div className="clearfix"></div>

              </div>
              <div className="clearfix"></div>

            </div>

          </div>
          {/*End sidebar*/} 


          <div className="content-page">

            {/*Start content*/}          
            <div className="content">

              <div className="container-fluid">

                <div className="row">
                  <div className="col-xl-12">
                    <div className="breadcrumb-holder">
                      <h1 className="main-title float-left">Dashboard</h1>
                      <ol className="breadcrumb float-right">
                        <li className="breadcrumb-item">Home</li>
                        <li className="breadcrumb-item active">Dashboard</li>
                      </ol>
                      <div className="clearfix"></div>
                    </div>
                  </div>
                </div>
                {/*end row*/}   

                

                <div className="row">
                  <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
                    <div className="card-box noradius noborder bg-default">
                      <i className="fa fa-file-text-o float-right text-white"></i>
                      <h6 className="text-white text-uppercase m-b-20">Documentos</h6>
                      <h1 className="m-b-20 text-white counter">1,587</h1>
                      <span className="text-white">15 Nuevos Docs</span>
                    </div>
                  </div>

                  <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
                    <div className="card-box noradius noborder bg-warning">
                      <i className="fa fa-bar-chart float-right text-white"></i>
                      <h6 className="text-white text-uppercase m-b-20">Historial</h6>
                      <h1 className="m-b-20 text-white counter">32</h1>
                      <span className="text-white">Crea una nueva</span>
                    </div>
                  </div>

                  <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
                    <div className="card-box noradius noborder bg-info">
                      <i className="fa fa-user-o float-right text-white"></i>
                      <h6 className="text-white text-uppercase m-b-20">Alumnos</h6>
                      <h1 className="m-b-20 text-white counter">32</h1>
                      <span className="text-white">25 Nuevos Alumnos</span>
                    </div>
                  </div>

                  <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
                    <div className="card-box noradius noborder bg-danger">
                      <i className="fa fa-bell-o float-right text-white"></i>
                      <h6 className="text-white text-uppercase m-b-20">Urgente</h6>
                      <h1 className="m-b-20 text-white counter">7</h1>
                      <span className="text-white">5 Nuevas Alertas</span>
                    </div>
                  </div>
                </div>
                {/*end row*/}   


                <div className="row">

                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                    <div className="card mb-3">
                      <div className="card-header">
                        <h3>
                          <i className="fa fa-line-chart"></i> Items Sold Amount</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non luctus metus. Vivamus fermentum ultricies orci sit amet
                        sollicitudin.
                      </div>

                      <div className="card-body">
                        <canvas id="lineChart"></canvas>
                      </div>
                      <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                    </div>
                    {/*end card*/}   
                  </div>

                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-3">
                    <div className="card mb-3">
                      <div className="card-header">
                        <h3>
                          <i className="fa fa-bar-chart-o"></i> Colour Analytics</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non luctus metus. Vivamus fermentum ultricies orci sit amet
                        sollicitudin.
                      </div>

                      <div className="card-body">
                        <canvas id="pieChart"></canvas>
                      </div>
                      <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                    </div>
                    {/*end card*/}   
                  </div>

                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-3">
                    <div className="card mb-3">
                      <div className="card-header">
                        <h3>
                          <i className="fa fa-bar-chart-o"></i> Colour Analytics 2</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non luctus metus. Vivamus fermentum ultricies orci sit amet
                        sollicitudin.
                      </div>

                      <div className="card-body">
                        <canvas id="doughnutChart"></canvas>
                      </div>
                      <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                    </div>
                    {/*end card*/}   
                  </div>

                </div>
                {/*end row*/}   

                <div className="row">

                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                    <div className="card mb-3">
                      <div className="card-header">
                        <h3>
                          <i className="fa fa-users"></i> Staff details</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non luctus metus. Vivamus fermentum ultricies orci sit amet
                        sollicitudin.
                      </div>

                      <div className="card-body">

                        <table id="example1" className="table table-bordered table-responsive-xl table-hover display">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Position</th>
                              <th>Office</th>
                              <th>Age</th>
                              <th>Start date</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Tiger Nixon</td>
                              <td>System Architect</td>
                              <td>Edinburgh</td>
                              <td>61</td>
                              <td>2011/04/25</td>
                            </tr>
                            <tr>
                              <td>Garrett Winters</td>
                              <td>Accountant</td>
                              <td>Tokyo</td>
                              <td>63</td>
                              <td>2011/07/25</td>
                            </tr>
                            <tr>
                              <td>Ashton Cox</td>
                              <td>Junior Technical Author</td>
                              <td>San Francisco</td>
                              <td>66</td>
                              <td>2009/01/12</td>
                            </tr>
                            <tr>
                              <td>Cedric Kelly</td>
                              <td>Senior Javascript Developer</td>
                              <td>Edinburgh</td>
                              <td>22</td>
                              <td>2012/03/29</td>
                            </tr>
                            
                          </tbody>
                        </table>

                      </div>
                    </div>
                    {/*end card*/}   
                  </div>


                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-3">
                    <div className="card mb-3">
                      <div className="card-header">
                        <h3>
                          <i className="fa fa-star-o"></i> Tasks progress</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </div>

                      <div className="card-body">
                        <p className="font-600 m-b-5">Task 1
                          <span className="text-primary pull-right">
                            <b>95%</b>
                          </span>
                        </p>
                        <div className="progress">
                          <div className="progress-bar progress-bar-striped progress-xs bg-primary" role="progressbar" style={{width: 95 +'%'}} aria-valuenow="95"
                              aria-valuemin="0" aria-valuemax="95"></div>
                        </div>

                        <div className="m-b-20"></div>

                        <p className="font-600 m-b-5">Task 2
                          <span className="text-primary pull-right">
                            <b>88%</b>
                          </span>
                        </p>
                        <div className="progress">
                          <div className="progress-bar progress-bar-striped progress-xs bg-primary" role="progressbar" style={{width: 88 + '%'}} aria-valuenow="88"
                              aria-valuemin="0" aria-valuemax="88"></div>
                        </div>

                        <div className="m-b-20"></div>

                        <p className="font-600 m-b-5">Task 3
                          <span className="text-info pull-right">
                            <b>75%</b>
                          </span>
                        </p>
                        <div className="progress">
                          <div className="progress-bar progress-bar-striped progress-xs bg-info" role="progressbar" style={{width: 78 + '%'}} aria-valuenow="75"
                              aria-valuemin="0" aria-valuemax="75"></div>
                        </div>

                        <div className="m-b-20"></div>

                        <p className="font-600 m-b-5">Task 4
                          <span className="text-info pull-right">
                            <b>70%</b>
                          </span>
                        </p>
                        <div className="progress">
                          <div className="progress-bar progress-bar-striped progress-xs bg-info" role="progressbar" style={{width: 70 + '%'}} aria-valuenow="70"
                              aria-valuemin="0" aria-valuemax="70"></div>
                        </div>

                        <div className="m-b-20"></div>

                        <p className="font-600 m-b-5">Task 5
                          <span className="text-warning pull-right">
                            <b>68%</b>
                          </span>
                        </p>
                        <div className="progress">
                          <div className="progress-bar progress-bar-striped progress-xs bg-warning" role="progressbar" style={{width: 68 + '%'}} aria-valuenow="68"
                              aria-valuemin="0" aria-valuemax="68"></div>
                        </div>

                        <div className="m-b-20"></div>

                        <p className="font-600 m-b-5">Task 6
                          <span className="text-warning pull-right">
                            <b>65%</b>
                          </span>
                        </p>
                        <div className="progress">
                          <div className="progress-bar progress-bar-striped progress-xs bg-warning" role="progressbar" style={{width: 65 + '%'}} aria-valuenow="65"
                              aria-valuemin="0" aria-valuemax="65"></div>
                        </div>

                        <div className="m-b-20"></div>

                        <p className="font-600 m-b-5">Task 7
                          <span className="text-danger pull-right">
                            <b>55%</b>
                          </span>
                        </p>
                        <div className="progress">
                          <div className="progress-bar progress-bar-striped progress-xs bg-danger" role="progressbar" style={{width: 55 + '%'}} aria-valuenow="55"
                              aria-valuemin="0" aria-valuemax="55"></div>
                        </div>

                        <div className="m-b-20"></div>

                        <p className="font-600 m-b-5">Task 8
                          <span className="text-danger pull-right">
                            <b>40%</b>
                          </span>
                        </p>
                        <div className="progress">
                          <div className="progress-bar progress-bar-striped progress-xs bg-danger" role="progressbar" style={{width: 40 + '%'}} aria-valuenow="40"
                              aria-valuemin="0" aria-valuemax="40"></div>
                        </div>
                      </div>
                      <div className="card-footer small text-muted">Updated today at 11:59 PM</div>
                    </div>
                    {/*end card*/}   
                  </div>


                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-3">
                    <div className="card mb-3">
                      <div className="card-header">
                        <h3>
                          <i className="fa fa-envelope-o"></i> Latest messages</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </div>

                      <div className="card-body">

                        <div className="widget-messages nicescroll" style={{height: 400 + 'px'}}>
                          <a href="#">
                            <div className="message-item">
                              <div className="message-user-img">
                                <img src="assets/images/avatars/avatar2.png" className="avatar-circle" alt=""/>
                              </div>
                              <p className="message-item-user">John Doe</p>
                              <p className="message-item-msg">Hello. I want to buy your product</p>
                              <p className="message-item-date">11:50 PM</p>
                            </div>
                          </a>
                          <a href="#">
                            <div className="message-item">
                              <div className="message-user-img">
                                <img src="assets/images/avatars/avatar5.png" className="avatar-circle" alt=""/>
                              </div>
                              <p className="message-item-user">Ashton Cox</p>
                              <p className="message-item-msg">Great job for this task</p>
                              <p className="message-item-date">14:25 PM</p>
                            </div>
                          </a>
                          <a href="#">
                            <div className="message-item">
                              <div className="message-user-img">
                                <img src="assets/images/avatars/avatar6.png" className="avatar-circle" alt=""/>
                              </div>
                              <p className="message-item-user">Colleen Hurst</p>
                              <p className="message-item-msg">I have a new project for you</p>
                              <p className="message-item-date">13:20 PM</p>
                            </div>
                          </a>
                          <a href="#">
                            <div className="message-item">
                              <div className="message-user-img">
                                <img src="assets/images/avatars/avatar10.png" className="avatar-circle" alt=""/>
                              </div>
                              <p className="message-item-user">Fiona Green</p>
                              <p className="message-item-msg">Nice to meet you</p>
                              <p className="message-item-date">15:45 PM</p>
                            </div>
                          </a>
                          <a href="#">
                            <div className="message-item">
                              <div className="message-user-img">
                                <img src="assets/images/avatars/avatar2.png" className="avatar-circle" alt=""/>
                              </div>
                              <p className="message-item-user">Donna Snider</p>
                              <p className="message-item-msg">I have a new project for you</p>
                              <p className="message-item-date">15:45 AM</p>
                            </div>
                          </a>
                          
                          <a href="#">
                            <div className="message-item">
                              <div className="message-user-img">
                                <img src="assets/images/avatars/avatar10.png" className="avatar-circle" alt=""/>
                              </div>
                              <p className="message-item-user">Brielle Williamson</p>
                              <p className="message-item-msg">I have a new project for you</p>
                              <p className="message-item-date">15:45 AM</p>
                            </div>
                          </a>
                        </div>

                      </div>
                      <div className="card-footer small text-muted">Updated today at 11:59 PM</div>
                    </div>
                    {/*end card*/}
                  </div>

                </div>

              </div>
              {/*end container-fluid*/}
            
            </div>     
            {/*end content*/}   
              
          </div>
          {/*End content-page*/} 
          <footer className="footer-dash">
            <span className="text-right">
              Copyright
              <a target="_blank" href="#">  K'ulu'</a>
            </span>
            {/*<span className="float-right">
              Powered by
              <a target="_blank" href="https://www.pikeadmin.com">
                <b>Pike Admin</b>
              </a>
              </span>*/}
          </footer>

        
        </div>
        

        


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
