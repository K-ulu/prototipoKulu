import React from 'react';
import { Meteor } from 'meteor/meteor';

import Chat from './Chat'
import ConfiguraSesion from '../ui/components/nuevaSesion/ConfiguraSesion';
import LobbySesion from '../ui/components/nuevaSesion/LobbySesion';

export default class NuevaSesion extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			configuracion: false,
			claveLobby: '',
			lobbyObjeto: { },
			claveSesion: '',
			sesionObjeto: { },

		};
		
		this.completarConfiguracion = this.completarConfiguracion.bind(this);
		this.setLobby = this.setLobby.bind(this);
		this.setLobbyObjeto = this.setLobbyObjeto.bind(this);
		this.setSesion = this.setSesion.bind(this);
		this.setSesionObjeto = this.setSesionObjeto.bind(this);
	}

	componentDidMount(){
		//console.log('state nueva sesion ', this.state);
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

	render(){
		let configuracion = <ConfiguraSesion valor={ this.state.configuracion } completarConfiguracion={ this.completarConfiguracion } setLobby={ this.setLobby } setSesion={ this.setSesion } setLobbyObjeto={ this.setLobbyObjeto } setSesionObjeto={ this.setSesionObjeto }/>;
		let lobby = null;
		if(this.state.configuracion){
			configuracion = null;
			lobby = <LobbySesion valor={ this.state.configuracion } lobby={ this.state.claveLobby } lobbyObjeto={ this.state.lobbyObjeto } sesionObjeto={ this.state.sesionObjeto }/>;
		}

		return (
			<div>	
				{ configuracion }
				{ lobby }
			</div>			
		);
	}
}
