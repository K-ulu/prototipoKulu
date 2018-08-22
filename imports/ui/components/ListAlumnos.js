/*
    Puede editar el nombre y apellido del alumno?, que tal del correo tambien?
    que tal si se olvido e ingreso mal el correo
*/
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

const buttonStyle = {
    margin: "10px 15px",
    maxWidth: "120px"
}

const customStyles = {
    option: (base, state) => ({
      ...base,
      borderBottom: '1px dotted pink',
      color: state.isFullscreen ? 'red' : 'blue',
      padding: 20,
    }),
    control: () => ({
      // none of react-selects styles are passed to <View />
      width: 200,
    }),
    singleValue: (base, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...base, opacity, transition };
    }
  }

class ListAlumnos extends Component {

    constructor(){
        let miId, matri,claveEs, idDoc, idGrupo, nomb, apeP, miCorreo;
        super()
        this.state = {
            selectedOption: null,
            isActive:false,
        }      
        this.editar = this.editar.bind(this);
    }

    componentWillMount(){
        Modal.setAppElement('body');
    }

    //Funciones de la tabla
    getData(){
        const data = [];
        let correo, userAlumno;
        let correos;
        const dataS = this.props.seleccion;		

        if (dataS == "todos" || dataS == null){
            
            this.props.events.map((event) => (
                correo = event.correo,
                correos = [{address: correo, verified:false}],

                //Verifica que los alumnos registrados tengan correos en la coleccion users
                userAlumno = Meteor.users.findOne({ emails: correos }), // will return all users
                (userAlumno != undefined) ? 
                    data.push( {
                        nombre: event.userId,
                        apellidoP: event.userId,
                        matricula: event.matricula,
                        claveEscuela: event.claveEscuela,
                        id: event._id,
                        idDocente: event.idDocente,
                        idGrupo: event.idGrupo,
                        correo: event.correo,
                        registrado: event.estatus,
                    })                
                : console.log("undefinido")                
            ))
        }
        else{
            const xgrupo = Alumnos.find( { idGrupo: dataS}).fetch();
            xgrupo.map((event) => (
                correo = event.correo,
                correos = [{address: correo, verified:false}],
                //Verifica que los alumnos registrados tengan correos en la coleccion users
                userAlumno = Meteor.users.findOne({ emails: correos }), // will return all users

                (userAlumno != undefined) ? 
                    data.push( {
                        nombre: event.userId,
                        apellidoP: event.userId,
                        matricula: event.matricula,
                        claveEscuela: event.claveEscuela,
                        id: event._id,
                        idDocente: event.idDocente,
                        idGrupo: event.idGrupo,
                        correo: event.correo,
                        registrado: event.estatus,
                    })                
                : console.log("undefinido")  
            ))
        }
        
        return data;
    }

