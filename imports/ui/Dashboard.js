import React from 'react';
import { Session } from 'meteor/session';
import { withRouter } from "react-router-dom";

import MaestroDashboard from './MaestroDashboard';
import UsuarioDashboard from './UsuarioDashboard';

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        user: { }
    };
  }

  componentDidMount(){
    console.log('url ', this.props.history.location.pathname);
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


        //determinamos el dashboard a cargar
        if (tipoUsuario == "docente"){
          dashboard = <MaestroDashboard user={this.state.user}/>;
        }  
        else{
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
