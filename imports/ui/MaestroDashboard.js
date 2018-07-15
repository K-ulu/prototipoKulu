import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { withRouter } from "react-router-dom";
import { Session } from 'meteor/session';
import HeaderMaestros from './components/HeaderMaestros';
import HeaderLeftMaestros from './components/HeaderLeftMaestros';


class MaestroDashboard extends React.Component {

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
                      <h1 className="main-title float-left">Dashboard</h1>
                      <ol className="breadcrumb float-right">
                        <li className="breadcrumb-item">Home</li>
                        <li className="breadcrumb-item active">Dashboard</li>
                      </ol>
                      <div className="clearfix"></div>
                    </div>
                  </div>
                </div>



                <div className="row">
                  <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
                    <div className="card-box noradius noborder bg-default">
                      <i className="fa fa-file-text-o float-right text-white"></i>
                      <h6 className="text-white text-uppercase m-b-20">Orders</h6>
                      <h1 className="m-b-20 text-white counter">1,587</h1>
                      <span className="text-white">15 New Orders</span>
                    </div>
                  </div>

                  <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
                    <div className="card-box noradius noborder bg-warning">
                      <i className="fa fa-bar-chart float-right text-white"></i>
                      <h6 className="text-white text-uppercase m-b-20">Visitors</h6>
                      <h1 className="m-b-20 text-white counter">250</h1>
                      <span className="text-white">rate: 25%</span>
                    </div>
                  </div>

                  <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
                    <div className="card-box noradius noborder bg-info">
                      <i className="fa fa-user-o float-right text-white"></i>
                      <h6 className="text-white text-uppercase m-b-20">Users</h6>
                      <h1 className="m-b-20 text-white counter">120</h1>
                      <span className="text-white">25 New Users</span>
                    </div>
                  </div>

                  <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
                    <div className="card-box noradius noborder bg-danger">
                      <i className="fa fa-bell-o float-right text-white"></i>
                      <h6 className="text-white text-uppercase m-b-20">Alerts</h6>
                      <h1 className="m-b-20 text-white counter">58</h1>
                      <span className="text-white">5 New Alerts</span>
                    </div>
                  </div>
                </div>





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

export default withRouter(MaestroDashboard);