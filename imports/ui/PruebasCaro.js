import React, {Component, PropTypes} from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import ElementosObjetosAprendizaje from '../api/elementosObjetosAprendizaje.js';
import Timeline from './timeline';
import {getSampleData} from './data';
import {getImages} from './data';
require('../client/styles/lineaTiempo.scss');

class PruebasCaro extends React.Component {
    static displayName = 'TimelineExample';
    static propTypes = {};
    constructor(props) {
        super(props);
        this.state = {
            contador: 0,
            events: null,
            imagenes: null
        };
    }

    render() {
        let data = this.props.files;
        if (data.length > 0 && this.state.contador < 1){
            this.setState(
                {
                    contador: 1,
                    events:getSampleData(data),
                    imagenes: getImages(false, data)
                }
            )
        }
        const {events} = this.state;
        const {imagenes} = this.state;
        const timeline = <Timeline events={events} imagenes={imagenes}/>;
        return (
            <div className="linea-Tiempo">
                <h1>Linea del Tiempo</h1>
                <hr/>
                {timeline}
            </div>
        );
    }
}

//export default withRouter(PruebasCaro);

export default withTracker(() => {
    var filesHandle = Meteor.subscribe("elementos.all");//suscripcion a files
    return {
        // files: ElementosObjetosAprendizaje.find({}, {sort:{name:1}}).fetch());
        files: ElementosObjetosAprendizaje.find({}).fetch(), 
    }
})(PruebasCaro);
