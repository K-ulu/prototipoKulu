import React from 'react';

import ElementoModal from './ElementoModal';

export default class ElementosForm extends React.Component {
  render () {
    return (
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-12 col-sm-6 col-lg-4">    
              {/* Boton que activa el modal */}                      
              <button type="button" className="ml-3 btn btn-primary btn-block" data-toggle="modal" data-target="#modalElementoNuevo">
                Nuevo
              </button>
            </div>             
          </div> 
          {/* modal */}
          <ElementoModal id="modalElementoNuevo" editing={ false } title="Nuevo elemento" actionName="Guardar"/>
        </div>    
      </div>
    );
  }
}