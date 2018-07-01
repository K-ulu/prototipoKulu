import React from 'react';

export default class SaveImages extends React.Component {
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
              <p>Probando guardar imagenes</p>
            </div>          
        );
    }
}
