import React from 'react';

import MateriaModal from './MateriaModal';

export default class MateriasForm extends React.Component {
  render(){
    return(
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-12 col-sm-6 col-lg-4">    
              {/* Boton que activa el modal */}                      
              <button type="button" className="ml-3 btn btn-primary btn-block" data-toggle="modal" data-target="#modalMateriaNuevo">
                Nuevo
              </button>
            </div>             
          </div> 
          {/* modal */}
          <MateriaModal id="modalMateriaNuevo" editing={ false } title="Nueva materia" actionName="Guardar"/>
        </div>    
      </div>
    );
  }
}