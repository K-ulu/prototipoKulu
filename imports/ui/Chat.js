import React from 'react';
import { Meteor } from 'meteor/meteor';

import MensajesList from './MensajesList';
import LobbiesList from './LobbiesList';

export default class Chat extends React.Component {

  onSubmit(e){
    //recuperamos texto del mensaje
    const msj = this.refs.mensaje.value.trim();

    e.preventDefault();
    
    //verificamos si existe el mensaje
    if(msj){
      Meteor.call('mensajes.insert', msj, Session.get('lobby'), (err, res) => {
        if (!err) { //mensaje enviado
          this.refs.mensaje.value = '';
        } else { //error al enviar mensaje
          console.log(err.reason);
        }
      });

    }

  }

  lobby(e){
    //recuperamos texto del mensaje
    const nombre = this.refs.nombre.value.trim();

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

  componentDidMount() {
    console.log('status: ', Meteor.status());
  }


  render () {      
    return (
      <div>        

        <LobbiesList/>
        <form onSubmit={this.lobby.bind(this)}>
          <input type="text" ref="nombre" placeholder="nuevo lobby"/>
          <button>Agregar</button>                
        </form> 


        <MensajesList/>
        <p>Agregar un mensaje</p>
        <form onSubmit={this.onSubmit.bind(this)}>
            <input type="text" ref="mensaje" placeholder="dí hola!"/>
            <button>Enviar mensaje</button>                
        </form> 
      </div>
    );
  }
}