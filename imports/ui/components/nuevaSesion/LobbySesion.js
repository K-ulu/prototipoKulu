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

    console.log('lobby props', this.props);
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

  onClickIniciarSesion(e){
    e.preventDefault();

    alert("hacer algo aquí");
  }
 

  render () {
    const { valor, claveLobby } = this.props;    
    let chat = null;
    if(valor){
      chat = <Chat lobby={ this.state.lobby } mensajes={this.state.mensajes} allUsers={this.state.allUsers}/>;
    }

    return (      
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="card noborder mb-3">

              <div className="card-header">
                <h3>Lobby</h3>		
              </div>

              <div className="card-body">
                <div className="row justify-content-center">
                  <div className="col-6">
                    <h1 className="text-center">Chat</h1>
                    <p>Conversa con tus compañeros para conocerlos</p>
                  </div>     
                </div>

                <div className="row justify-content-center">
                  <div className="col-10">
                    { chat }
                  </div>

                </div>
                <div className="row justify-content-center">
                  <div className="col-10">
                    <button onClick={ this.onClickIniciarSesion } className="btn btn-primary btn-block">Iniciar Sesión</button>
                  </div>
                </div>
              </div>

              

            </div>
            
            										
            
            
          </div>
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