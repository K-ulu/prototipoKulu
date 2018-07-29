import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Grupos } from "../api/grupos";
import { Session } from 'meteor/session';

import ReactTable from 'react-table'
import 'react-table/react-table.css'

const buttonStyle = {
    margin: "10px 10px",
    padding: "5px",
    maxWidth: "120px"
}

class ListGrupo extends Component {
    handleEdit = (eventId) => {
        // onEdit we want to have the form on AddEvents populate the fields and allow for editing
        // so we pass the eventId to the parent component so that it tells AddEvent component what data is to be displayed
        this.props.handleEdit(eventId);
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
        const data = [];
        
        this.props.events.map((event) => (
            data.push( {
                nombreGrupo: event.nombreGrupo,
                grado: event.grado,
                grupo: event.grupo,
                claveEscuela: event.claveEscuela
            })
        ))

        const columns = [{
            Header: 'NombreGrupo',
            accessor: 'nombreGrupo' // String-based value accessors!
          }, {
            Header: 'Grado',
            accessor: 'grado',
          }, {
            Header: 'Grupo', // Required because our accessor is not a string
            accessor: 'grupo',
          }, {
            Header: 'ClaveEscuela', // Custom header components!
            accessor: 'claveEscuela'
          },
          {
            Header: 'Opciones', // Custom header components!
            accessor: 'opciones'
          }
        ]
          
          return(
              <div>
            <ReactTable
                data={data}
                columns={columns}
                defaultPageSize={10}
                className="-striped -highlight"
            />
            </div>
          );


          
        // return (
        // <div>
        //     {
        //         this.props.events.length ? this.props.events.map((event) => (
        //             <div className="list-group" key={event._id} style={{ margin: "10px 100px" }}>
                        
        //                 <div className="list-group-item list-group-item-action flex-column align-items-start">

        //                     <div className="d-flex w-100 justify-content-between">
        //                             <h5 className="mb-1">{event.nombreGrupo}</h5>
        //                             <p className="mb-1">{event.grado}</p>

        //                             <button
        //                                 className="btn btn-outline-warning col"
        //                                 data-toggle="modal"
        //                                 data-target="#myModal"
        //                                 type="button"
        //                                 style={buttonStyle}
        //                                 onClick={() => this.handleEdit(event._id)}
        //                             >
        //                                 Editar Grupo
        //                             </button>

        //                             <button
        //                                 className="btn btn-outline-danger col"
        //                                 style={buttonStyle}
        //                                 onClick={() => this.handleDelete(event._id)}
        //                             >
        //                                 Eliminar Grupo
        //                             </button>
        //                     </div>

        //                 </div>
        //             </div>
        //         )) :
        //         <div className="no-events text-center" style={{ padding: "100px 0" }}>NO TIENE ALUMNOS REGISTRADOS!!!</div>
        //         }
        //     </div>
        //     );
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