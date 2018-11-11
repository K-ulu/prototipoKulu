import React from 'react';
import { withRouter } from "react-router-dom";

import ListaElementos from './components/uploadFiles/ListaElementos';
import ElementosForm from './ElementosForm';

class BibliotecaElementos extends React.Component {
  
  render(){
    let form = null;
    if(this.props.tipo == 'adminContenido'){
      form = <ElementosForm/>
    } 
    return (
      <div>
        {/*Inicio componente */}
        {/*Inicio row */}
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              {/*Card*/}                  
              <div className="card noborder mb-3">
                <div className="card-body">
                  {/*Card title*/}
                  <div className="row justify-content-center">
                    <div className="col-10">
                      <h1 className="text-center">Elementos de Objetos de Aprendizaje</h1>
                      <p className="text-center mt-3">Aute id aliqua id consequat proident dolor. Excepteur qui nulla nisi commodo pariatur ea ipsum incididunt mollit et cupidatat fugiat id quis. Nisi irure non nisi amet laborum exercitation. Nostrud proident nostrud commodo laborum non ullamco.</p>
                    </div>     
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-10">
                      {/*form para agregar un nuevo elemento (disponible solo para admin de contenido)..*/}                      
                      { form }        
                      {/*Cards 100%..*/}
                      <div className="row ">
                        <div className="col-12">                            
                          <ListaElementos history={ this.props.history } tipo={ this.props.tipo }/>
                        </div>                        
                      </div>                          
                    </div>
                  </div>
                </div>
                {/*<div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>*/}
              </div>
            </div>
          </div>
          {/*Fin row */}
        {/*Fin componente */}
      </div>
    );
  }
}

export default withRouter(BibliotecaElementos);