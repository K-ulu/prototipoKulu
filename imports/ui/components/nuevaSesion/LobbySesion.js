import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Lobbies } from '../../../api/lobbies';
import { Mensajes } from '../../../api/mensajes';

import Chat from '../../Chat';

class LobbySesion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lobbies: [], //almacena todos los lobbies 
			mensajes: [], //almacena todos los mensajes
			usuarios: [], //alamcena todos los usuarios
    };

  }

  //actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.isReadyL && nextProps.isReadyM && nextProps.isReadyU){
      console.log("updated props from lobbysesion", nextProps);
      return {
        lobbies: nextProps.lobbies,
        mensajes: nextProps.mensajes,
        usuarios: nextProps.usuarios,
      };
    }
    //retornamos null cuando no sea necesario actualizar state
    return null;
  }

  componentDidMount(){
    console.log("lobby props", this.props);
  }

  render () {
    const { valor } = this.props;
    
    /*let chat = null;
    if(this.state.lobbies.length > 0){
      chat = <Chat lobbies={this.state.lobbies} mensajes={this.state.mensajes} allUsers={this.state.allUsers}/>;
    }*/
    


    return (      
      <div id="lobby" className="row">
        <div className="col-12">  												
          {/*<Chat lobbies={this.state.lobbies} mensajes={this.state.mensajes} allUsers={this.state.allUsers}/>*/}
          <h1>lobby</h1>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {

  //obtenemos informacion de lobbies
  let handleL = Meteor.subscribe('lobbies');
  let isReadyL = handleL.ready();
  let lobbies = Lobbies.find().fetch();		

  //obteniendo informacion de mensajes
  let handleM = Meteor.subscribe('mensajes', Session.get('lobby'));
  let isReadyM = handleM.ready();
  let mensajes = Mensajes.find().fetch();		

  //obteniendo informacion de usuarios
  let handleU = Meteor.subscribe('allUsers');	
  let isReadyU = handleU.ready();
  let usuarios = Meteor.users.find().fetch();

  return {
    lobbies,
    isReadyL,
    mensajes,
    isReadyM,
    usuarios,
    isReadyU
  };

})(LobbySesion);