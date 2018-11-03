import React from 'react';

import MateriaModal from './MateriaModal';

export default class MateriasForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {      
      nombreMateria: '',
      gradoMateria: '',
    };
  }
  
  render(){
    return(
      <div className="col-10">
        <div className="row justify-content-between">
          <div className="col-3">    
            {/* Boton que activa el modal */}                      
            <button type="button" className="btn btn-primary btn-block" data-toggle="modal" data-target="#modalMateriaNuevo">
              Nuevo
            </button>
          </div>             
        </div> 
        {/* modal */}
        <MateriaModal id="modalMateriaNuevo" editing={ false } title="Nueva materia" actionName="Guardar"/>

      </div>
    );
  }
}