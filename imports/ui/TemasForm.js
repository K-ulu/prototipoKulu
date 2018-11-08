import React from 'react';

import TemaModal from './TemaModal';

export default class TemasForm extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-12 lg-10 offset-lg-1">
          <div className="row">
            <div className="col-sm-12 col-sm-6 col-lg-4">
              {/* Boton que activa el modal */}                      
              <button type="button" className="btn btn-primary btn-block" data-toggle="modal" data-target="#modalTemaNuevo">
                Nuevo
              </button>
            </div>
          </div>
          {/* modal */}
          <TemaModal id="modalTemaNuevo" editing={ false } title="Nuevo Tema" actionName="Guardar"/>
        </div>
      </div>
    );
  }
}