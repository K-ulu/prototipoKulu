import React from 'react';

// Para confirmar eliminación;
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

//Para las notificaciones!
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MateriaModal from '../../MateriaModal';

export default class ListItemMateria extends React.Component {
  constructor(props){
    super(props);

    this.removeMateria = this.removeMateria.bind(this);    
  }

  //funcion para eliminar materia
  removeMateria(){
    confirmAlert({
      title: 'Confirmación de Eliminación',
      message: '¿Esta seguro que desea eliminar este archivo?.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => Meteor.call('materias.remove', this.props.materiaId, function (err, res) {
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

  render(){
    return(
      <div className="col-12 col-lg-6">
        <div className="card">
          <div className="card-body br-none">
            <h5 className="card-title">{ this.props.nombre }</h5>  
            <div className="row">
              <div className="col-12">
                <p className="card-text text-muted text-center">Grado: { this.props.grado }</p>
                <p className="card-text  text-muted text-center">Bloques: { this.props.cantBloques }</p>
              </div>
            </div>               
            <div className="row">
              <div className="col-6 no-padding">
                {/*<button onClick={ this.renameMateria } className="btn btn-outline-primary btn-block" data-toggle="modal" data-target="#modalMateriaNuevo"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>                */}
                <button type="button" className="btn btn-outline-primary btn-block" data-toggle="modal" data-target={ '#'+this.props.materiaId }>
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button>
              </div>  
              <div className="col-6 no-padding">
                <button onClick={ this.removeMateria } className="btn btn-outline-danger btn-block"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
              </div>  
            </div>
          </div>          
        </div>
        <MateriaModal id={ this.props.materiaId } editing={ true } title="Editar materia" actionName="Editar" {...this.props}/>
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
      </div>
    );
  }
}