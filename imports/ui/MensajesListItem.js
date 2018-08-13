import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class MensajesListItem extends React.Component {

	//convierte timestamp a horas
	timestampToTime(timestamp){
		var date = new Date(timestamp);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);
	}

	//obtener nombre de usuario por id
	getNicknameById(id){
		let users = Meteor.subscribe('allUsers');	
		
		if (users.ready()) {
			let todos = Meteor.users.find({_id: id}).fetch(); // will return all users
			return todos[0].profile.nickname;
		}
		
	}

	render(){
		return(
			<div>
				<p>{this.getNicknameById(this.props.user)} -- <span>{this.timestampToTime(this.props.timestamp)}</span></p>
				<p>{this.props.texto}</p>
			</div>
		);
	}
}