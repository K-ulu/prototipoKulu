import React from 'react';

import { Session } from 'meteor/session';

export default class LobbiesList extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			lobbies: [],
			value: '' //almacena valor 
		};
	}

	handleChange(event){
		console.log(event.target.value.trim());
    this.setState({value: event.target.value});
		Session.set('lobby', event.target.value.trim());
	}
	
	//actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.lobbies.length > 0){
        console.log('nuevos props de lobbies list: ', nextProps);
        return {
          lobbies: nextProps.lobbies,
        };
      }
      //retornamos null cuando no sea necesario actualizar state
      return null;
    }

	renderLobbiesListItems(){
		return this.state.lobbies.map((lobby) => {
			return (
				// <LobbiesListItem key={lobby._id} {...lobby}/>
				<option key={lobby._id} value={lobby._id}>{lobby.nombre}</option>
				);
		});
	}	

	render() {
		return (
			<div>			
				<p>LobbiesList</p>                  
				<select value={this.state.value} onChange={this.handleChange.bind(this)} className="form-control form-control rounded">
					<option value ="seleccione">Seleccione lobby</option>    
					{ this.renderLobbiesListItems() }                               
				</select>
				
			</div>
		);
	}

}