import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class MensajesListItem extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			allUsers: [],
		};
	}

	componentDidMount(){
		//console.log('props list item' , this.props);
	}

	// //actualizamos props
	// static getDerivedStateFromProps(nextProps, prevState) {
  //   if(nextProps != this.props){
  //       console.log('nuevos props de listitem: ', nextProps);
  //       return {
	// 				allUsers: nextProps.allUsers,
  //       };
  //     }
  //     //retornamos null cuando no sea necesario actualizar state
  //     return null;
  //   }

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

		//let users = Meteor.subscribe('allUsers');	
		
		// if (users.ready()) {
		// 	let todos = Meteor.users.find({_id: id}).fetch(); // will return all users
		// 	return todos[0].profile.nickname;
		// }
		//console.log('todos los usuarios ' , this.props.allUsers);
		//let nickname = this.props.allUsers.filter(user => user._id ==  id);
		
		//console.log(nickname[0].profile.nickname);
		//return nickname[0].profile.nickname
		return 'hola;'
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