import React from 'react';
import { Meteor } from 'meteor/meteor';

import MensajesList from './MensajesList';
import LobbiesList from './LobbiesList';

export default class Chat extends React.Component {

  constructor(props){
    super(props);
    this.state = {      
      mensajes: [], //almacena los mensajes
      allUsers: [],  //almacena todos los usuarios 
    };
  }

  //inserta mensajes en el chat de acuerdo al lobby en el que se encuentra
  onSubmit(e){
    //recuperamos texto del mensaje
    const msj = this.refs.mensaje.value.trim();
    //prevenimos el comportamiento por defautl
    e.preventDefault();    
    //verificamos si existe el mensaje
    if(msj){
      Meteor.call('mensajes.insert', msj, this.props.lobby, (err, res) => {
        if (!err) { //mensaje enviado
          this.refs.mensaje.value = '';
        } else { //error al enviar mensaje
          console.log(err.reason);
        }
      });
    }
  }
  
  // inserta un nuevo lobby en la coleccion
  lobby(e){
    //recuperamos texto del mensaje
    const nombre = this.refs.nombre.value.trim();
    //prevenimos el comportamiento por default
    e.preventDefault();    
    //verificamos si existe el mensaje
    if(nombre){
      Meteor.call('lobbies.insert', nombre, (err, res) => {
        if (!err) { //mensaje enviado
          this.refs.nombre.value = '';
        } else { //error al enviar mensaje
          console.log(err.reason);
        }
      });
    }

  }

  //actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.mensajes.length > 0){
        //console.log('nuevos props de chat: ', nextProps);
        return {
          mensajes: nextProps.mensajes,
          allUsers: nextProps.allUsers,
        };
      }
      //retornamos null cuando no sea necesario actualizar state
      return null;
    }

  componentDidMount() {
    //console.log('status: ', Meteor.status());
    //console.log('props chat', this.props);
  }

  render () {      
    return (
      <div>        

        {/*<LobbiesList lobbies={this.state.lobbies}/>
        <form onSubmit={this.lobby.bind(this)}>
          <input type="text" ref="nombre" placeholder="nuevo lobby"/>
          <button>Agregar</button>                
        </form>*/ }
        
        <MensajesList allUsers={this.state.allUsers} mensajes={this.state.mensajes}/>
        <p>Agregar un mensaje</p>
        <form onSubmit={this.onSubmit.bind(this)}>
            <input type="text" ref="mensaje" placeholder="dí hola!"/>
            <button>Enviar mensaje</button>                
        </form> 
      </div>
    );
  }
}