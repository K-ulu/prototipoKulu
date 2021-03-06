import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { withRouter } from "react-router-dom";
import { Session } from 'meteor/session';
import Modal from 'react-modal';

import ListGrupo from './components/ListGrupos';

//Para las notificaciones!
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class MaestroGrupos extends React.Component{
  constructor(){
    super()

    this.state = {
      isActive:false
    }

    this.onSubmit = this.onSubmit.bind(this);
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

  //evento al mandar los datos del formulario
  onSubmit(e){
    e.preventDefault();
    //verifica contraseña
    let grado = this.refs.grado.value.trim();
    let grupo = this.refs.grupo.value.trim();
    let nombreGrupo = this.refs.nombreGrupo.value.trim();

    let claveEscuela = this.refs.claveEscuela.value.trim();

    Meteor.call('grupos.insert', nombreGrupo, grado, grupo, claveEscuela, (err, res) => {
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
    this.toggleModal();
  }

  logChange(val) {
    console.log("Selected: " + val);
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
                                  <h1>Mi Lista de Grupos</h1>
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


                          {/*Buscador..*/}
                          <div className="row justify-content-between">
                            <div className="col-12">
                                <form className="form-inline">
                                <input className="form-control mr-4 col-lg-8" type="text" placeholder="Buscar..."/>
                                <button className="btn btn-outline-success ml-4 col-lg-3" type="submit">Buscar</button>
                                </form>                  
                            </div>
                          </div>



                          {/*Aqui inicia para la lista de grupos..*/}
                          <div className = "card-table" >
                                <ListGrupo handleEdit={this.handleEdit} />
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
                        <h3 className="mb-0 text-center">Agregar Grupo!</h3>
                      </div>
                      <div className="col-2 col-sm-2 float:right">
                        <button onClick={this.toggleModal}>Cerrar!</button>
                      </div>
                      </div>
                    </div>
                      <div className="card-body mt-2">
                        <form onSubmit={this.onSubmit} className="form" role="form" autoComplete="off" id="formLogin">
                          <div className="row">
                            <div className="col-12 col-sm-6">
                              <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-user-circle-o"></i></span>
                                <input type="text" ref="grado" name="grado" className="form-control form-control rounded" placeholder="Grado"/>
                              </div>                                          
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-user fa-fw"></i></span>
                                <input type="text" ref="grupo" name="grupo" className="form-control form-control rounded" placeholder="Grupo"/>
                              </div>                                                                          
                            </div>  
                            <div className="col-12">                                        
                              <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                <input type="text" ref="nombreGrupo" name="nombreGrupo" className="form-control form-control rounded" placeholder="nombreGrupo"/>
                              </div>                                         
                            </div>  
                            <div className="col-12">                                        
                              <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                <input type="text" ref="claveEscuela" name="claveEscuela" className="form-control form-control rounded" placeholder="Clave Escuela"/>
                              </div>                                         
                            </div>                                   
                          </div>
                          <div className="row-login">
                            <button type="submit" className="btn btn-primary btn-lg text-center btn-block">Regístrar</button>
                          </div>
                        </form>
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

export default withRouter(MaestroGrupos);
