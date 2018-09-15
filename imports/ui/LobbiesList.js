import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Lobbies } from '../api/lobbies';
import LobbiesListItem from './LobbiesListItem';

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

	componentDidMount(){		
		this.lobbiesTracker = Tracker.autorun( () => {
			Meteor.subscribe('lobbies');
			const lobbies = Lobbies.find().fetch();			
			this.setState({  lobbies });
		});
	}

	componentWillUnmount(){
		this.lobbiesTracker.stop();
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