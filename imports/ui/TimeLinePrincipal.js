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

    static displayName = 'TimelineExample';
    static propTypes = {};
    static timeline;
    static data; 
    static images;

    constructor(props) {
        super(props);
        this.state = {
            contador: 0,
            events: null,
            imagenes: null
        };
        this.datos = this.datos.bind(this);
    }

    	//actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
        if(true){
        //if (lobbies > 0){ 
            //console.log('nuevos props de gera: ', nextProps);
            return {
        
                lobbies: nextProps.lobbies,
                mensajes: nextProps.mensajes,
                allUsers: nextProps.allUsers,
            };
        }
        //retornamos null cuando no sea necesario actualizar state
        return null;
    }

    datos (dataType){
        try {
            if (dataType == "all"){
                this.images = ElementosObjetosAprendizaje.find({"meta.usado":"false"}).fetch();
                this.setState(
                    {
                        // events:getSampleData(this.data),
                        imagenes: getImages(false, this.images),
                        contador: 2
                    }
                )
            }
            else{
                this.images = ElementosObjetosAprendizaje.find({"meta.categoriaElemento": dataType, "meta.usado":"false"}).fetch();
                if (this.images.length > 0 ){
                    this.setState(
                        {
                            // events:getSampleData(this.data),
                            imagenes: getImages(false, this.images),
                            contador: 2
                        }
                    )
                }
                else{
                    this.setState(
                        {
                            // events:getSampleData(this.data),
                            imagenes: "",
                            contador: 2
                        }
                    )
                }


            }

          } catch (error) {
            console.log(error);
          }
    }

    render() {
        let listo = this.props.listo;
        if (listo === true && this.state.contador < 1){
            this.data = this.props.data;
            this.images = this.props.images;

            this.setState(
                {
                    contador: 1,
                    events:getSampleData(this.data),
                    imagenes: getImages(false, this.images)
                }
            )
        }
        const {contador} = this.state;
        const {events} = this.state;
        const {imagenes} = this.state;
        this.timeline = <Timeline events={events} imagenes={imagenes} contador={contador}/>;
        return (
            <div className="linea-Tiempo">
                <h1>Linea del Tiempo</h1>
                <hr/>
                <div className = "rt-menu">
                    <ul>
                        <li className="green"><div>Limpiar</div></li>
                        <li className="yellow activa" onClick={() => this.datos("all")}><div>Mostrar todo</div></li>
                        <li className="red" onClick={() => this.datos("artefacto")}><div>Artefacto</div></li>
                        <li className="blue" onClick={() => this.datos("personaje")}><div>Personaje</div></li>
                        <li className="purple" onClick={() => this.datos("evento")}><div>evento</div></li>
                    </ul>
                </div>
                {this.timeline}

                <div>
                {/* <div className = "container"> */}
                    {/* <div id="lobby" className="row"> */}
                        
                        {/* <div className="col-12">   */}
                        <h3>Chat</h3>
                            <Chat lobbies={this.state.lobbies} mensajes={this.state.mensajes} allUsers={this.state.allUsers}/>
                        {/* </div> */}
                    {/* </div> */}
                {/* </div> */}
                </div>
            </div>
        );
    }
}

//export default withRouter(TimeLinePrincipal);

export default withTracker(() => {
    var filesHandle = Meteor.subscribe("elementos.all");//suscripcion a files

    Meteor.subscribe('lobbies');
    Meteor.subscribe('mensajes', Session.get('lobby'));
    users = Meteor.subscribe('allUsers');
    let todos;
    if (users.ready()) {
        todos = Meteor.users.find().fetch(); // will return all users
    }
        
    return {
        // files: ElementosObjetosAprendizaje.find({}, {sort:{name:1}}).fetch());
        images: ElementosObjetosAprendizaje.find({"meta.usado":"false"}).fetch(),
        data: ElementosObjetosAprendizaje.find({}).fetch(),
        listo: filesHandle.ready(),

        lobbies: Lobbies.find().fetch(),
        mensajes: Mensajes.find().fetch(),
        allUsers: todos,
    }
})(TimeLinePrincipal);
