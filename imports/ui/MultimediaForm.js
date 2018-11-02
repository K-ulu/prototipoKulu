import React from 'react';

import ContenidosMultimediaNuevo from './components/uploadFiles/ContenidosMultimediaNuevo';

export default class MultimediaForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showComponent: false,
    }

    this.editar = this.nuevo.bind(this);
  }

  nuevo = () => {
    this.setState({
      showComponent: !this.state.showComponent
    });
  };
  render(){
    return(
      <div className="row justify-content-between">
        <div className="col-2">
          <button className="btn btn-primary btn-block" onClick={this.nuevo}>Nuevo</button>
        </div>
        <div className="col-2 btn-group" role="group" aria-label="Basic example">
          <button  type="button" className="btn btn-secondary"><i className="fa fa-th-large"></i></button>
          <button  type="button" className="btn btn-secondary"><i className="fa fa-align-justify"></i></button>                          
        </div> 
        { this.state.showComponent ? <ContenidosMultimediaNuevo nuevo={this.nuevo} /> : null}
        
      </div>

    );
  }
}