import React, {Component, PropTypes} from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import ElementosObjetosAprendizaje from '../api/elementosObjetosAprendizaje.js';
import Timeline from './timeline';
import {getSampleData} from './data';
import {getImages} from './data';
require('../client/styles/lineaTiempo.scss');

$( document ).ready(function() {
    $(".rt-menu li").on("click", function(){
      $(".rt-menu").find(".activa").removeClass("activa");
      $(this).addClass("activa");
    });
});

class PruebasCaro extends React.Component {

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

    datos (dataType){
        console.log("Hola", dataType);

        try {
            if (dataType == "all"){
                // this.images = ElementosObjetosAprendizaje.find({"meta.usado":false}).fetch();
                const {events} = this.state;
                const {imagenes} = this.state;
            }

            // this.setState({
            //     imagenes: getImages(false, this.images)
            // })

          } catch (error) {
            console.log(error);
          }
    }

    render() {
        let listo = this.props.listo;
        console.log("hola");

        if (listo === true && this.state.contador < 1){
            console.log("Es menor");
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
        console.log("hola3");
        const {events} = this.state;
        const {imagenes} = this.state;
        this.timeline = <Timeline events={events} imagenes={imagenes}/>;
        console.log("hola4");
        return (
            <div className="linea-Tiempo">
                <h1>Linea del Tiempo</h1>
                <hr/>
                <div className = "rt-menu">
                    <ul>
                        <li className="green"><div>Limpiar</div></li>
                        <li className="activa yellow" onClick={() => this.datos("all")}><div>Mostrar todo</div></li>
                        <li className="red"><div>Artefacto</div></li>
                        <li className="blue"><div>Personaje</div></li>
                        <li className="purple"><div>evento</div></li>
                    </ul>
                </div>
                {this.timeline}
            </div>
        );
    }
}

//export default withRouter(PruebasCaro);

export default withTracker(() => {
    var filesHandle = Meteor.subscribe("elementos.all");//suscripcion a files
    return {
        // files: ElementosObjetosAprendizaje.find({}, {sort:{name:1}}).fetch());
        images: ElementosObjetosAprendizaje.find({"meta.usado":false}).fetch(),
        data: ElementosObjetosAprendizaje.find({}).fetch(),
        listo: filesHandle.ready(),
    }
})(PruebasCaro);
