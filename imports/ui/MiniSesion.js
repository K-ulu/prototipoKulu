import React from 'react'

import ConfiguraSesion from '../ui/components/nuevaSesion/ConfiguraSesion';
import LobbySesion from '../ui/components/nuevaSesion/LobbySesion';

export default class MiniSesion extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      configuracion: false,
      claveLobby: '', 
      lobbyObjeto: { },
      claveSesion: '',
      sesionObjeto: { },
      enSesion: false,
    };

    this.completarConfiguracion = this.completarConfiguracion.bind(this);
		this.setLobby = this.setLobby.bind(this);
		this.setLobbyObjeto = this.setLobbyObjeto.bind(this);
		this.setSesion = this.setSesion.bind(this);
		this.setSesionObjeto = this.setSesionObjeto.bind(this);
  }
  
  componentDidMount() {
    //preguntamos si accedio por medio de invitacion
    //de ser así redirigimos al lobby de lo contrario mostramos
    // panel de configuracion
    console.log('valor de seison', Session.get('sesion'));
    console.log('en sesion', Session.get('enSesion'));
    if(Session.get('enSesion')){
      //actualizamos datos
      this.setState({ enSesion: true, sesionObjeto: Session.get('sesion')});      
    } 
    
  }

  completarConfiguracion(){
		this.setState({ configuracion: true })
	}

	setLobby(claveLobby){		
		this.setState({ claveLobby });
	}

	setLobbyObjeto(lobbyObjeto){
		this.setState({ lobbyObjeto });
	}

	setSesion(claveSesion){
		this.setState({ claveSesion });
	}

	setSesionObjeto(sesionObjeto){
		this.setState({ sesionObjeto });
	}
  
  render () {
    let configuracion = <ConfiguraSesion valor={ this.state.configuracion } completarConfiguracion={ this.completarConfiguracion } setLobby={ this.setLobby } setSesion={ this.setSesion } setLobbyObjeto={ this.setLobbyObjeto } setSesionObjeto={ this.setSesionObjeto } enSesion={ this.enSesion }/>;
    let lobby = null;
    //caso cuando configura la sesion
    if(this.state.configuracion){
			configuracion = null;
			lobby = <LobbySesion valor={ this.state.configuracion } lobby={ this.state.claveLobby } sesionObjeto={ this.state.sesionObjeto }/>;
    } else if(this.state.enSesion){ //caso cuando te unes a una sesion
      configuracion = null;
      lobby = <LobbySesion valor={ this.state.enSesion } lobby={ this.state.sesionObjeto.idLobby } sesionObjeto={ this.state.sesionObjeto }/>;
    }
    return (
      <div>
        { configuracion }
				{ lobby }
      </div>
    );
  }
}