import React from 'react';

// Para confirmar eliminación;
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

//Para las notificaciones!
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class ListItemBloque extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    };

    this.removeBloque = this.removeBloque.bind(this);    
  }

  //funcion para eliminar bloque
  removeBloque(){ 
    confirmAlert({
      title: 'Confirmación de Eliminación',
      message: '¿Esta seguro que desea eliminar este archivo?.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => Meteor.call('bloques.remove', this.props.bloqueId, function (err, res) {
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
    return (
      <div className="col-12 col-md-12 col-lg-12">
        <div className="card">
          <div className="card-body br-none">
            <h5 className="card-title text-left">{ this.props.numBloque }.- { this.props.nombreBloque }</h5>  
            <div className="row">
              <div className="col-12">
                <p className="card-text text-muted text-left">{ this.props.descripcionBloque }</p>                
              </div>
            </div>               
            <div className="row">
              <div className="col-6 no-padding">
                <button className="btn btn-outline-primary btn-block"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>                
              </div>  
              <div className="col-6 no-padding">
                <button onClick={ this.removeBloque } className="btn btn-outline-danger btn-block"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
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