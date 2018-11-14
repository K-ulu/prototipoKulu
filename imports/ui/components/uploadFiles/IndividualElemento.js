import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Materias } from '../../../api/materias';
import { Bloques } from '../../../api/bloques';

import ElementoModalInfo from '../../ElementoModalInfo';

class IndividualElemento extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      materias: [], //almacena materia
      bloques: [],
    };
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

  adecuarNombre(nombre){
    return (nombre.length > 10)? nombre.substr(0, 15) + '...': nombre;
  }

  adecuarTexto(texto){
    return texto.substr(0,1).toUpperCase()+texto.substr(1, texto.length);
  }

  render () {
    let nombreMateria = null;
    let nombreBloque = null;
    let numBloque = null;
    if(this.state.materias.length > 0 && this.state.bloques.length > 0){
      nombreMateria = this.state.materias[0].nombreMateria;
      nombreBloque = this.state.bloques[0].nombreBloque;
      numBloque = this.state.bloques[0].numBloque;
    }
    return (
      <div className="col-md-6 col-lg-4 ">
        <div className="card" id="document">
          <div className="text-center">
            <img className="card-img-top " src={ this.props.fileUrl} alt="pdf image"/>
          </div>          
          <div className="card-body br-none">
            <h5 className="card-title">{ this.adecuarNombre(this.props.data.nombreElemento) }</h5>
            <p className="card-text text-muted text-center">{ this.adecuarTexto(this.props.data.categoriaElemento) }</p>
            <p className="card-text text-center">{ nombreMateria }</p> 
            <p className="card-text text-center">{ numBloque } - { nombreBloque }</p> 
            <div className="row justify-content-center">
              <div className="col-8 no-padding">
                <button type="button" className="btn btn-outline-success btn-block" data-toggle="modal" data-target={ '#'+this.props.elementoId+'info' }><i className="fa fa-fw fa-eye"></i></button>                
              </div>  
            </div>
          </div>
        </div>
        <ElementoModalInfo id={ this.props.elementoId+'info' } {...this.props} />
      </div>
    );
  }
}

export default withTracker ((props) => {
  //obtenemos informacion de las materias
  let handle = Meteor.subscribe("materias");
  let isReady = handle.ready();
  let materias = Materias.find({ _id: props.data.claveMateria }).fetch();

  //obtenemos informacion de bloques
  let handleB = Meteor.subscribe("bloques");
  let isReadyB = handleB.ready();
  let bloques = Bloques.find({ _id: props.data.claveBloque }).fetch();

  return {
    isReady: isReady,
    materias: materias,
    isReadyB: isReadyB,
    bloques: bloques,
  };  

})(IndividualElemento);