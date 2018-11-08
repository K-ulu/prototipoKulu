import React from 'react';

// Para confirmar eliminación;
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

//Para las notificaciones!
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TemaModal from '../../TemaModal';

export default class ListItemTema extends React.Component {
  constructor(props){
    super(props);

    this.removeTema = this.removeTema.bind(this);    
  }

  //funcion para eliminar tema
  removeTema(){
    confirmAlert({
      title: 'Confirmación de Eliminación',
      message: '¿Esta seguro que desea eliminar este archivo?.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => Meteor.call('temas.remove', this.props.temaId, function (err, res) {
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
    return(
      <div className="col-12 col-md-12 col-lg-12">
        <div className="card">
          <div className="card-body br-none">
            <h5 className="card-title text-left">{ this.props.numTema } - { this.props.nombreTema }</h5>  
            <div className="row">
              <div className="col-12">
                <p className="card-text text-muted text-left">{ this.props.descripcionTema }</p>                
              </div>
            </div>               
            <div className="row">
              <div className="col-6 no-padding">
                {/*<button className="btn btn-outline-primary btn-block"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>*/}
                <button type="button" className="btn btn-outline-primary btn-block" data-toggle="modal" data-target={ '#'+this.props.temaId }>
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button>
              </div>  
              <div className="col-6 no-padding">
                <button onClick={ this.removeTema } className="btn btn-outline-danger btn-block"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
              </div>  
            </div>
          </div>          
        </div>
        <TemaModal id={ this.props.temaId } editing={ true } title="Editar tema" actionName="Editar" {...this.props}/>
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
      </div>
    );
  }
}