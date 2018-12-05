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
      //lobbyObjeto: { },
      sesionObjeto: { },
      timelineS: false,
    };

    this.onClickAbandonarSesion = this.onClickAbandonarSesion.bind(this);
    this.onClickIniciarSesion = this.onClickIniciarSesion.bind(this);
    this.esAnfitrion = this.esAnfitrion.bind(this);

  }

  //actulaizamos nuestro state al montar el componente
  componentDidMount(){
    //this.setState({ lobby: this.props.lobby, lobbyObjeto: this.props.lobbyObjeto,  sesionObjeto: this.props.sesionObjeto });
    this.setState({ lobby: this.props.lobby, sesionObjeto: this.props.sesionObjeto });

    // console.log('lobby props', this.props);
    // console.log('lobby state at lobby sesion did mount', this.state);
  }

  //actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.isReadyM && nextProps.isReadyU){
      //console.log("updated props from lobbysesion", nextProps);  
      if (nextProps.sesionObjeto.timelineS == true){
        console.log("ya se activo");
        location.href = '/timeLine';
      }
      else{
        // if (nextProps.sesionObjeto.timelineS == undefined){
          return {
            mensajes: nextProps.mensajes,
            usuarios: nextProps.usuarios,
            timelineS: false,
          };
        // }
      }
    }
    //retornamos null cuando no sea necesario actualizar state
    return null;
  }

  //funcion que nos permite saber si el usuario que participa 
  //en la sesion es el anfitrion (solo el anfitrion puede iniciar la sesion)
  esAnfitrion(){
    if(!_.isEmpty(this.state.sesionObjeto) ){
      let participantes = this.state.sesionObjeto.participantes;  
      for(let i = 0; i < participantes.length; i++){
        if(participantes[i].esAnfitrion && participantes[i]._id == Meteor.userId()){
          return true;
        } else {
          return false;
        }
      }   
    }
  }

  onClickAbandonarSesion(e){
    e.preventDefault();
    //resetamos valores en el objeto sesion
    let user;
    let index;
    let sesion = Session.get('sesion');

    //obtenemos index del usuario que abandonara la sala
    for(let i = 0; i < sesion.activos.length; i++){
      if(sesion.activos[i]._id == Meteor.userId()){
        index = i; 
      }
    }

    //removemos de la lista
    let eliminado = sesion.activos.splice(index, 1);
    console.log('elminado', eliminado);
    console.log('nueva lista: ', sesion.activos);
    //actualizamos la lista de la bd
    Meteor.call('sesionesAprendizaje.updateActivos', sesion._id, sesion.activos, (err, res) => {
      if(!err){
        console.log('lista actualizada de usuarios');
      } else {
        console.log(err.reason);
      }
    });
    
    //borramos datos de la sesion
    Session.setPersistent('idSesion', null);
    Session.setPersistent('sesion', null);
    //guardamos el id del lobby en la sesion del navegador
    Session.setPersistent('idLobby', null);
    Session.setPersistent('lobby', null);
    //ponemos en modo sesion
    Session.setPersistent('enSesion', false);
    //redireccionamos al dashboard
    location.href = '/dashboard';
  }

  onClickIniciarSesion(e){
    // e.preventDefault();

    // alert("hacer algo aquí");

    let sesion = Session.get('sesion');

    e.preventDefault();
    console.log(this.state);

    Meteor.call('sesionesAprendizaje.timeLine', sesion._id, "true", (err, res) => {
      if(!err){
        console.log('Sesion activada');
      } else {
        console.log(err.reason);
      }
    });

    location.href = '/timeLine';
  }
 

  render () {
    const { valor, claveLobby } = this.props;    
    let chat = null;
    let botonIniciarSesion = null;
    if(valor){
      chat = <Chat lobby={ this.state.lobby } mensajes={ this.state.mensajes } allUsers={ this.state.sesionObjeto.participantes }/>;
    }

    //verificamos si el usuario es el anfitrion
    if(this.esAnfitrion()){
      botonIniciarSesion = (
        <div className="row justify-content-center">
          <div className="col-10 col-lg-6">
            <button onClick={ this.onClickIniciarSesion } className="btn btn-primary btn-block">Iniciar Sesión</button>
          </div>
        </div>
      );
    }

    return (      
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="card noborder mb-3">

              <div className="card-header">
                <div className="row">
                  <div className="col-6 col-lg-3">
                  <button onClick={ this.onClickAbandonarSesion } className="btn btn-danger btn-block">Abandonar Sesión</button>
                  </div>
                </div>
                
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
                { botonIniciarSesion }
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

  return {
    mensajes,
    isReadyM,
    usuarios,
    isReadyU
  };

})(LobbySesion);