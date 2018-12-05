import React, {Component, PropTypes} from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import ElementosObjetosAprendizaje from '../api/elementosObjetosAprendizaje.js';
import Timeline from './timeline.js';
import {getSampleData} from '../api/dataTimeline.js';
import {getImages} from '../api/dataTimeline.js';


import { Lobbies } from '../api/lobbies';
import { Mensajes } from '../api/mensajes';
import Chat from './Chat';

require('../client/styles/lineaTiempo.scss');

$( document ).ready(function() {
    $(".rt-menu li").on("click", function(){
      $(".rt-menu").find(".activa").removeClass("activa");
      $(this).addClass("activa");
    });
});

class TimeLinePrincipal extends React.Component {
    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            events: null,
            imagenes: null,

            lobbies: '',
            mensajes: null,
            allUsers: null,
            nuevo: null,

            // lobby: '',  //almacena la clave de el lobby que se creo
            //lobbyObjeto: { },
            // sesionObjeto: { },
        };
        this.datos = this.datos.bind(this);
    }

    componentDidMount(){
    //this.setState({ lobby: this.props.lobby, lobbyObjeto: this.props.lobbyObjeto,  sesionObjeto: this.props.sesionObjeto });
        console.log(Session.get('sesion').idLobby);
        this.setState({ lobbies: Session.get('sesion').idLobby});

        console.log('lobby props', this.props);
    // console.log('lobby state at lobby sesion did mount', this.state);
    }

    	//actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
        console.log(nextProps);
        if(true){
            if (prevState.nuevo == null || prevState.nuevo == true){
                return {
                    events:getSampleData(nextProps.data),
                    imagenes: getImages(false, nextProps.images),

                    // lobbies: nextProps.lobbies,
                    mensajes: nextProps.mensajes,
                    allUsers: nextProps.allUsers,
                    nuevo: true,
                };
            }
            else{
                return{
                    nuevo: false,
                }
            }
            
        }
        //retornamos null cuando no sea necesario actualizar state
        return null;
    }
      
    datos (event, dataType){
        let newImages = "";

        if (dataType == "all"){
            newImages = ElementosObjetosAprendizaje.find({"meta.usado":"false"}).fetch();
        }
        else{
            newImages = ElementosObjetosAprendizaje.find({"meta.categoriaElemento": dataType, "meta.usado":"false"}).fetch();
        }

        if (newImages.length > 0 ){
            this.setState({ imagenes: getImages(false, newImages ), nuevo: false })
        }
        else{
            this.setState({ imagenes: newImages, nuevo:false })
        }
    }

    render() {   
        let {events} = this.state;
        let {imagenes} = this.state;

        console.log(this.state.lobbies);
        return (
            <div className="linea-Tiempo">
                <h1>Linea del Tiempo</h1>
                <hr/>
                <div className = "rt-menu">
                    <ul>
                        {/* <li className="green"><div>Limpiar</div></li> */}
                        <li className="yellow activa" onClick={(e) => this.datos(e, "all")}><div>Mostrar todo</div></li>
                        <li className="red" onClick={(e) => this.datos(e,"artefacto")}><div>Artefacto</div></li>
                        <li className="blue" onClick={(e) => this.datos(e,"personaje")}><div>Personaje</div></li>
                        <li className="purple" onClick={(e) => this.datos(e,"evento")}><div>evento</div></li>
                    </ul>
                </div>
                <Timeline events={events} imagenes={imagenes}/>

                <div>
                    <h3>Chat</h3>
                    <Chat lobby={this.state.lobbies} mensajes={this.state.mensajes} allUsers={this.state.allUsers}/>
                </div>
            </div>
        );
    }
}

//export default withRouter(TimeLinePrincipal);

export default withTracker(() => {
    console.log(Session.get('sesion'));
    Meteor.subscribe("elementos.all");//suscripcion a files
    // Meteor.subscribe('lobbies');

    var idLobby= Session.get('sesion').idLobby;
    console.log(idLobby);
    Meteor.subscribe('mensajes', idLobby);

    users = Meteor.subscribe('allUsers');
    let todos;
    if (users.ready()) {
        todos = Meteor.users.find().fetch(); // will return all users
    }

    console.log(Mensajes.find().fetch());
        
    return {
        // files: ElementosObjetosAprendizaje.find({}, {sort:{name:1}}).fetch());
        images: ElementosObjetosAprendizaje.find({"meta.usado":"false"}).fetch(),
        data: ElementosObjetosAprendizaje.find({}).fetch(),

        // lobbies: idLobby,//Lobbies.find().fetch(),
        mensajes: Mensajes.find().fetch(),
        allUsers: todos,

        nuevo: true,
    }
})(TimeLinePrincipal);
