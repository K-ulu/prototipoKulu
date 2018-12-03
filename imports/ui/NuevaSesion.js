import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import ConfiguraSesion from '../ui/components/nuevaSesion/ConfiguraSesion';
import LobbySesion from '../ui/components/nuevaSesion/LobbySesion';

import { SesionesAprendizaje } from '../api/sesionesAprendizaje';

class NuevaSesion extends React.Component {

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
		this.enSesion = this.enSesion.bind(this);
	}

	componentDidMount(){
		//preguntamos si accedio por medio de invitacion o ya se había unido a la sesion
    //de ser así redirigimos al lobby de lo contrario mostramos
    // panel de configuracion
    // console.log('valor de seison', Session.get('sesion'));
    // console.log('en sesion', Session.get('enSesion'));
    if(Session.get('enSesion')){
      //actualizamos datos
      this.setState({ enSesion: true, sesionObjeto: Session.get('sesion')});      
    } 
	}

	//actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.isReadyS){    
      return {
        sesionObjeto: nextProps.sesion,
      };
    }
    //retornamos null cuando no sea necesario actualizar state
    return null;
  }

	//se ha completado la configuracion de la sesion
	completarConfiguracion(){
		this.setState({ configuracion: true });
	}

	//habilitamos que esta en una sesion
	enSesion(){
		this.setState({ enSesion: true })
	}

	//seteamos valor de la clave lobby
	setLobby(claveLobby){		
		this.setState({ claveLobby });
	}

	//seteamos el valor del objeto completo lobby
	setLobbyObjeto(lobbyObjeto){
		this.setState({ lobbyObjeto });
	}

	//seteamos valor de clave sesion
	setSesion(claveSesion){
		this.setState({ claveSesion });
	}

	//seteamos valor del objeto completo de la sesionAprendizaje
	setSesionObjeto(sesionObjeto){
		this.setState({ sesionObjeto });
	}

	render(){
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

export default withTracker(() => {
	//obteniendo informacion actualizada del objeto sesion
  let handleS = Meteor.subscribe('sesionesAprendizaje', Session.get('sesion')._id);
  let isReadyS = handleS.ready();
	let sesion = SesionesAprendizaje.find().fetch();		
	sesion = sesion[0];
	//console.log('mi sesion actualizada', sesion);

	return {
		isReadyS,
		sesion
	};

})(NuevaSesion);
