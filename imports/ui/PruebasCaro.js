import { withRouter } from "react-router-dom";
import React, {Component, PropTypes} from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import ContenidosMultimedia from '../api/contenidosMultimedia.js';
import Timeline from './timeline';
import {getSampleData} from './data';
import {getImages} from './data';
require('../client/styles/lineaTiempo.scss');
require('../client/styles/timeline.css');

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
                    events:getSampleData(false, data),
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
    var filesHandle = Meteor.subscribe("contenidosMultimedia.all");//suscripcion a files
    console.log(filesHandle.ready());

    return {
        files: ContenidosMultimedia.find({}, {sort: {name: 1}}).fetch(), 
    }
})(PruebasCaro);
