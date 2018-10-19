import React from 'react';
import LibroNuevo from '../ui/components/uploadFiles/LibrosNuevo';
import ListaLibros from '../ui/components/uploadFiles/ListaLibros';

export default class BibliotecaLibros extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showComponent: false,
    }

    this.editar = this.nuevo.bind(this);
  }

  nuevo = () => {
    this.setState({
      showComponent: !this.state.showComponent
    });
  };

  render(){
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
                    <div className="col-6">
                      <h1 className="text-center">Libros</h1>
                    </div>     
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-10">
                      {/*buttons and filter options*/}
                      <div className="row justify-content-between">
                        <div className="col-2">
                          <button className="btn btn-primary btn-block" onClick={this.nuevo}>Nuevo</button>
                        </div>
                        <div className="col-2 btn-group" role="group" aria-label="Basic example">
                          <button  type="button" className="btn btn-secondary"><i className="fa fa-th-large"></i></button>
                          <button  type="button" className="btn btn-secondary"><i className="fa fa-align-justify"></i></button>                          
                        </div> 
                        {this.state.showComponent ? <LibroNuevo nuevo={this.nuevo} /> : null}
                      </div>
                      {/*Buscador..*/}
                      <div className="row justify-content-between">
                        <div className="col-12">
                          <form className="form-inline">
                            <input className="form-control mr-4 col-lg-8" type="text" placeholder="Buscar..."/>
                            <button className="btn btn-outline-success ml-4 col-lg-3" type="submit">Buscar</button>
                          </form>                  
                        </div>
                      </div>
                      {/*Cards 100%..*/}
                      <div className="row section-cards list">
                        <div className="col-12">                            
                          <ListaLibros/>
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