    getColumns(){
        let xnombreG, xnombreA, correos;
        const columns = [{
            Header: 'Nombre',
            accessor: 'nombre', // String-based value accessors!
            maxwidth: 120,
            filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value),
            Cell: ({ original }) => {
                correos = [{address: original.correo, verified:false}],
                xnombreA =  Meteor.users.findOne({ emails:  correos }); // will return all users
                return (
                <div>
                    {xnombreA.profile.nombre}
                </div>
                    
            );}

        }, {
            Header: 'Apellido',
            accessor: 'apellidoP',
            maxwidth: 120,
            filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value),
            Cell: ({ original }) => {
                correos = [{address: original.correo, verified:false}],
                xnombreA =  Meteor.users.findOne({ emails:  correos }); // will return all users
                return (
                <div>
                    {xnombreA.profile.apellidoP}
                </div>
                    
            );}
        }, {
            Header: 'Matricula', // Required because our accessor is not a string
            accessor: 'matricula',
            maxwidth: 120,
            filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value)
        }, {
            Header: 'ClaveEscuela', // Custom header components!
            accessor: 'claveEscuela',
            width: 130,
            filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value)
        },{
            Header: 'Grupo', // Custom header components!
            accessor: 'idGrupo',
            maxwidth: 120,
            filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value),

            Cell: ({ original }) => {
                if (original.idGrupo != null) {
                    console.log(original.idGrupo);
                    xnombreG = Grupos.findOne({_id: original.idGrupo});
                    console.log(xnombreG);
                    return (
                        <div>
                            {xnombreG.nombreGrupo}
                        </div>
                    );
                }
                else{
                    return (
                        <div></div>
                    );
                } 
            }
        }, {
            Header: 'Correo', // Custom header components!
            accessor: 'correo',
            maxwidth: 120,
            filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value)
        }, {
            Header: 'Estado', // Custom header components!
            accessor: 'registrado',
            maxwidth: 100,
            filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value)
        },{
            Header: 'Opciones', // Custom header components!
            accessor: 'id',
            maxWidth: 320,
            filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["id"] }),
                
                Cell: ({ original }) => {
                    return (
                    <div className="row justify-content-between">
                        <button
                                className="btn btn-outline-warning col"
                                data-toggle="modal"
                                data-target="#myModal"
                                type="button"
                                style={buttonStyle}
                                onClick={() => this.handleEdit(
                                    original.correo,
                                    original.matricula,
                                    original.claveEscuela,
                                    original.id,
                                    original.idGrupo
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

    toggleModal = () =>{
        this.setState(
            {
            isActive:!this.state.isActive
            }
        )
    }

    //Funciones de editado
    handleEdit = (correo, matricula, claveEscuela, id, idGrupo) => {
        let correos = [{address: correo, verified:false}];
        let usuario =  Meteor.users.findOne({ emails:  correos }); // will return all users
        this.miCorreo = correo;
        this.nomb = usuario.profile.nombre;
        this.apeP= usuario.profile.apellidoP;
        this.matri= matricula;
        this.claveEs = claveEscuela;
        this.miId = id;
        if (idGrupo != null){
            const grupo = Grupos.findOne( { _id: idGrupo});
            this.setState(
                {
                    selectedOption: {
                        value: grupo._id,
                        label: grupo.nombreGrupo,
                    },
                }
            )
        }
        this.toggleModal();
    }
   //evento al mandar los datos del formulario
    editar(e){
        e.preventDefault();
        let grupo = this.state.selectedOption.value;
        let nombreU = this.refs.nombre.value.trim();
        let apePU = this.refs.apellidoP.value.trim();
        let matricula1 = this.refs.matricula.value.trim();
        let claveEscuela1 = this.refs.claveEscuela.value.trim();
        let correo = this.refs.correo.value.trim();
        this.props.editar(e,nombreU, apePU, correo, this.miId, matricula1, claveEscuela1, grupo);
        this.toggleModal();
    }

    //Funcion de eliminación
    handleDelete = (eventId) => {
        confirmAlert({
        title: 'Confirmación de Eliminación',
        message: '¿Esta seguro que desea eliminar?.',
        buttons: [
            {
            label: 'Yes',
            onClick: () => this.eliminar(eventId)
            },
            {
            label: 'No',
            onClick: () => alert('Click para cancelar!')
            }
        ]
        })
    };
    eliminar = (eventId) => {
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
        if (selectedOption != null){
            this.idGrupo = selectedOption.value;
        }
        else{
            this.idGrupo = null;
        }
    }

    render() {
        var misGrupos = this.getGrupos();
        const { selectedOption } = this.state;

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
                                        <button onClick={this.toggleModal}>Cerrar!</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body mt-2">
                                <form onSubmit={this.editar} className="form" role="form" autoComplete="off" id="formLogin">
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-user-circle-o">email</i></span>
                                                <input type="email" ref="correo" name="correo" className="form-control form-control rounded" defaultValue={this.miCorreo}/>
                                            </div>                                          
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-user fa-fw">Nombre</i></span>
                                                <input type="text" ref="nombre" name="nombre" className="form-control form-control rounded" defaultValue={this.nomb}/>
                                            </div>                                                                          
                                        </div>  
                                        <div className="col-12">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-user fa-fw">Apellido</i></span>
                                                <input type="text" ref="apellidoP" name="apellidoP" className="form-control form-control rounded" defaultValue={this.apeP}/>
                                            </div>                                                                          
                                        </div> 
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
                                    <Select
                                        value={selectedOption}
                                        onChange={this.handleChange}
                                        options={misGrupos}
                                        styles={customStyles}
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
        </div>
      );
    }
}

export default withTracker(() => {
    id = Session.get('user')._id;
    Meteor.subscribe("alumnos", id);
    console.log(Alumnos.find({}).fetch());
    Meteor.subscribe("grupos", id);
    Meteor.subscribe('allUsers');	
    return {
        events: Alumnos.find({idDocente: id}).fetch(),  
        grupos: Grupos.find({}).fetch(),
    }
})(ListAlumnos);