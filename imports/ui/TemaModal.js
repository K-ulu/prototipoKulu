import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Materias } from '../api/materias';
import { Bloques } from '../api/bloques';

class TemaModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      materias: [], //almacena todas las materias guardadas
      bloques: [], //almacena todos los bloques guardados
      optionsBloquesSelect: [], //guarda los bloques de acuerdo a la materia seleccionada
      claveMat: '', //almacena clave de la materia (select)
      claveBloque: '', //almacena clave del bloque (select)
      numTema: '',
      nombreTema: '',
      descripcionTema: '',

    };

    this.onSubmitTema = this.onSubmitTema.bind(this);
    //contexto para funciones
    this.handleChangeMateria = this.handleChangeMateria.bind(this);
    this.handleChangeBloque = this.handleChangeBloque.bind(this);
    this.handleChangeNumTema = this.handleChangeNumTema.bind(this);
  }

  componentDidMount() {
    //si se abrio el modal en modo edicion cargamos los datos
    if(this.props.editing){
      this.refs.nombreTema.value = this.props.nombreTema;
      this.refs.descripcionTema.value = this.props.descripcionTema; 
      this.setState({ numTema: this.props.numTema, claveBloque: this.props.idBloque });
    }
  }

  //actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.isReady && nextProps.isReadyB){      
			return {
        materias: nextProps.materias,
        bloques: nextProps.bloques,
      };
		}
		//retornamos null cuando no sea necesario actualizar state
		return null;
  }

  //guardar o editar informacion de temas
  onSubmitTema(e) {
    e.preventDefault();

    //recolectando la informacion
    let claveBloque = this.state.claveBloque;
    let nombreTema = this.refs.nombreTema.value.trim();
    let descripcionTema = this.refs.descripcionTema.value.trim();
    let numTema = this.state.numTema;

    //determinamos en que modo se abrio el modal
    if(this.props.editing){
      Meteor.call('temas.update', this.props.id, nombreTema, descripcionTema, numTema, claveBloque, (err, res) => {
        if(!err){
          $('#'+this.props.id).modal('hide');
          /*this.refs.nombreTema.value = '';
          this.refs.descripcionTema.value = '';
          this.setState({ claveBloque: 'seleccione', numTema: 'seleccione' });*/
        } else {
          $('#'+this.props.id).modal('hide');
          //console.log(err.reason + ' error al insertar tema');
        }
      });
    } else {
      Meteor.call('temas.insert', nombreTema, descripcionTema, numTema, claveBloque, (err, res) => {
        if(!err){
          $('#'+this.props.id).modal('hide');
          //console.log('tema insertado');
          this.refs.nombreTema.value = '';
          this.refs.descripcionTema.value = '';
          this.setState({ claveBloque: 'seleccione', numTema: 'seleccione' });
        } else {
          $('#'+this.props.id).modal('hide');
          //console.log(err.reason + ' error al insertar tema');
        }
      });
    }
    

  }

  //evento que se ejecuta al escoger un valor del select (determinamos el id de la materia seleccionada)
  handleChangeMateria(event){    
    this.setState({ claveMat: event.target.value });  
    //filtramos los blques de acuerdo a la materia seleccionada
		let bloquesMateria = this.state.bloques.filter(bloque => bloque.idMateria ==  event.target.value);
    //actualizamos state para mostrar los bloques de acuerdo a la materia seleccionada    
    this.setState({ optionsBloquesSelect: bloquesMateria });
  }

  handleChangeBloque(event){
    this.setState({ claveBloque: event.target.value }); //id del bloque seleccionado
  }

  //evento del select del num tema
  handleChangeNumTema(event){
    this.setState({ numTema: event.target.value });
  }

  //mostramos las materias registradas en el select
  renderMateriasListItems(){
    if(this.state.materias.length > 0){
      return this.state.materias.map((materia) => {
        return <option key={materia._id} value={materia._id}>{materia.nombreMateria}</option>
      });
    }    
  }

  renderBloquesListItems(){
		if(this.state.optionsBloquesSelect.length > 0 ){
			return this.state.optionsBloquesSelect.map((bloque) => {
				return <option key={bloque._id} value={bloque._id}>{bloque.nombreBloque} - Bloque {bloque.numBloque} </option>
			});
		} 
	}

  render() {
    //mostramos los selects de acuerdo al tipo de modo en que se abrio el modal
    let selects = (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor="escogeMateria">Seleccione materia: </label>
        <select value={ this.state.claveMateria } onChange={this.handleChangeMateria} id="escogeMateria" className="form-control form-control rounded">
          <option value ="seleccione">Seleccione materia</option>																
          { this.renderMateriasListItems() }                                
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="escogeBloque">Seleccione materia: </label>
        <select value={this.state.claveBloque} onChange={this.handleChangeBloque} id="escogeBloque" className="form-control form-control rounded">
          <option value ="seleccione">Seleccione bloque</option>																
          { this.renderBloquesListItems() }                               
        </select>
      </div>
    </React.Fragment>);
    //si entro en modo edicion oculto los campos que no voy a mostrar
    if(this.props.editing){
      selects = null;
    }
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
            <form onSubmit={ this.onSubmitTema }>    
              <div className="modal-body">  
                { selects }
                <div className="form-row">
                  <div className="form-group col-4">
                    <label htmlFor="numTema">Num Tema: </label>
                    <select value={this.state.numTema} onChange={this.handleChangeNumTema} id="numTema" className="form-control form-control rounded">
                      <option value ="seleccione">Num:</option>																
                      <option value="1">1</option>
                      <option value ="2">2</option>                                  
                      <option value ="3">3</option>
                      <option value ="4">4</option>
                      <option value ="5">5</option>
                      <option value="6">6</option>
                      <option value ="7">7</option>                                  
                      <option value ="8">8</option>
                      <option value ="9">9</option>
                      <option value ="10">10</option>
                      <option value="11">11</option>
                      <option value ="12">12</option>                                  
                      <option value ="13">13</option>
                      <option value ="14">14</option>
                      <option value ="15">15</option>
                      <option value="16">16</option>
                      <option value ="17">17</option>                                  
                      <option value ="18">18</option>
                      <option value ="19">19</option>
                      <option value ="20">20</option>
                    </select>
                  </div>
                  <div className="form-group col-8">
                    <label htmlFor="nombreTema">Tema: </label>
                    <input type="text" className="form-control" id="nombreTema" ref="nombreTema" defaultValue={ this.state.nombreTema } placeholder="El alfabeto..."/> 
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="descripcionTema">Descripcion tema: </label>
                  <textarea className="form-control" rows="5" id="descripcionTema" ref="descripcionTema" placeholder="Escriba una descripcion aquí..."></textarea>
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

export default withTracker(() => {
  //obtenemos informacion de las materias
  let handle = Meteor.subscribe("materias");
  let isReady = handle.ready();
  let materias = Materias.find().fetch();

  //obtenemos informacion de bloques
  let handleB = Meteor.subscribe("bloques");
  let isReadyB = handleB.ready();
  let bloques = Bloques.find().fetch();

  return {
    isReady: isReady,
    materias: materias,
    isReadyB: isReadyB,
    bloques: bloques,
  };
})(TemaModal);