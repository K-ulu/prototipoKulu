import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Alumnos } from "../../api/alumnos";
import { Session } from 'meteor/session';

import ReactTable from 'react-table'
import "react-table/react-table.css";
// import matchSorter from 'match-sorter';
import Modal from 'react-modal';

// import {Users} from "../../api/users";

const buttonStyle = {
  margin: "10px 15px",
  maxWidth: "120px"
}

class ListAlumnos extends Component {

  constructor(){
    let miId, matri,claveEs, idDoc;
    super()
    this.state = {
      isActive:false,
    }

    this.editar = this.editar.bind(this);
  }

  componentWillMount(){
    Modal.setAppElement('body');
  }

  getData(){
    const data = [];
    
    this.props.events.map((event) => (
        data.push( {
            nombre: event.nombre,
            apellidoP: event.apellidoP,
            matricula: event.matricula,
            claveEscuela: event.claveEscuela,
            id: event._id,
            idDocente: event.idDocente,
        })
    ))

    return data;
  }

  getColumns(){
    const columns = [{
        Header: 'Nombre',
        accessor: 'nombre', // String-based value accessors!
        width: 130,
        filterMethod: (filter, row) =>
            row[filter.id].startsWith(filter.value)
      }, {
        Header: 'Apellido',
        accessor: 'apellidoP',
        width: 130,
        filterMethod: (filter, row) =>
            row[filter.id].startsWith(filter.value)
      }, {
        Header: 'Matricula', // Required because our accessor is not a string
        accessor: 'matricula',
        width: 130,
        filterMethod: (filter, row) =>
            row[filter.id].startsWith(filter.value)
    }, {
        Header: 'ClaveEscuela', // Custom header components!
        accessor: 'claveEscuela',
        width: 130,
        filterMethod: (filter, row) =>
            row[filter.id].startsWith(filter.value)
      },
      {
        Header: 'Opciones', // Custom header components!
        accessor: 'id',
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["id"] }),
              
            Cell: ({ original }) => {
                return (
                <div>
                    <button
                            className="btn btn-outline-warning col"
                            data-toggle="modal"
                            data-target="#myModal"
                            type="button"
                            style={buttonStyle}
                            onClick={() => this.handleEdit(
                                // original.nombre,
                                // original.apellidoP,
                                original.matricula,
                                original.claveEscuela,
                                original.id
                            )}
                        >
                        Editar
                        </button>

                        <button
                            className="btn btn-outline-danger col"
                            style={buttonStyle}
                            onClick={() => this.handleDelete(original.id)}
                        >
                            Eliminar
                        </button>   
                    </div>
                    
                );
            }

        }
    ]

    return columns;
  }

  handleEdit = (/*nombre, apellidoP,*/ matricula, claveEscuela, id) => {
    console.log(matricula);
    // this.grad = nombre;
    // this. grup= apellidoP;
    this.matri= matricula;
    this.claveEs = claveEscuela;
    this.miId = id;
    this.setState(
    {
        isActive:!this.state.isActive
    }
    )
  }

   //evento al mandar los datos del formulario
   editar(e){
    e.preventDefault();
    //verifica contraseña
    let matricula1 = this.refs.matricula.value.trim();
    let claveEscuela1 = this.refs.claveEscuela.value.trim();

    Meteor.call('alumnos.update', this.miId, matricula1, claveEscuela1, (err, res) => {
      if (!err) {
        alert("editado");
      } else {
        alert("ocurrió un error al editar");
        alert(err.reason);
        console.log(err.reason);
      }
    });
    this.handleEdit();
  }

  handleDelete = (eventId) => {
    console.log(eventId);
    Meteor.call('alumnos.remove', eventId, (err, res) => {
        if (!err) {
            // this.handleModalClose();
            alert("eliminado!");
        } else {
            this.setState({error: ''});
        }
    });
  }

  render() {
    return(
      <div>
          {
          this.props.events.length ? 
              <ReactTable
                  data={this.getData()}
                  
                  filterable
                  defaultFilterMethod={(filter, row) =>
                  String(row[filter.id]) === filter.value}

                  columns={this.getColumns()}
                  defaultPageSize={5}
                  className="-striped -highlight"
              />

          :
              <div className="no-events text-center" style={{ padding: "100px 0" }}>NO TIENE ALUMNOS REGISTRADOS!!!</div>
          }

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
                          <h3 className="mb-0 text-center">Editar Grupo!</h3>
                      </div>
                      <div className="col-2 col-sm-2 float:right">
                          <button onClick={this.handleEdit}>Cerrar!</button>
                      </div>
                      </div>
                      </div>
                      <div className="card-body mt-2">
                          <form onSubmit={this.editar} className="form" role="form" autoComplete="off" id="formLogin">
                              <div className="row">
                                  {/* <div className="col-12 col-sm-6">
                                  <div className="input-group-prepend">
                                      <span className="input-group-text"><i className="fa fa-user-circle-o">Grado</i></span>
                                      <input type="text" ref="nombre" name="nombre" className="form-control form-control rounded" defaultValue={this.nomb}/>
                                  </div>                                          
                                  </div>
                                  <div className="col-12 col-sm-6">
                                  <div className="input-group-prepend">
                                      <span className="input-group-text"><i className="fa fa-user fa-fw">Grupo</i></span>
                                      <input type="text" ref="apellidoP" name="apellidoP" className="form-control form-control rounded" defaultValue={this.apP}/>
                                  </div>                                                                          
                                  </div>   */}
                                  <div className="col-12">                                        
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-envelope">Matricula</i></span>
                                        <input type="text" ref="matricula" name="matricula" className="form-control form-control rounded" defaultValue={this.matri}/>
                                    </div>                                         
                                  </div>  
                                  <div className="col-12">                                        
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-envelope">Clave Escuela</i></span>
                                        <input type="text" ref="claveEscuela" name="claveEscuela" className="form-control form-control rounded" defaultValue={this.claveEs}/>
                                    </div>                                         
                                  </div>                                   
                              </div>
                              <div className="row-login">
                                  <button type="submit" className="btn btn-primary btn-lg text-center btn-block">Editar</button>
                              </div>
                          </form>
                      </div>
                      {/*<!--/card-block-->*/}
                  </div>
                  {/*<!-- /form card login -->*/}
                  </div>
              </Modal>
          </section>

      </div>
      );
  }
}

export default withTracker(() => {
    id = Session.get('user')._id;
    console.log(id);
    Meteor.subscribe("alumnos", id);
    // Meteor.subscribe("users", id);
    // console.log(Users.find( { emails : "a@g.com" }));
    return {
        events: Alumnos.find({}). fetch()        
    }
})(ListAlumnos);