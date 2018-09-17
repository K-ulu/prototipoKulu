/*
  MaestroAlumnos hace uso de varios componentes.
  selectPrincipal: Este lo unico quee hace es mostrar un select en el cual dependiendo de lo que se seleccione mostrara 
                   desde el componente ListAlumno
  formularioAlumno: Mostrará un formulario cuando se seleccione registrar alumno
  ListAlumno: Despliega dentro de una tabla toda la lista de alumnos que tiene a cargo el docente dependiendo de los grupos
              que tenga registrado
*/
import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { withRouter } from "react-router-dom";
import { Session } from 'meteor/session';

import ListAlumnos from './components/ListAlumnos';
import FormularioAlumno from './components/formularioAlumno';
import SelectPrincipal from './components/selectPrincipal';

import Modal from 'react-modal';

//Para las notificaciones!
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class MaestroAlumnos extends React.Component { 
  constructor(){
    super()

    this.state = {
      isActive:false,
      opcionSelectP: "todos",
    }
    this.handleData = this.handleData.bind(this);
    this.insertar = this.insertar.bind(this);
    this.editar = this.editar.bind(this);
  }

  componentWillMount(){
    Modal.setAppElement('body');
  }

  toggleModal = () =>{
    this.setState(
      {
        isActive:!this.state.isActive
      }
    )
  }

  usersInsert(email, nombre, apellidoP){
    Meteor.call('users.insert', email, nombre, apellidoP, (err, res) => { //InsertaUsuarios
      if (!err) {
        console.log("usuario registrado");
      } else {
          console.log(err.reason)
      }
    });
  }

  alumnosInsert(matricula, claveEscuela, email, grupo, estado){
    Meteor.call('alumnos.insert2', matricula, claveEscuela, email, grupo, estado, (err, res) => {
      if (!err) {
        return(
          toast.success('Insertado!', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000
          })
        );
      } else {
        return(
          console.log(err.reason),
          toast.error("ocurrió un error al insertar", {
              position: toast.POSITION.TOP_CENTER
          })
        );
      }
    });
  }

  usersUpdate(email, nombre, apellidoP){
    Meteor.call('users.update', email, nombre, apellidoP,  (err, res) => {
      if (!err) {
        console.log("editado en usuarios");
      } else {
        console.log(err.reason);
      }
    });
  }

  alumnosUpdate(id, matricula, claveEscuela, grupo, email){
    let idDocente = Session.get('user')._id;//obtenemos el id del docente en turno
    console.log(idDocente);

    Meteor.call('alumnos.update', id, matricula, claveEscuela, grupo, email, idDocente, (err, res) => {
      if (!err) {
        return(
          toast.success('Editado!', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000
          })
        );
      } else {
        return(
          console.log(err.reason),
          toast.error("ocurrió un error al editar", {
              position: toast.POSITION.TOP_CENTER
          })
        );
      }
    });
  }

  // evento que inserta los datos en la colección alumnos
  insertar(e, nombre, apellidoP, matricula, claveEscuela, email, grupo, userExiste, alumnoExiste){
    e.preventDefault();  

    if (userExiste == undefined){//En caso de que el usuario no exista 
      this.usersInsert(email, nombre, apellidoP);
      this.alumnosInsert(matricula, claveEscuela, email, grupo, "no registrado");
    }

    else{ //En caso de que el usuario si exista
      this.usersUpdate(email, nombre, apellidoP);

      if (alumnoExiste == undefined){//En caso de que el alumno no exista!
        this.alumnosInsert(matricula, claveEscuela, email, grupo, "registrado");
      }

      else{//En caso de que exista el alumno
        this.alumnosUpdate(alumnoExiste._id, matricula, claveEscuela, grupo, email);

        Meteor.call('alumnos.updateStatus', alumnoExiste._id, "registrado", (err, res) => {
          if (!err) {
            // this.handleModalClose();
          } else {
            // this.setState({ error: err.reason });
            console.log(err.reason);
          }
        });
      }
    }
    this.toggleModal();
  }

  //evento al mandar los datos del formulario
  editar(e,nombreU, apellidoPU, correo, miId, matricula1, claveEscuela1, idGrupo){
    e.preventDefault();
    this.usersUpdate(correo, nombreU, apellidoPU);
    this.alumnosUpdate(miId, matricula1, claveEscuela1, idGrupo, correo);
  }

  handleData(data) {
    this.setState({
      opcionSelectP: data
    });
  }

  render () {    
    return (
      <div>
      {/*Inicio componente */}
        {/*Inicio row */}
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="card noborder mb-3">
                <div className="card-body">
                  {/*title*/}
                  <div className="row justify-content-center">
                    <div className="col-6">
                      <h1>Mi Lista de Alumnos!</h1>
                    </div>     
                  </div>

                  <div className="row justify-content-center">
                    <div className="col-10">
                    {/*buttons and filter options*/}
                      <div className="row justify-content-between">

                        <div className="col-2">
                          <button onClick={this.toggleModal} className="btn btn-primary btn-block">Nuevo</button>
                        </div>

                        <div className="col-2 btn-group" role="group" aria-label="Basic example">
                          <button  type="button" className="btn btn-secondary"><i className="fa fa-th-large"></i></button>
                          <button  type="button" className="btn btn-secondary"><i className="fa fa-align-justify"></i></button>                          
                        </div> 

                      </div>


                      {/*Buscar alumnos mediante un select*/}
                      <div className="row justify-content-between">
                        <div className="col-12">
                        <SelectPrincipal  handlerFromParant={this.handleData}/>                 
                        </div>
                      </div>

                      {/*Aqui inicia para la lista de grupos..*/}
                      <div className = "card-table2">
                        <ListAlumnos editar={this.editar} seleccion={this.state.opcionSelectP}/>
                      </div>                         
                        
                    </div>
                  </div>
                </div>
                  {/*<div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>*/}
                </div>
            </div>
          </div>
          {/*Fin row */}
          {/*Modal de inseerción */}
          <section className="row justify-content-center">
            <Modal 
              isOpen={this.state.isActive} 
              onRequestClose={this.toggleModal}
              contentLabel="Inline Styles Modal Example"
            style={{
              overlay: {
                //position: absolute,
                top: 60,
                left: 250,
                right: 250,
                bottom: 40,
              },
              content: {
                color: 'purple'
              }
            }}
            >
            <div >
              <span className="anchor" id="formLogin"></span>
              <div className="card rounded">
                <div className="card-header mt-2">
                  <div className="row">
                    <div className="col-14 col-sm-6">
                      <h3 className="mb-0 text-center">Agregar Alumno!</h3>
                    </div>
                    <div className="col-2 col-sm-2 float:right">
                      <button onClick={this.toggleModal}>Cerrar!</button>
                    </div>
                  </div>
                </div>
                <div className="card-body mt-2">
                  <FormularioAlumno insertar={this.insertar} />
                </div>
                {/*<!--/card-block-->*/}
              </div>
                {/*<!-- /form card login -->*/}
            </div>
          </Modal>
        </section>
        <ToastContainer
            hideProgressBar={true}
            newestOnTop={true}
            autoClose={5000}
        />
      </div>
    );
  }
}
export default withRouter(MaestroAlumnos);







