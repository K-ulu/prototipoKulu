import React from 'react';
//import {Docente} from '../../server/Docente';

export default class Caro extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          error: '', //almacena el error
          value: '' //almacena valor del tipo de usuario
        };

        var id = 'cBTB28hDKwCNCwNvK';
        var rfc = 'ccc';
        var claveDocente='aaa';
        var claveEscuela = 'bbb'; 

        Meteor.call('docentes.update', id,rfc,claveDocente, claveEscuela, (err, res) => {
          if (!err) {
            // this.handleModalClose();
            alert("actualizado");
          } else {
            // this.setState({ error: err.reason });
            alert("ocurrió un error al editar");
            alert(err.reason);
            console.log(err.reason);
          }
        });

        id = '5xABqhmqiBwAyTdwn';
        var matricula='ccc';
        var claveEscuela = 'bbb'; 

        Meteor.call('alumnos.update', id,matricula,claveEscuela, (err, res) => {
          if (!err) {
            // this.handleModalClose();
            alert("actualizado");
          } else {
            // this.setState({ error: err.reason });
            alert("ocurrió un error al editar");
            alert(err.reason);
            console.log(err.reason);
          }
        });
    }


    render(){
        return (
            <div>
            <p>hola caro</p>
            </div>
            
        );
    }
}
