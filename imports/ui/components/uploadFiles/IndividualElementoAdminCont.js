import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

// Para confirmar eliminación;
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

//Para las notificaciones!
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Materias } from '../../../api/materias';
import { Bloques } from '../../../api/bloques';

import ElementoModal from '../../ElementoModal';
import ElementoModalInfo from '../../ElementoModalInfo';

class IndividualElementoAdminCont extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      materias: [], //almacena materia
      bloques: [], //almacena bloque
    };

    //binding functions
    this.elementoRemoveFile = this.elementoRemoveFile.bind(this);
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

  elementoRemoveFile() {
    confirmAlert({
      title: 'Confirmación de Eliminación',
      message: '¿Esta seguro que desea eliminar este elemento?.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => Meteor.call('elementos.remove', this.props.elementoId, function (err, res) {
            if (!err){
              return(
                toast.info('🦄Eliminado!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000
                })
              );
            }
            else{
              console.log(err);
            }
          })
        },
        {
          label: 'No',
          onClick: () => alert('Click para cancelar!')
        }
      ]
    })
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
      <div className="col-md-4 ">
        <div className="card" id="document">
          <div className="text-center">
            <img className="card-img-top " src={ this.props.fileUrl} alt="pdf image"/>
          </div>          
          <div className="card-body br-none">
            <h5 className="card-title">{ this.adecuarNombre(this.props.data.nombreElemento) }</h5>
            <p className="card-text text-muted text-center">{ this.adecuarTexto(this.props.data.categoriaElemento) }</p>
            <p className="card-text text-center">{ nombreMateria } </p> 
            <p className="card-text text-center">{ numBloque } - { nombreBloque }</p> 
            <div className="row justify-content-center">              
              <div className="col-4 no-padding">
                <button type="button" className="btn btn-outline-success btn-block" data-toggle="modal" data-target={ '#'+this.props.elementoId+'info' }><i className="fa fa-fw fa-eye"></i></button>                
              </div>  
              <div className="col-4 no-padding">
                <button type="button" className="btn btn-outline-primary btn-block" data-toggle="modal" data-target={ '#'+this.props.elementoId }>
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button>
              </div>  
              <div className="col-4 no-padding">
                <button onClick={ this.elementoRemoveFile }  className="btn btn-outline-danger btn-block"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
              </div>                
            </div>
          </div>
        </div>
        <ElementoModal id={ this.props.elementoId } editing={ true } title="Editar elemento" actionName="Editar" {...this.props}/>
        <ElementoModalInfo id={ this.props.elementoId+'info' } {...this.props} />
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
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

})(IndividualElementoAdminCont);