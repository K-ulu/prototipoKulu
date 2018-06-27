import React from 'react';

export default class Pruebas extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          error: '', //almacena el error
          value: '' //almacena valor del tipo de usuario
        };
      
    }

    render(){
        return (
            <div>
              <p>Haciendo pruebas!!!</p>
            </div>          
        );
    }
}
