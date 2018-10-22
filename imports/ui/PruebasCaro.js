import { withRouter } from "react-router-dom";
import React, {Component, PropTypes} from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import ContenidosMultimedia from '../api/contenidosMultimedia.js';
import Timeline from './timeline';
import {getSampleData} from './data';

require('../client/styles/lineaTiempo.scss');
require('../client/styles/timeline.css');

const CustomStartLabel = (props) => {
    return <div className="custom-start-label">
        <p>Etiqueta de Inicio</p>
    </div>;
};

const CustomEndLabel = (props) => {
    return <div className="custom-end-label">
        <p>Etiqueta Final</p>
    </div>;
};

const CustomHeader = (props) => {
    return <div className="custom-header">
        <h3>Encabezado</h3>
    </div>;
};

const CustomFooter = (props) => {
    return <div className="custom-footer">
        <h3>Pie</h3>
    </div>;
};

const CustomTextBody = (props) => {
    return <div className="custom-text-body">
        <h3>Texto de Cuerpo</h3>
    </div>;
};

const CustomImageBody = (props) => {
    const {imageUrl} = props.event;
    return <div className="custom-image-body">
        <h3 className="image-body-label">Imagen del Cuerpo</h3>
        <img src={imageUrl} className='rt-image'/>
    </div>;
};


class PruebasCaro extends React.Component {
    static displayName = 'TimelineExample';
    static propTypes = {};
    constructor(props) {
        super(props);
        this.state = {
            contador: 0,
            events: null,
            useCustomComponents: false
        };
    }

    handleToggle(event) {
        this.setState({useCustomComponents: event.target.checked});
    }

    render() {
        let data = this.props.files;
    
        if (data.length > 0 && this.state.contador < 1){
            this.setState(
                {
                    contador: 1,
                    events:getSampleData(false, data)
                }
            )
        }
        const {events, useCustomComponents} = this.state;
        const timeline = <Timeline events={events}/>;
        const customTimeline = <Timeline events={events}
              customStartLabel={CustomStartLabel}
              customEndLabel={CustomEndLabel}
              customHeader={CustomHeader}
              customImageBody={CustomImageBody}
              customTextBody={CustomTextBody}
              customFooter={CustomFooter}/>;
        return (
            <div>
                <h1>Linea del Tiempo</h1>
                <div className="toggle-container">
                    <h1>Usar Componentes:</h1>
                    <input type="checkbox"
                        onChange={this.handleToggle.bind(this)}
                        checked={useCustomComponents}
                    />
                </div>
                <hr/>
                {useCustomComponents ? customTimeline : timeline}
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
