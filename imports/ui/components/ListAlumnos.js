import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Alumnos } from "../../api/alumnos";
import { Session } from 'meteor/session';

import ReactTable from 'react-table'
import "react-table/react-table.css";
import Modal from 'react-modal';
// import matchSorter from 'match-sorter';

// Para confirmar eliminación;
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

//Para las notificaciones!
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Select from 'react-select';
import {Grupos} from "../../api/grupos";

const dot = (color = "#ccc") => ({
    alignItems: "center",
    display: "flex",
  
    ":before": {
      backgroundColor: color,
      borderRadius: 10,
      content: " ",
      display: "block",
      marginRight: 8,
      height: 10,
      width: 10
    }
  });
  
  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
            ? data.color
            : isFocused
              ? color.alpha(0.1).css()
              : null,
        color: isDisabled
          ? "#ccc"
          : isSelected
            ? chroma.contrast(color, "white") > 2
              ? "white"
              : "black"
            : data.color,
        cursor: isDisabled ? "not-allowed" : "default"
      };
    },
    input: styles => ({ ...styles, ...dot() }),
    placeholder: styles => ({ ...styles, ...dot() }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) })
  };

  
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
      selectedOption: null,
    }

    this.editar = this.editar.bind(this);
  }

  componentWillMount(){
    Modal.setAppElement('body');
  }

  //Funciones de la tabla
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
        maxWidth: 310,
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
                            onClick={() => this.submit(original.id)}
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

  //Funciones de editado
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
    this.handleEdit();
  }

    //Funcion de eliminación
    submit = (eventId) => {
        confirmAlert({
        title: 'Confirmación de Eliminación',
        message: '¿Esta seguro que desea eliminar?.',
        buttons: [
            {
            label: 'Yes',
            onClick: () => this.handleDelete(eventId)
            },
            {
            label: 'No',
            onClick: () => alert('Click para cancelar!')
            }
        ]
        })
    };
    handleDelete = (eventId) => {
        console.log(eventId);
        Meteor.call('alumnos.remove', eventId, (err, res) => {
            if (!err) {
                return(
                    toast.info('🦄Eliminado!', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 3000
                    })
                );
            } else {
                this.setState({error: ''});
            }
        });
    }

    //Funciones del select
  getGrupos(){
    const grup = [];
    
    this.props.grupos.map((grupo) => (
        grup.push( {
            value: grupo._id,
            label: grupo.nombreGrupo,
        })
    ))
    return grup; 
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

render() {
    var misGrupos = this.getGrupos();
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
                    maxWidth="800"
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
                                  <Select
                                    name="form-field-name"
                                    value={selectedOption}
                                    options={misGrupos}
                                    onChange={this.handleChange}
                                    styles={colourStyles}
                                />                                
                              </div> 
                              <Select 
                                    label="Single select" 
                                    value={selectedOption}
                                    options={misGrupos}
                                    styles={colourStyles} 
                                    onChange={this.handleChange}
                                />
                         
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

            <ToastContainer
                hideProgressBar={true}
                newestOnTop={true}
                autoClose={5000}
            />

            <Select
                                    name="form-field-name"
                                    value="one"
                                    options={misGrupos}
                                    onChange={this.handleChange}
                                    styles={colourStyles}
                                /> 
        </div>
      );
  }
}

export default withTracker(() => {
    id = Session.get('user')._id;
    console.log(id);
    Meteor.subscribe("alumnos", id);
    Meteor.subscribe("grupos", id);

    // console.log(Alumnos.findOne( { correo : "a@g.com" }));
    return {
        events: Alumnos.find({}). fetch(),  
        grupos: Grupos.find({}).fetch()   
  
    }
})(ListAlumnos);