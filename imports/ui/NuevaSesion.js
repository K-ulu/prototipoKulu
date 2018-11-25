import React from 'react';

import Chat from './Chat'
import ConfiguraSesion from '../ui/components/nuevaSesion/ConfiguraSesion';
import LobbySesion from '../ui/components/nuevaSesion/LobbySesion';

export default class NuevaSesion extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			configuracion: false,
		};
		
		this.completarConfiguracion = this.completarConfiguracion.bind(this);
	}

	completarConfiguracion(){
		this.setState({ configuracion: true })
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
