import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Mensajes } from '../../../api/mensajes';

import Chat from '../../Chat';

class LobbySesion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			mensajes: [], //almacena todos los mensajes
      usuarios: [], //alamcena todos los usuarios
      lobby: '',  //almacena la clave de el lobby que se creo
    };

  }

  //actulaizamos nuestro state al montar el componente
  componentDidMount(){
    this.setState({ lobby: this.props.lobby });
  }

  //actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.isReadyM && nextProps.isReadyU){
      //console.log("updated props from lobbysesion", nextProps);
      return {
        mensajes: nextProps.mensajes,
        usuarios: nextProps.usuarios,
      };
    }
    //retornamos null cuando no sea necesario actualizar state
    return null;
  }
 

  render () {
    const { valor, claveLobby } = this.props;    
    let chat = null;
    if(valor){
      chat = <Chat lobby={ this.state.lobby } mensajes={this.state.mensajes} allUsers={this.state.allUsers}/>;
    }

    return (      
      <div id="lobby" className="row">
        <div className="col-12">  
          <h1>lobby</h1>												
          { chat }
          <button className="btn" onClick={ this.onClickReset }>reset sesion</button>          
        </div>
      </div>
    );
  }
}

export default withTracker((props) => {

  //obteniendo informacion de mensajes
  let handleM = Meteor.subscribe('mensajes', props.lobby);
  let isReadyM = handleM.ready();
  let mensajes = Mensajes.find().fetch();		

  //obteniendo informacion de usuarios
  let handleU = Meteor.subscribe('allUsers');	
  let isReadyU = handleU.ready();
  let usuarios = Meteor.users.find().fetch();

  console.log('mensajes desde lobbySesion', mensajes);

  return {
    mensajes,
    isReadyM,
    usuarios,
    isReadyU
  };

})(LobbySesion);