import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import Select from 'react-select';
import {Grupos} from "../../api/grupos";
 
const customStyles = {
    option: (base, state) => ({
      ...base,
      borderBottom: '1px dotted pink',
      color: state.isFullscreen ? 'red' : 'blue',
      padding: 20,
    }),
    control: () => ({
      // none of react-selects styles are passed to <View />
      width: 200,
    }),
    singleValue: (base, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...base, opacity, transition };
    }
  }

class SelectPrincipal extends Component {

    constructor(){
        super()
        this.state = {
            opcionSeleccionada: {
                value: "todos",
                label: "todos",
            }
        }      
    }

    //Funciones del select
    getGrupos(){
        const grup = [];
    
        grup.push({
            value: "todos",
            label: "todos",
        })

        this.props.grupos.map((grupo) => (
            grup.push( {
                value: grupo._id,
                label: grupo.nombreGrupo,
            })
        ))

        
        return grup; 
    }

    seleccion = (opcion) => {
        console.log(opcion);
        this.setState({
            opcionSeleccionada: opcion,
        });

        this.props.handlerFromParant(opcion.value);
        console.log("hi2", opcion.value);
    }

    render() {
        var misGrupos = this.getGrupos();
        const { opcionSeleccionada } = this.state;

        return(
            <Select
                value={opcionSeleccionada}
                onChange={this.seleccion}
                options={misGrupos}
                styles={customStyles}
            />
      );
    }
}

export default withTracker(() => {
    id = Session.get('user')._id;
    console.log(id);
    Meteor.subscribe("grupos", id);

    return {
        grupos: Grupos.find({}).fetch()   
    }
})(SelectPrincipal);