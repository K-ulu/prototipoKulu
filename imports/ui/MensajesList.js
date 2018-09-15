import React from 'react';
import { Meteor } from 'meteor/meteor';

import { Tracker } from 'meteor/tracker';
import { Mensajes } from '../api/mensajes';
import MensajesListItem from './MensajesListItem';

export default class MensajesList extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			mensajes: []
		};
	}

	componentDidMount(){		
		this.mensajesTracker = Tracker.autorun( () => {
			Meteor.subscribe('mensajes', Session.get('lobby'));
			const mensajes = Mensajes.find().fetch();			
			this.setState({  mensajes });
		});
	}

	componentWillUnmount(){
		this.mensajesTracker.stop();
	}

	renderMensajesListItems(){
		return this.state.mensajes.map((mensaje) => {
			return (
				//<p key={mensaje._id}>{mensaje.texto} - {mensaje.timestamp}</p>
				<MensajesListItem key={mensaje._id} {...mensaje}/>
				);
		});
	}	

	render() {
		return (
			<div>
			
				<p>MensajesList</p>
				{ this.renderMensajesListItems() }
			</div>
		);
	}
}