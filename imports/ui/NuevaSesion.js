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
			lobby: '',

		};
		
		this.completarConfiguracion = this.completarConfiguracion.bind(this);
		this.crearLobby = this.crearLobby.bind(this);
	}

	completarConfiguracion(){
		this.setState({ configuracion: true })
	}

	crearLobby(idLobby, participantes){
		/*Meteor.call('lobbies.insert', nombre, (err, res) => {
			if (!err) { //mensaje enviado
				this.refs.nombre.value = '';
			} else { //error al enviar mensaje
				console.log(err.reason);
			}
		});*/

	}

	render (){
		let configuracion = <ConfiguraSesion valor={ this.state.configuracion } completarConfiguracion={ this.completarConfiguracion }/>;
		let lobby = null;
		if(this.state.configuracion){
			configuracion = null;
			lobby = <LobbySesion valor={ this.state.configuracion }/>
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
