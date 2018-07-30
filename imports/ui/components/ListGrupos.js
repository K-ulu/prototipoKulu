import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Grupos } from "../../api/grupos";
import { Session } from 'meteor/session';

import ReactTable from 'react-table'
import "react-table/react-table.css";
// import matchSorter from 'match-sorter';
import Modal from 'react-modal';

const buttonStyle = {
    margin: "10px 10px",
    maxWidth: "120px"
}

class ListGrupo extends Component {

    constructor(){
        let nombGrupo, grad, grup, claveEscuela, idG;
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
                nombreGrupo: event.nombreGrupo,
                grado: event.grado,
                grupo: event.grupo,
                claveEscuela: event.claveEscuela,
                id: event._id,
            })
        ))

        return data;
    }

    getColumns(){
        const columns = [{
            Header: 'NombreGrupo',
            accessor: 'nombreGrupo', // String-based value accessors!
            width: 180,
            filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value)
          }, {
            Header: 'Grado',
            accessor: 'grado',
            width: 100,
            filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value)
          }, {
            Header: 'Grupo', // Required because our accessor is not a string
            accessor: 'grupo',
            width: 100,
            filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value)
        }, {
            Header: 'ClaveEscuela', // Custom header components!
            accessor: 'claveEscuela',
            width: 180,
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
                                    original.grado,
                                    original.grupo,
                                    original.nombreGrupo,
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

    handleEdit = (grado, grupo, nombreGrupo, claveEscuela, id) => {
        console.log(nombreGrupo);
        this.grad = grado;
        this. grup= grupo;
        this.nombGrupo= nombreGrupo;
        this.claveEscuela = claveEscuela;
        this.idG = id;
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
    let grado1 = this.refs.grado.value.trim();
    let grupo1 = this.refs.grupo.value.trim();
    let nombreGrupo1 = this.refs.nombreGrupo.value.trim();

    let claveEscuela1 = this.refs.claveEscuela.value.trim();

    Meteor.call('grupos.update', this.idG, nombreGrupo1, grado1, grupo1, claveEscuela1, (err, res) => {
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
        Meteor.call('grupos.remove', eventId, (err, res) => {
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
                                    <div className="col-12 col-sm-6">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-user-circle-o">Grado</i></span>
                                        <input type="text" ref="grado" name="grado" className="form-control form-control rounded" defaultValue={this.grad}/>
                                    </div>                                          
                                    </div>
                                    <div className="col-12 col-sm-6">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-user fa-fw">Grupo</i></span>
                                        <input type="text" ref="grupo" name="grupo" className="form-control form-control rounded" defaultValue={this.grup}/>
                                    </div>                                                                          
                                    </div>  
                                    <div className="col-12">                                        
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-envelope">Nombre</i></span>
                                        <input type="text" ref="nombreGrupo" name="nombreGrupo" className="form-control form-control rounded" defaultValue={this.nombGrupo}/>
                                    </div>                                         
                                    </div>  
                                    <div className="col-12">                                        
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-envelope">Clave Escuela</i></span>
                                        <input type="text" ref="claveEscuela" name="claveEscuela" className="form-control form-control rounded" defaultValue={this.claveEscuela}/>
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

        </div>
        );
    }
}

    export default withTracker(() => {
        id = Session.get('user')._id;
        console.log(id);
        Meteor.subscribe("grupos", id);
        return {
            events: Grupos.find({}). fetch()
        }
    })(ListGrupo);