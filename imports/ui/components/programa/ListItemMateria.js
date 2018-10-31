import React from 'react';

// Para confirmar eliminación;
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

//Para las notificaciones!
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class ListItemMateria extends React.Component {
  constructor(props){
    super(props);

    this.removeMateria = this.removeMateria.bind(this);
    this.renameMateria = this.renameMateria.bind(this);
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
  //funcion para renombrar materia
  renameMateria(){
    let validName = /[^a-zA-Z0-9 \.:\+()\-_%!&]/gi;
    let prompt    = window.prompt('Nuevo nombre: ', this.props.nombre);

    // Replace any non valid characters, also do this on the server
    if (prompt) {
      prompt = prompt.replace(validName, '-');
      prompt.trim();
    }   

    if (!_.isEmpty(prompt)) {
      Meteor.call('materiasRenameFile', this.props.materiaId, prompt, function (err, res) {
        if (err)
          console.log(err);
      })
    }

  }

  render(){
    return(
      <div className="col-12 col-md-6 col-lg-4">
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
                <button onClick={ this.renameMateria } className="btn btn-outline-primary btn-block"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>                
              </div>  
              <div className="col-6 no-padding">
                <button onClick={ this.removeMateria } className="btn btn-outline-danger btn-block"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
              </div>  
            </div>
          </div>          
        </div>
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
      </div>
    );
  }
}