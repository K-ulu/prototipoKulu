import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Materias } from '../api/materias';
import { Bloques } from '../api/bloques';

class ElementoModalInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      materias: [], //almacena materia
      bloques: [], //almacena bloque
    };
  }

  adecuarTexto(texto){
    return texto.substr(0,1).toUpperCase()+texto.substr(1, texto.length);
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
      <div className="modal fade" id={ this.props.id } tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel"> { this.adecuarTexto(this.props.data.nombreElemento) }</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-12 col-md-8 col-lg-6">
                    <div className="card">
                      <img className="card-img-top" src={ this.adecuarTexto(this.props.fileUrl) } alt="Card image cap"/>                    
                      <div className="card-body">
                        <p className="card-text text-center"> { this.adecuarTexto(this.props.data.categoriaElemento) } </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-8 col-lg-6 mt-lg-3">
                    <div className="row">
                      <div className="col-12 text-sm-center text-lg-left">
                        <p className="text-muted">Descripción:</p>     
                        <p> { this.props.data.descripcionElemento } </p> 
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-sm-center text-lg-left">
                        <p className="text-muted">Materia:</p>              
                        <p>{ nombreMateria } </p> 
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-xs-center text-lg-left">
                        <p className="text-muted">Bloque:</p>  
                        <p>{ numBloque } - { nombreBloque }</p> 
                      </div>
                      <div className="col-12 text-xs-center text-lg-left">
                        <p className="card-text"> { this.props.data.fechaInicio } - { this.props.data.fechaFin } </p>
                      </div>
                    </div>                    
                  </div>
                </div>
              </div>
            </div>            
          </div>
        </div>
      </div> 
    );
  }
}

export default withTracker((props) => {
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
})(ElementoModalInfo);