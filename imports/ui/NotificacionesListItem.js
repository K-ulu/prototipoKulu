import React from 'react';
import { withRouter } from "react-router-dom";

// Para confirmar eliminación;
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

//Para las notificaciones!
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class NotificacionesListItem extends React.Component {

  constructor(props) {
    super(props);

    this.removeNotification = this.removeNotification.bind(this);
    this.joinSession = this.joinSession.bind(this);
    this.prepararUsuario = this.prepararUsuario.bind(this);
  }

  joinSession(e){
    e.preventDefault();
    //seteamos en la sesion los valores de la sesion a la que se unira
    //redireccionamos a donde estara el lobby
    //guardamos el objeto sesionAprendizaje en Sesion    
    this.prepararUsuario(); //anexamos al usuario
    Session.setPersistent('sesion', this.props.sesionAprendizaje);
    Session.setPersistent('enSesion', true);
    //redireccionamos
    location.href='/dashboard/sesion'; 
  }

  prepararUsuario(){
    let usuario = Meteor.user();
    usuario.esAnfitrion = false;
    //anexamos el usuario a la lista de activos en la sesion
    this.props.sesionAprendizaje.activos.push(usuario);

    console.log('lista preprarar usuario: ', this.props.sesionAprendizaje.activos);
    //actualizamos en la base de datos
    Meteor.call('sesionesAprendizaje.updateActivos', this.props.sesionAprendizaje._id, this.props.sesionAprendizaje.activos, (err, res) => {
      if(!err){
        console.log('actualizando activos');
      } else {
        console.log(err.reason);
      }
    });

  }

  removeNotification() {
    confirmAlert({
      title: 'Confirmación de Eliminación',
      message: '¿Esta seguro que desea eliminar esta notificacion?.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => Meteor.call('notificaciones.remove', this.props._id, function (err, res) {
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
          onClick: () => console.log('elimnar')
        }
      ]
    })
  }

  componentDidMount(){
    console.log('props item', this.props);
  }
  render () {
    return (
      <div className="col-12 col-lg-10">
        <div className="card">
          <div className="card-body br-none m-notfic">
            <h5 className="card-title"> { this.props.titulo } </h5>  
            <div className="row justify-content-center">
              <div className="col-8">
                <p className="card-text text-muted text-center"> { this.props.descripcion } </p>                
              </div>
              <div className="col-2">
              <button onClick={ this.joinSession } className="btn btn-outline-success btn-block"><i className="fa fa-sign-in" aria-hidden="true"></i></button>
              </div>
              <div className="col-2">
                <button onClick={ this.removeNotification } className="btn btn-outline-danger btn-block"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
              </div>
            </div>   
          </div>          
        </div>
        {/*<MateriaModal id={ this.props.materiaId } editing={ true } title="Editar materia" actionName="Editar" {...this.props}/>*/}
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
      </div>
    );
  }
}

export default withRouter(NotificacionesListItem);