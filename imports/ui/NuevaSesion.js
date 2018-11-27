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
			sesion: { },

		};
		
		this.completarConfiguracion = this.completarConfiguracion.bind(this);
		this.setLobby = this.setLobby.bind(this);
		this.setSesion = this.setSesion.bind(this);
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

	setSesion(sesion){
		this.setState({ sesion });
	}

	render(){
		let configuracion = <ConfiguraSesion valor={ this.state.configuracion } completarConfiguracion={ this.completarConfiguracion } setLobby={ this.setLobby }/>;
		let lobby = null;
		if(this.state.configuracion){
			configuracion = null;
			lobby = <LobbySesion valor={ this.state.configuracion } lobby={ this.state.claveLobby }/>;
		}
		return (
			<div>	
				{ configuracion }
				{ lobby }
				{/*<ConfiguraSesion valor={ this.state.configuracion } completarConfiguracion={ this.completarConfiguracion }/>
				<LobbySesion valor={ this.state.configuracion }/>*/}
			</div>			
		);
	}
}
