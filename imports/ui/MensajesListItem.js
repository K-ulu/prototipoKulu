import React from 'react';

export default class MensajesListItem extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			allUsers: [],
		};
	}

	//actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.allUsers != prevState.allUsers){        
        return {
					allUsers: nextProps.allUsers,
        };
      }
      //retornamos null cuando no sea necesario actualizar state
      return null;
    }

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
		//recolectamos el id del usuario que envio el mensaje
		let nickname = this.props.allUsers.filter(user => user._id ==  id);		
		return nickname[0].profile.nickname;
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