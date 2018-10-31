import React from 'react';

import { withTracker } from 'meteor/react-meteor-data';

import ListaBloques from '../ui/components/programa/ListaBloques';

import { Materias } from '../api/materias';
import { Bloques } from '../api/bloques';

class AdminContenidoBloques extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      claveMat: '', //guarda clave de la materia (select)
      materias: [], //almacena todas las materias guardadas
      bloques: [], //almacena todos los bloques
      optionsBloquesSelect: [], //guarda los bloques de acuerdo a la materia seleccionada
    };

    //bloques
    this.handleChangeMateria = this.handleChangeMateria.bind(this);
  }

  //actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.isReady && nextProps.isReadyB){
			return {
        materias: nextProps.materias,
        bloques: nextProps.bloques,
      };
		}
		//retornamos null cuando no sea necesario actualizar state
		return null;
  }

  //evento que se ejecuta al escoger un valor del select (determinamos el id de la materia seleccionada)
  handleChangeMateria(event){    
    this.setState({ claveMat: event.target.value });  
    //filtramos los blques de acuerdo a la materia seleccionada
		let bloquesMateria = this.state.bloques.filter(bloque => bloque.idMateria ==  event.target.value);
		//actualizamos state para mostrar los bloques de acuerdo a la materia seleccionada
    this.setState({ optionsBloquesSelect: bloquesMateria });
  }
  
  //mostramos las materias registradas en el select
  renderMateriasListItems(){
    if(this.state.materias.length > 0){
      return this.state.materias.map((materia) => {
        return <option key={materia._id} value={materia._id}>{materia.nombreMateria}</option>
      });
    }    
  }
  
  render(){
    return(
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
                      <h1 className="text-center">Bloques</h1>
                      <p className="text-center mt-3">Aute id aliqua id consequat proident dolor. Excepteur qui nulla nisi commodo pariatur ea ipsum incididunt mollit et cupidatat fugiat id quis. Nisi irure non nisi amet laborum exercitation. Nostrud proident nostrud commodo laborum non ullamco.</p>
                    </div>     
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-10">
                      {/*form para agregar un nuevo elemento (disponible solo para admin de contenido)..*/}
                      { /*form*/ }                      
                      {/*Cards 100%..*/}
                      <div className="row section-cards list">                        
                        <div className="col-12">  
                          <div className="row justify-content-center">
                            <div className="col-12 col-lg-10">
                              <select value={this.state.claveMat} onChange={this.handleChangeMateria} className="form-control form-control rounded">
                                <option value ="seleccione">Seleccione materia</option>		
                                { this.renderMateriasListItems() }                              
                              </select> 
                            </div>
                          </div>  
                          <div className="row justify-content-center">
                            <div className="col-12 col-lg-10">
                              <ListaBloques claveMat={ this.state.claveMat } />
                            </div>
                          </div>                          
                        </div>                        
                      </div>                          
                    </div>
                  </div>
                </div>                
              </div>
            </div>
          </div>
          {/*Fin row */}
        {/*Fin componente */}
      </div>
    );
  }
}

export default withTracker(() => {
  //obtenemos informacion de las materias
  let handle = Meteor.subscribe("materias");
  let isReady = handle.ready();
  let materias = Materias.find().fetch();
  //obtenemos informacion de bloques
  let handleB = Meteor.subscribe("bloques");
  let isReadyB = handleB.ready();
  let bloques = Bloques.find().fetch();
  return {
    isReady: isReady,
    materias: materias,
    isReadyB: isReadyB,
    bloques: bloques,
  };

})(AdminContenidoBloques);