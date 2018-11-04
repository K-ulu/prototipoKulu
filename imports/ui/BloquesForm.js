import React from 'react';

import BloqueModal from './BloqueModal';

export default class BloquesForm extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-12 lg-10 offset-lg-1">
          <div className="row">
            <div className="col-sm-12 col-sm-6 col-lg-4">
              {/* Boton que activa el modal */}                      
              <button type="button" className="btn btn-primary btn-block" data-toggle="modal" data-target="#modalBloqueNuevo">
                Nuevo
              </button>
            </div>
          </div>
          {/* modal */}
          <BloqueModal id="modalBloqueNuevo" editing={ false } title="Nuevo bloque" actionName="Guardar"/>
        </div>
      </div>
    );
  }
}