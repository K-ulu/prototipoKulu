import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withRouter } from "react-router-dom";

import MaestroDashboard from './MaestroDashboard';
import UsuarioDashboard from './UsuarioDashboard';
import MaestroAlumnos from './MaestroAlumnos';
import MaestroGrupos from './MaestroGrupos';

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        user: { }
    };
  }

  //actualizamos props y guardamos datos del usuario
  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.setState({ user: this.props.user});
  }

  render () {
    const isLoggedIn = this.props.isAuthenticated;
    let tipoUsuario, dashboard;
    
    //cargamos el tipo de usuario una vez que se carguen los datos
    if( this.state.user !== undefined && this.state.user.tipoUsuario !== undefined){
      tipoUsuario = this.state.user.tipoUsuario;

      if (this.props.tipo=="maestroAlumnos"){//Verifica a cual sera redireccionado..
        dashboard = <MaestroAlumnos user={this.state.user}/>; 
        //creamos sesion con los datos del usuario logueado
        Session.set('user', this.state.user);
      }

      else if (this.props.tipo=="maestroGrupos"){//Verifica a cual sera redireccionado..
        dashboard = <MaestroGrupos user={this.state.user}/>; 
        //creamos sesion con los datos del usuario logueado
        Session.set('user', this.state.user);
      }

      else if (this.props.tipo=="dashboard"){
        //determinamos el dashboard a cargar
        if (tipoUsuario == "docente"){
          dashboard = <MaestroDashboard user={this.state.user}/>;
        }  
        else{
          dashboard = <UsuarioDashboard user={this.state.user}/>; 
        }
      }
      //creamos sesion con los datos del usuario logueado
      Session.set('user', this.state.user);
    }

    return (
    <div>
        { dashboard }       
    </div>
    );
  }
}

export default withRouter(Dashboard);
