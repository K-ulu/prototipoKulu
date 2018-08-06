import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { withRouter } from "react-router-dom";
import { Session } from 'meteor/session';
import Select from 'react-select';
import {Grupos} from "../../api/grupos";
import { withTracker } from 'meteor/react-meteor-data';

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

class FormularioAlumno extends React.Component { 

  constructor(){
    super()

    this.state = {
      selectedOption: null,
    }

    this.insertar = this.insertar.bind(this);
  }

  //evento que permite realizar una inserción
  insertar(e){
    e.preventDefault();
    let nombre = this.refs.nombre.value.trim();
    let apellidoP = this.refs.apellidoP.value.trim();
    let email = this.refs.email.value.trim();

    let claveEscuela = this.refs.claveEscuela.value.trim();
    let matricula = this.refs.matricula.value.trim();

    console.log(this.idGrupo);

    this.props.insertar(e, nombre, apellidoP, matricula, claveEscuela, email, this.idGrupo);
  }

  //Funciones del select
  getGrupos(){
    const grup = [];

    this.props.grupos.map((grupo) => (
        grup.push( {
            value: grupo._id,
            label: grupo.nombreGrupo,
        })
    ))
    return grup; 
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
    console.log(selectedOption.value);
    this.idGrupo = selectedOption.value;
  }

  render () { 
    var misGrupos = this.getGrupos();
    const { selectedOption } = this.state;   
    
    return (
      <form onSubmit={this.insertar} className="form" role="form" autoComplete="off" id="formLogin">
        <div className="row">
          <div className="col-12 col-sm-6">
            <div className="input-group-prepend">
              <span className="input-group-text"><i className="fa fa-user-circle-o"></i></span>
              <input type="text" ref="nombre" name="nombre" className="form-control form-control rounded" placeholder="Nombre"/>
            </div>                                          
          </div>
          <div className="col-12 col-sm-6">
            <div className="input-group-prepend">
              <span className="input-group-text"><i className="fa fa-user fa-fw"></i></span>
              <input type="text" ref="apellidoP" name="apellidoP" className="form-control form-control rounded" placeholder="ApellidoP"/>
            </div>                                                                          
          </div>  
          <div className="col-12">                                        
            <div className="input-group-prepend">
              <span className="input-group-text"><i className="fa fa-envelope"></i></span>
              <input type="email" ref="email" name="email" className="form-control form-control rounded" placeholder="Correo"/>
            </div>                                         
          </div>  
          <div className="col-12">                                        
            <div className="input-group-prepend">
              <span className="input-group-text"><i className="fa fa-envelope"></i></span>
              <input type="text" ref="claveEscuela" name="claveEscuela" className="form-control form-control rounded" placeholder="Clave Escuela"/>
            </div>                                         
          </div> 
          <div className="col-12">                                        
            <div className="input-group-prepend">
              <span className="input-group-text"><i className="fa fa-envelope"></i></span>
              <input type="text" ref="matricula" name="matricula" className="form-control form-control rouded" placeholder="Matricula"/>
            </div>                                         
          </div>                                    
        </div>
        <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={misGrupos}
              styles={customStyles}
          />                      <div className="row-login">
          <button type="submit" className="btn btn-primary btn-lg text-center btn-block">Regístrar</button>
        </div>
      </form>
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
})(FormularioAlumno);
