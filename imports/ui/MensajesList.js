import React from 'react';

import MensajesListItem from './MensajesListItem';

export default class MensajesList extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			mensajes: [],
			allUsers: [],
		};
	}


	//actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.mensajes != prevState.mensajes){        
        return {
					mensajes: nextProps.mensajes,
					allUsers: nextProps.allUsers,
        };
      }
      //retornamos null cuando no sea necesario actualizar state
      return null;
    }

	renderMensajesListItems(){
		return this.state.mensajes.map((mensaje) => {
			return (
				//<p key={mensaje._id}>{mensaje.texto} - {mensaje.timestamp}</p>
				<MensajesListItem allUsers={this.state.allUsers} key={mensaje._id} {...mensaje}/>
				);
		});
	}	

	render() {
		return (
			<div>			
				{/* <p>MensajesList</p> */}
				{ this.renderMensajesListItems() }
			</div>
		);
	}
}