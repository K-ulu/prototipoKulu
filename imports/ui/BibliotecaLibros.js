import React from 'react';
import { withRouter } from "react-router-dom";

import ListaLibros from '../ui/components/uploadFiles/ListaLibros';
import LibrosForm from './LibrosForm';

class BibliotecaLibros extends React.Component {
  render(){
    let form = null;
    if(this.props.tipo == 'adminContenido'){
      form = <LibrosForm/>
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
                    <div className="col-12 col-lg-10">
                      <h1 className="text-center">Libros</h1>
                      <p className="text-center mt-3">Anim culpa eu in non laboris reprehenderit veniam quis fugiat. Cillum enim aliqua aliquip officia laboris incididunt velit sunt adipisicing elit dolore anim magna. Est ea sint quis commodo et ad elit consectetur ipsum aliqua deserunt id laborum dolor. velit laboris occaecat. Et excepteur exercitation officia nulla velit et consectetur culpa mollit cillum quis.</p>
                    </div>     
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-10">
                      {/*form para agregar un nuevo elemento (disponible solo para admin de contenido)..*/}
                      { form }
                      {/*Cards 100%..*/}
                      <div className="row section-cards list">
                        <div className="col-12">                            
                          <ListaLibros history={ this.props.history } tipo={ this.props.tipo }/>
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

export default withRouter(BibliotecaLibros);