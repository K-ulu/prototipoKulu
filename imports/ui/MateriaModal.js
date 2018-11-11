import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class MateriaModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nombreMateria: '',
      gradoMateria: '',
    };

    this.handleChangeMateria = this.handleChangeMateria.bind(this);
    this.onSubmitMateria = this.onSubmitMateria.bind(this);
  }

  //evento del select cuandose escoge una materia
  handleChangeMateria(event){
    this.setState({ gradoMateria: event.target.value });
  }

  // guardar o editar materi
  onSubmitMateria(e){
    e.preventDefault();

    //recuperamos texto del mensaje
    let nombre = this.refs.nombreMateria.value.trim();
    let grado = this.state.gradoMateria;    
    
    //determinamos en que modo se abrio el modal
    if(this.props.editing){
      if(nombre && grado){
        Meteor.call('materias.update', this.props.materiaId, nombre, grado, (err, res) => {
          if (!err) { //mensaje enviado
            $('#'+this.props.id).modal('hide');
            /*this.refs.nombreMateria.value = '';
            this.setState({ gradoMateria: 'seleccione'});*/           
          } else { //error al enviar mensaje
            console.log(err.reason);
            $('#'+this.props.id).modal('hide');
          }
        });

      }

    } else {
      //verificamos si existe el mensaje
      if(nombre && grado){      
        Meteor.call('materias.insert', nombre, grado, (err, res) => {
          if (!err) { //mensaje enviado
            $('#'+this.props.id).modal('hide');
            this.refs.nombreMateria.value = '';
            this.setState({ gradoMateria: 'seleccione'});           
          } else { //error al enviar mensaje
            console.log(err.reason);
            $('#'+this.props.id).modal('hide');
          }
        });
      }
    }       
  }    

  componentDidMount() {      
    //si se abrio el modal en modo edicion cargamos los datos
    if(this.props.editing){
      this.setState({ nombreMateria: this.props.nombre, gradoMateria: this.props.grado });      
    }
  }

  render() {    
    return (
      <div className="modal fade" id={ this.props.id } tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel"> { this.props.title }</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={ this.onSubmitMateria }>    
            <div className="modal-body">                                          
                <div className="form-group">
                  <label htmlFor="nombreMateria">Materia: </label>
                  <input type="text" className="form-control" id="nombreMateria" ref="nombreMateria" defaultValue={ this.state.nombreMateria } placeholder="Biología..."/>                                  
                </div>
                <div className="form-group">
                  <label htmlFor="escogeGrado">Seleccione grado: </label>
                  <select value={this.state.gradoMateria} onChange={this.handleChangeMateria} id="escogeGrado" className="form-control form-control rounded">
                    <option value ="seleccione">Seleccione grado</option>																
                    <option value="5">5</option>
                    <option value ="6">6</option>                                  
                  </select>
                </div>   
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              <button className="btn btn-primary">{ this.props.actionName }</button>
            </div>
            </form>
          </div>
        </div>
      </div> 
    );
  }
}