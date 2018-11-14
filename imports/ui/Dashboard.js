import React from 'react';
import { Session } from 'meteor/session';
import { withRouter } from "react-router-dom";

import MaestroDashboard from './MaestroDashboard';
import UsuarioDashboard from './UsuarioDashboard';
import AdminContenidoDashboardContainer from './AdminContenidoDashboardContainer';

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        user: { },
        isReady: false,
    };
  }

  //actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.isReady){
      return {
        user: nextProps.user,
        isReady: nextProps.isReady,
      };
    }    
		//retornamos null cuando no sea necesario actualizar state
		return null;
  }

  render () {
    const isLoggedIn = this.props.isAuthenticated;
    let tipoUsuario, dashboard;
    
    //cargamos el tipo de usuario una vez que se carguen los datos
    if( this.state.isReady ){
      tipoUsuario = this.state.user.tipoUsuario;

      //determinamos el dashboard a cargar
      if (tipoUsuario == "docente"){
        dashboard = <MaestroDashboard user={this.state.user}/>;
      } else if(tipoUsuario == 'adminContenido'){
        dashboard = <AdminContenidoDashboardContainer user={this.state.user}/>;
      } else { 
        dashboard = <UsuarioDashboard user={this.state.user}/>; 
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
