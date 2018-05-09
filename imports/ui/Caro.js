import React from 'react'
import {Docente} from '../../server/Docente'

export default class Caro extends React.Component {
    constructor(props){
        let total = Docente.find().count();
        super(props);
        this.state = {
          error: '', //almacena el error
          value: '' //almacena valor del tipo de usuario
        };
    
        //contexto de navegador para nuestras funciones
        this.handleChange = this.handleChange.bind(this);    
        this.onSubmit = this.onSubmit.bind(this);
      }


    render(){
        return (
            <div>
            <p>hola caro</p>
            </div>
            
        );
    }
}
